/**
 * Templates
 *
 * Templates page
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-19
 */
// Ouroboros modules
import { useRights } from '@ouroboros/brain-react';
import mouth from '@ouroboros/mouth';
import { arrayFindOverwrite } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
// Locale components
import Create from './Create';
import Template from './Template';
/**
 * Templates
 *
 * Handles template management
 *
 * @name Templates
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Templates({ onError, onSuccess }) {
    // State
    const [create, createSet] = useState(false);
    const [locales, localesSet] = useState({});
    const [templates, templatesSet] = useState([]);
    // Hooks
    const rightsContent = useRights('mouth_content');
    const rightsTemplate = useRights('mouth_template');
    // User / archived change effect
    useEffect(() => {
        // If we have template read permissions
        if (rightsTemplate.read) {
            mouth.read('locales').then((data) => {
                const oLocales = {};
                for (const o of data) {
                    oLocales[o._id] = o.name;
                }
                localesSet(oLocales);
            });
            mouth.read('templates').then(templatesSet);
        }
        else {
            localesSet({});
            templatesSet([]);
        }
        // If we have no template create right
        if (!rightsTemplate.create) {
            createSet(false);
        }
    }, [rightsTemplate]);
    // Called when a template has been created
    function templateCreated(template) {
        // Notify parent
        onSuccess('template_create');
        // Hide the create form
        createSet(false);
        // Clone the current templates, add the new one to the front, and set
        //	the new templates
        templatesSet(l => [template, ...l]);
    }
    // Called when a template has been updated
    function templateUpdated(template) {
        // Notify parent
        onSuccess('template_update');
        // Work on latest
        templatesSet(l => arrayFindOverwrite(l, '_id', template._id, template, true));
    }
    // Render
    return (React.createElement(Box, { id: "mouth_templates", className: "flexGrow padding" },
        React.createElement(Box, { className: "flexColumns" },
            React.createElement("h1", { className: "flexGrow" }, "Templates"),
            rightsTemplate.create &&
                React.createElement(Box, { className: "flexStatic" },
                    React.createElement(Tooltip, { title: "Create new Template", className: "page_action", onClick: () => createSet(b => !b) },
                        React.createElement(IconButton, null,
                            React.createElement("i", { className: 'fa-solid fa-plus' + (create ? ' open' : '') }))))),
        create &&
            React.createElement(Create, { onCancel: () => createSet(false), onCreated: templateCreated, onError: onError }),
        templates.map((o) => React.createElement(Template, { key: o._id, locales: locales, onChange: templateUpdated, onContent: type => onSuccess(`content_${type}`), onError: onError, rights: {
                content: rightsContent,
                template: rightsTemplate
            }, value: o }))));
}
// Valid props
Templates.propTypes = {
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};
