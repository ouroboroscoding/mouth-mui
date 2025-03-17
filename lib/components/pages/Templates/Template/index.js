/**
 * Communications Templates Template
 *
 * Template component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */
// Ouroboros modules
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import TemplateDef from '@ouroboros/mouth/define/template.json';
import { arrayFindMerge, omap, ucfirst } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
// Local components
import ContentCreate from './Content/Create';
import ContentUpdate from './Content/Update';
import ContentView from './Content/View';
import Variables from './Variables';
// Format Node
const oNameNode = new Node(TemplateDef.name);
/**
 * Template
 *
 * Handles a single template
 *
 * @name Template
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Template({ locales, onChange, onError, onContent, rights, value }) {
    // State
    const [contents, contentsSet] = useState(false);
    const [tab, tabSet] = useState(0);
    const [edit, editSet] = useState(false);
    const [view, viewSet] = useState(false);
    // Refs
    const refName = useRef(null);
    // Called when the update record changes
    function change(field, val) {
        // Set the new record
        editSet(o => { return { ...o, [field]: val }; });
    }
    // Called when a single conent record is created
    function contentCreated(content) {
        // Notify the parent
        onContent('create');
        // Add it to the end
        contentsSet(l => [...l, content]);
    }
    // Called when a single content record is updated
    function contentUpdated(content) {
        // Notify the parent
        onContent('update');
        // Work on latest
        contentsSet(l => arrayFindMerge(l, '_id', content._id, content, true));
    }
    // Called to delete the template
    function remove() {
        throw new Error('Remove template not implemented');
    }
    // Called to update the template
    function update() {
        // Create the data in the system
        mouth.update('template', edit).then((data) => {
            // Hide the form
            editSet(false);
            // Let the parent know
            onChange(edit);
        }, (error) => {
            if (error.code === errors.body.DB_DUPLICATE) {
                refName.current?.error('Duplicate');
            }
            else {
                return false;
            }
        });
    }
    // View toggle
    function viewToggle() {
        if (view) {
            viewSet(false);
        }
        else {
            if (contents === false) {
                mouth.read('template/contents', {
                    template: value._id
                }).then(contentsSet);
            }
            viewSet(true);
        }
    }
    // Render
    return (React.createElement(Paper, { className: "template padding" },
        React.createElement(Box, { className: "flexColumns" },
            React.createElement(Box, { className: "flexGrow link", onClick: viewToggle },
                React.createElement("h2", null,
                    ucfirst(value.name.replace(/_/g, ' ')),
                    "\u00A0\u00A0",
                    React.createElement("i", { className: 'fa-solid fa-angle-' + (view ? 'up' : 'down') }))),
            React.createElement(Box, { className: "flexStatic" },
                rights.template.update &&
                    React.createElement(Tooltip, { title: "Edit the Template" },
                        React.createElement(IconButton, { className: "icon", onClick: ev => editSet(edit ? false : { ...value }) },
                            React.createElement("i", { className: 'fa-solid fa-edit ' + (edit ? 'open' : 'closed') }))),
                rights.template.delete &&
                    React.createElement(Tooltip, { title: "Delete the Template" },
                        React.createElement(IconButton, { className: "icon", onClick: remove },
                            React.createElement("i", { className: "fa-solid fa-trash-alt" }))))),
        edit &&
            React.createElement(React.Fragment, null,
                React.createElement("hr", null),
                React.createElement("h3", null, "Update Template"),
                React.createElement(Grid, { container: true, spacing: 2 },
                    React.createElement(Grid, { item: true, lg: 6, md: 12, className: "field" },
                        React.createElement(Typography, null,
                            React.createElement("strong", null, "Name")),
                        React.createElement(DefineNode, { label: "none", name: "name", node: oNameNode, onChange: val => change('name', val), onEnterPressed: update, ref: refName, type: "update", value: edit.name })),
                    React.createElement(Grid, { item: true, lg: 6, md: 12 },
                        React.createElement(Typography, null,
                            React.createElement("strong", null, "Variables")),
                        React.createElement(Variables, { onChange: val => change('variables', val), value: edit.variables || {} })),
                    React.createElement(Grid, { item: true, xs: 12, className: "actions" },
                        React.createElement(Button, { variant: "contained", color: "secondary", onClick: () => editSet(false) }, "Cancel"),
                        React.createElement(Button, { variant: "contained", color: "primary", onClick: update }, "Save")))),
        !edit && view &&
            React.createElement(React.Fragment, null,
                React.createElement("hr", null),
                React.createElement(Grid, { container: true, spacing: 1 },
                    React.createElement(Grid, { item: true, xs: 12, md: 9, xl: 10 },
                        React.createElement(Tabs, { onChange: (ev, val) => tabSet(val), scrollButtons: "auto", variant: "scrollable", value: tab },
                            contents && contents.map(o => React.createElement(Tab, { key: o._id, label: locales[o.locale] + ' ' + o.type })),
                            rights.content.create &&
                                React.createElement(Tab, { label: React.createElement("i", { className: "fa-solid fa-plus" }) })),
                        React.createElement(Box, { className: "padding" },
                            React.createElement("br", null),
                            (contents && tab < contents.length &&
                                (rights.content.update ?
                                    React.createElement(ContentUpdate, { key: contents[tab]._id, onError: onError, onUpdated: contentUpdated, value: contents[tab] })
                                    :
                                        React.createElement(ContentView, { key: contents[tab]._id, onError: onError, value: contents[tab] }))) ||
                                ((rights.content.create && contents && tab === contents.length) &&
                                    React.createElement(ContentCreate, { locales: locales, onCreated: contentCreated, onError: onError, template: value._id })))),
                    React.createElement(Grid, { item: true, xs: 12, md: 3, xl: 2 },
                        React.createElement("h4", null, "Available Variables"),
                        value && omap(value.variables, (v, k) => React.createElement(Typography, { key: k }, '{' + k + '}')))))));
}
// Valid props
Template.propTypes = {
    locales: PropTypes.objectOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onContent: PropTypes.func.isRequired,
    rights: PropTypes.exact({
        template: PropTypes.exact({
            create: PropTypes.bool,
            delete: PropTypes.bool,
            read: PropTypes.bool,
            update: PropTypes.bool
        }).isRequired,
        content: PropTypes.exact({
            create: PropTypes.bool,
            delete: PropTypes.bool,
            read: PropTypes.bool,
            update: PropTypes.bool
        }).isRequired
    }),
    value: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        _created: PropTypes.number,
        _updated: PropTypes.number,
        name: PropTypes.string.isRequired,
        variables: PropTypes.objectOf(PropTypes.string).isRequired
    }).isRequired
};
