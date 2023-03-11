/**
 * Communications Templates Variables
 *
 * Variables component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */
// Ouroboros modules
import clone from '@ouroboros/clone';
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import { omap } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React, { useRef } from 'react';
// Material UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
// Create hash node
const oNameNode = new Node({
    __type__: 'string',
    __regex__: '^[a-z_]+$'
});
/**
 * Variables
 *
 * Handles template locale management
 *
 * @name Variables
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Variables(props) {
    // Refs
    const refName = useRef(null);
    const refValue = useRef(null);
    // Called when a new variable is added
    function add() {
        // Clone the current value
        const oValue = clone(props.value);
        // If we have references to the inputs
        if (refName.current && refValue.current) {
            // Add the new item to it
            oValue[refName.current.value] = refValue.current.value;
            // Reset the name and value
            refName.current.reset();
            refValue.current.value = '';
        }
        // Let the parent know
        props.onChange(oValue);
    }
    // Called when an existing variables needs to be removed
    function remove(name) {
        // Clone the current value
        const oValue = clone(props.value);
        // Delete the given key if it exists
        if (name in oValue) {
            delete oValue[name];
        }
        // Let the parent know
        props.onChange(oValue);
    }
    // Render
    return (React.createElement(Box, null,
        React.createElement(Grid, { container: true, spacing: 1 },
            omap(props.value, (v, k) => React.createElement(React.Fragment, null,
                React.createElement(Grid, { item: true, xs: 5 }, k),
                React.createElement(Grid, { item: true, xs: 5 }, v),
                React.createElement(Grid, { item: true, xs: 2 },
                    React.createElement(Tooltip, { title: "More" },
                        React.createElement(IconButton, { className: "icon", onClick: ev => remove(k) },
                            React.createElement("i", { className: "fa-solid fa-trash-alt" })))))),
            React.createElement(Grid, { item: true, xs: 5, className: "field" },
                React.createElement(DefineNode, { label: "placeholder", name: "name", node: oNameNode, placeholder: "Name", ref: refName, type: "create", variant: "outlined" })),
            React.createElement(Grid, { item: true, xs: 5, className: "field" },
                React.createElement(TextField, { inputRef: refValue, placeholder: "testing value" })),
            React.createElement(Grid, { item: true, xs: 2 },
                React.createElement(Tooltip, { title: "More" },
                    React.createElement(IconButton, { className: "icon", onClick: add },
                        React.createElement("i", { className: "fa-solid fa-plus" })))))));
}
// Valid props
Variables.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.objectOf(PropTypes.string).isRequired
};
