/**
 * Communications Templates Template Content Create
 *
 * Create component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
// Ouroboros modules
import clone from '@ouroboros/clone';
import { errorTree } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import RadioButtons from '@ouroboros/react-radiobuttons-mui';
import { omap, opop } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React, { useState } from 'react';
// Material UI
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
// Local components
import Email from './Email';
import Preview from '../Preview';
import SMS from './SMS';
/**
 * Create
 *
 * Handles creating new template content
 *
 * @name Create
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Create(props) {
    // State
    const [fieldErrors, fieldErrorsSet] = useState({});
    const [preview, previewSet] = useState(false);
    const [record, recordSet] = useState({
        locale: Object.keys(props.locales)[0],
        template: props.template,
        subject: '',
        text: '',
        html: ''
    });
    const [type, typeSet] = useState('email');
    // Called to create the new content record
    function create() {
        // Send the record data to the server
        mouth.create(`template/${type}`, record).then((data) => {
            // Add the type and ID
            const oRecord = { ...record, type, _id: data };
            // Tell the parent about the new record
            props.onCreated(oRecord);
        }, (error) => {
            if (error.code === errors.body.DATA_FIELDS) {
                fieldErrorsSet(errorTree(error.msg));
            }
            else if (error.code === errors.body.DB_DUPLICATE) {
                fieldErrorsSet({ locale: 'Already used' });
            }
            else if (error.code === errors.TEMPLATE_CONTENT_ERROR) {
                const oLines = { templates: [], variables: [] };
                for (const l of error.msg) {
                    if (l[0] === 'template') {
                        oLines.templates.push(l[1]);
                    }
                    else if (l[0] === 'variable') {
                        oLines.variables.push(l[1]);
                    }
                }
                const lLines = [];
                if (oLines.templates.length) {
                    lLines.push('The following templates are invalid: ' + oLines.templates.join(', '));
                }
                if (oLines.variables.length) {
                    lLines.push('The following variables are invalid: ' + oLines.variables.join(', '));
                }
                // Show the errors
                if (props.onError) {
                    props.onError({ code: 0, msg: lLines.join('\n') });
                }
            }
            else {
                props.onError(error);
            }
        });
    }
    // Called when any fields in the record are changed
    function recordChanged(field, value) {
        // Clear error
        if (field in fieldErrors) {
            const oErrors = clone(fieldErrors);
            delete oErrors[field];
            fieldErrorsSet(oErrors);
        }
        // Clone the record
        const oRecord = clone(record);
        // Update the field
        oRecord[field] = value;
        // Store the new record
        recordSet(oRecord);
    }
    // Called when the type is changed
    function typeChanged(value) {
        // Clone the current record
        const oRecord = clone(record);
        // If the new type is email
        if (value === 'email') {
            // Store the content in the text field and remove it
            oRecord.text = opop(oRecord, 'content');
            // Add the subject and html fields
            oRecord.subject = '';
            oRecord.html = '';
        }
        // Else, if it's SMS
        else if (value === 'sms') {
            // Store the text in the content field and remove it
            oRecord.content = opop(oRecord, 'text');
            // Remove the subject and html fields
            delete oRecord.subject;
            delete oRecord.html;
        }
        // Else, invalid value
        else {
            throw new Error('invalid `value`');
        }
        // Set the type
        typeSet(value);
        // Set the record
        recordSet(oRecord);
    }
    // Render
    return (React.createElement(Grid, { container: true, spacing: 2, className: "content_create" },
        React.createElement(Grid, { item: true, xs: 12, md: 6 },
            React.createElement(RadioButtons, { border: true, gridContainerProps: { spacing: 2 }, gridItemProps: {
                    xs: 12,
                    sm: 6
                }, label: "Type", onChange: typeChanged, options: [
                    { text: 'E-Mail', value: 'email' },
                    { text: 'SMS', value: 'sms' }
                ], value: type, variant: "grid" })),
        React.createElement(Grid, { item: true, xs: 12, md: 6, className: "field" },
            React.createElement(FormControl, { variant: "outlined", error: 'locale' in fieldErrors ? true : false },
                React.createElement(InputLabel, { id: "content_create_locale" }, "Locale"),
                React.createElement(Select, { label: "Locale", labelId: "content_create_locale", native: true, onChange: ev => recordChanged('locale', ev.target.value), value: record.locale }, omap(props.locales, (v, k) => React.createElement("option", { key: k, value: k }, v))),
                fieldErrors.locale &&
                    React.createElement(FormHelperText, null, fieldErrors.locale))),
        React.createElement(Grid, { item: true, xs: 12 }, (type === 'email' &&
            React.createElement(Email, { errors: fieldErrors, onChanged: recordChanged, value: record })) || (type === 'sms' &&
            React.createElement(SMS, { errors: fieldErrors, onChanged: recordChanged, value: record }))),
        React.createElement(Grid, { item: true, xs: 12, className: "actions" },
            React.createElement(Button, { color: "info", onClick: () => previewSet(true), variant: "contained" }, "Preview"),
            React.createElement(Button, { color: "primary", onClick: create, variant: "contained" }, "Add Content"),
            preview &&
                React.createElement(Preview, { mobile: props.mobile, onClose: () => previewSet(false), onError: (error) => {
                        if (error.code === errors.body.DATA_FIELDS) {
                            fieldErrorsSet(errorTree(error.msg));
                        }
                        else {
                            props.onError(error);
                        }
                        previewSet(false);
                    }, value: { ...record, type } }))));
}
// Valid props
Create.propTypes = {
    locales: PropTypes.objectOf(PropTypes.string).isRequired,
    mobile: PropTypes.bool.isRequired,
    onCreated: PropTypes.func.isRequired,
    onError: PropTypes.func,
    template: PropTypes.string.isRequired
};
