/**
 * Communications Templates Template Content Update
 *
 * Update component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
// Ouroboros modules
import clone from '@ouroboros/clone';
import { errorTree } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import { owithout } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React, { useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// Local components
import Email from './Email';
import Preview from '../Preview';
import SMS from './SMS';
/**
 * Update
 *
 * Handles updating template content
 *
 * @name Update
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Update(props) {
    // State
    const [fieldErrors, fieldErrorsSet] = useState({});
    const [preview, previewSet] = useState(false);
    const [record, recordSet] = useState(owithout(props.value, 'type'));
    // Called to create the new content record
    function update() {
        // Send the record data to the server
        mouth.update(`template/${props.value.type}`, record).then(() => {
            props.onUpdated({ type: props.value.type, ...record });
        }, (error) => {
            if (error.code === errors.body.DATA_FIELDS) {
                fieldErrorsSet(errorTree(error.msg));
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
            delete fieldErrors.field;
        }
        // Clone the record
        const oRecord = clone(record);
        // Update the field
        oRecord[field] = value;
        // Store the new record
        recordSet(oRecord);
    }
    // Render
    return (React.createElement(Box, { className: "content_update" },
        (props.value.type === 'email' &&
            React.createElement(Email, { errors: fieldErrors, key: props.value._id, onChanged: recordChanged, value: record })) || (props.value.type === 'sms' &&
            React.createElement(SMS, { errors: fieldErrors, key: props.value._id, onChanged: recordChanged, value: record })),
        React.createElement(Box, { className: "actions" },
            React.createElement(Button, { color: "secondary", onClick: () => recordSet(owithout(props.value, 'type')), variant: "contained" }, "Cancel"),
            React.createElement(Button, { color: "info", onClick: () => previewSet(true), variant: "contained" }, "Preview"),
            React.createElement(Button, { color: "primary", onClick: update, variant: "contained" }, "Save Content"),
            preview &&
                React.createElement(Preview, { mobile: props.mobile, onClose: () => previewSet(false), onError: (error) => {
                        if (error.code === errors.body.DATA_FIELDS) {
                            fieldErrorsSet(errorTree(error.msg));
                        }
                        else {
                            props.onError(error);
                        }
                        previewSet(false);
                    }, value: { ...record, type: props.value.type } }))));
}
// Valid props
Update.propTypes = {
    mobile: PropTypes.bool.isRequired,
    onError: PropTypes.func.isRequired,
    onUpdated: PropTypes.func.isRequired,
    value: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['email', 'sms']).isRequired
    })
};
