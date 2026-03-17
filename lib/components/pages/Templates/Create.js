/**
 * Templates Create
 *
 * Create component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */
// Ouroboros modules
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import TemplateDef from '@ouroboros/mouth/define/template.json';
// NPM modules
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
// Material UI
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// Locale components
import Variables from './Template/Variables';
// Format Node
const oNameNode = new Node(TemplateDef.name);
/**
 * Create
 *
 * Form for creating a new template
 *
 * @name Create
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Create({ onCancel, onCreated, onError }) {
    // State
    const [record, recordSet] = useState({
        name: '',
        variables: {}
    });
    // Refs
    const refName = useRef(null);
    // Called when record changes
    function change(field, val) {
        // Set the new record
        recordSet((o) => {
            return { ...o, [field]: val };
        });
    }
    // Called to create the template
    function create() {
        // Create the data in the system
        mouth.create('template', record).then((res) => {
            // If we failed
            if (res.error) {
                if (res.error.code === errors.body.DB_DUPLICATE) {
                    refName.current?.error('Duplicate');
                }
                else {
                    if (onError) {
                        onError(res.error);
                        return;
                    }
                    else {
                        throw new Error(JSON.stringify(res.error));
                    }
                }
            }
            // Add the ID to the record
            record._id = res.data;
            // Let the parent know
            onCreated({ ...record });
        });
    }
    // Render
    return (React.createElement(Paper, { className: "padding" },
        React.createElement("h2", null, "Create new Template"),
        React.createElement(Grid, { container: true, spacing: 2 },
            React.createElement(Grid, { item: true, lg: 6, md: 12, className: "field" },
                React.createElement(Typography, null,
                    React.createElement("strong", null, "Name")),
                React.createElement(DefineNode, { label: "none", name: "name", node: oNameNode, onChange: val => change('name', val), onEnterPressed: create, ref: refName, type: "create", value: record.name || null })),
            React.createElement(Grid, { item: true, lg: 6, md: 12 },
                React.createElement(Typography, null,
                    React.createElement("strong", null, "Variables")),
                React.createElement(Variables, { onChange: val => change('variables', val), value: record.variables || {} })),
            React.createElement(Grid, { item: true, xs: 12, className: "actions" },
                onCancel &&
                    React.createElement(Button, { variant: "contained", color: "secondary", onClick: onCancel }, "Cancel"),
                React.createElement(Button, { variant: "contained", color: "primary", onClick: create }, "Create Template")))));
}
// Valid props
Create.propTypes = {
    onCancel: PropTypes.func,
    onCreated: PropTypes.func.isRequired,
    onError: PropTypes.func,
};
