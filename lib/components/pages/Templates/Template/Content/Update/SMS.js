/**
 * Communications Templates Template Content Update SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
// Ouroboros modules
import { DefineNode } from '@ouroboros/define-mui';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import Box from '@mui/material/Box';
// Import the shared types
import { SmsTree } from '../../../../../../shared';
/**
 * SMS
 *
 * Handles creating new template content
 *
 * @name SMS
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function SMS({ errors, onChanged, value }) {
    // Render
    return (React.createElement(Box, { className: "content_update_sms field" },
        React.createElement(DefineNode, { error: errors.content || false, label: "placeholder", name: "content", node: SmsTree.get('content'), onChange: val => onChanged('content', val), type: "update", value: value.content })));
}
// Valid props
SMS.propTypes = {
    errors: PropTypes.object.isRequired,
    onChanged: PropTypes.func.isRequired,
    value: PropTypes.shape({
        content: PropTypes.string.isRequired
    }).isRequired
};
