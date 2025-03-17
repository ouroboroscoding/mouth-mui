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
export default function View({ onError, value }) {
    // State
    const [preview, previewSet] = useState(false);
    // Render
    return (React.createElement(Box, { className: "content_view" },
        (value.type === 'email' &&
            React.createElement(Email, { key: value._id, value: value })) || (value.type === 'sms' &&
            React.createElement(SMS, { key: value._id, value: value })),
        React.createElement(Box, { className: "actions" },
            React.createElement(Button, { color: "info", onClick: () => previewSet(true), variant: "contained" }, "Preview"),
            preview &&
                React.createElement(Preview, { onClose: () => previewSet(false), onError: onError, value: value }))));
}
// Valid props
View.propTypes = {
    onError: PropTypes.func.isRequired,
    value: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['email', 'sms']).isRequired
    })
};
