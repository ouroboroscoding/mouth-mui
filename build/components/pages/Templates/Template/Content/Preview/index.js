/**
 * Communications Templates Template Content Preview
 *
 * Preview component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
import mouth from '@ouroboros/mouth';
// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// Material UI
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
// Local components
import Email from './Email';
import SMS from './SMS';
/**
 * Preview
 *
 * Handles viewing template content
 *
 * @name Preview
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Preview(props) {
    // Props
    const { mobile, onClose, onError, value } = props;
    // State
    const [preview, previewSet] = useState(false);
    // Value effect
    useEffect(() => {
        mouth.create(`template/${value.type}/generate`, value).then(previewSet, onError);
    }, [value, onError]);
    // Render
    return (React.createElement(Dialog, { fullWidth: true, maxWidth: "lg", onClose: onClose, open: true, "aria-labelledby": "template-content-preview-title" },
        React.createElement(DialogTitle, { id: "template-content-preview-title" },
            "Template Preview for ",
            value.locale,
            "-",
            value.type),
        React.createElement(DialogContent, { dividers: true, className: "content_preview" }, preview === false ?
            React.createElement(Typography, null, "Loading...")
            : (value.type === 'email' &&
                React.createElement(Email, { key: value.template + '_' + value.locale + '_email', mobile: mobile, value: preview })) || (value.type === 'sms' &&
                React.createElement(SMS, { key: value.template + '_' + value.locale + '_sms', mobile: mobile, value: preview })))));
}
// Valid props
Preview.propTypes = {
    mobile: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    value: PropTypes.shape({
        locale: PropTypes.string.isRequired,
        template: PropTypes.string,
        type: PropTypes.oneOf(['email', 'sms']).isRequired
    })
};
