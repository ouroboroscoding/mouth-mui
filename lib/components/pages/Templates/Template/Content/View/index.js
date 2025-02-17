/**
 * Communications Templates Template Content View
 *
 * View component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
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
 * View
 *
 * Handles viewing template content
 *
 * @name View
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function View(props) {
    // State
    const [preview, previewSet] = useState(false);
    // Render
    return (React.createElement(Box, { className: "content_view" },
        (props.value.type === 'email' &&
            React.createElement(Email, { ...props, key: props.value._id })) || (props.value.type === 'sms' &&
            React.createElement(SMS, { ...props, key: props.value._id })),
        React.createElement(Box, { className: "actions" },
            React.createElement(Button, { color: "info", onClick: () => previewSet(true), variant: "contained" }, "Preview"),
            preview &&
                React.createElement(Preview, { mobile: props.mobile, onClose: () => previewSet(false), onError: props.onError, value: props.value }))));
}
// Valid props
View.propTypes = {
    mobile: PropTypes.bool.isRequired,
    onError: PropTypes.func.isRequired,
    value: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['email', 'sms']).isRequired
    })
};
