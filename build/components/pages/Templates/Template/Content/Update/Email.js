/**
 * Communications Templates Template Content Update Email
 *
 * Email component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
// Ouroboros modules
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import TemplateEmail from '@ouroboros/mouth/definitions/template_email.json';
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import Grid from '@mui/material/Grid';
// Record Nodes
const oSubjectNode = new Node(TemplateEmail.subject);
const oTextNode = new Node(TemplateEmail.text);
const oHtmlNode = new Node(TemplateEmail.html);
/**
 * Email
 *
 * Handles creating new template content
 *
 * @name Email
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Email(props) {
    // Render
    return (React.createElement(Grid, { container: true, className: "content_update_email", spacing: 1 },
        React.createElement(Grid, { item: true, xs: 12, className: "field" },
            React.createElement(DefineNode, { error: props.errors.subject || false, label: "placeholder", name: "subject", node: oSubjectNode, onChange: val => props.onChanged('subject', val), type: "update", value: props.value.subject })),
        React.createElement(Grid, { item: true, xs: 12, lg: 6, className: "field" },
            React.createElement(DefineNode, { error: props.errors.text || false, label: "placeholder", name: "text", node: oTextNode, onChange: val => props.onChanged('text', val), type: "update", value: props.value.text })),
        React.createElement(Grid, { item: true, xs: 12, lg: 6, className: "field" },
            React.createElement(DefineNode, { error: props.errors.html || false, label: "placeholder", name: "html", node: oHtmlNode, onChange: val => props.onChanged('html', val), type: "update", value: props.value.html }))));
}
// Valid props
Email.propTypes = {
    errors: PropTypes.object.isRequired,
    onChanged: PropTypes.func.isRequired,
    value: PropTypes.shape({
        subject: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired
    }).isRequired
};
