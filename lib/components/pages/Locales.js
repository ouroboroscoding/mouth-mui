/**
 * Communications Locales
 *
 * Locales page
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-19
 */
// Ouroboros modules
import { useRights } from '@ouroboros/brain-react';
import { Tree } from '@ouroboros/define';
import { Form, Results } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import LocaleDef from '@ouroboros/mouth/define/locale.json';
import { afindi, merge } from '@ouroboros/tools';
// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// Material UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
// Local modules
import locales from '../../locales';
// Generate the user Tree
const LocaleTree = new Tree(LocaleDef, {
    __name__: 'record',
    __ui__: {
        __copyPrimary__: false,
        __create__: ['_id', 'name'],
        __results__: ['_id', 'name'],
        __update__: ['name']
    },
    _id: { __ui__: { __title__: 'ISO-639 - ISO-3166' } }
});
/**
 * Locales
 *
 * Handles template locale management
 *
 * @name Locales
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Locales({ onError, onSuccess }) {
    // State
    const [create, createSet] = useState(false);
    const [records, recordsSet] = useState([]);
    // Hooks
    const rights = useRights('mouth_locale');
    // User / archived change effect
    useEffect(() => {
        // If we have read rights
        if (rights.read) {
            mouth.read('locales').then(recordsSet);
        }
        else {
            recordsSet([]);
        }
        // If we don't have create rights
        if (!rights.create) {
            createSet(false);
        }
    }, [rights]);
    // Called when a create form is submitted
    function createSubmit(locale) {
        // Create a new Promise and return it
        return new Promise((resolve, reject) => {
            // Create the new locale
            mouth.create('locale', locale).then((data) => {
                // If we were successful
                if (data) {
                    // Notify the parent
                    onSuccess('create');
                    // Close the create form
                    createSet(false);
                    // Clone the records, add the new one to the start, and set
                    //	the new records
                    const lRecords = [locale, ...records];
                    recordsSet(lRecords);
                    // Send the clone to the locales
                    locales.set(lRecords);
                }
                // Resolve with the form
                resolve(data ? true : false);
            }, (error) => {
                if (error.code === errors.body.DB_NO_RECORD) {
                    reject([['_id', 'Already in use']]);
                }
                else if (error.code === errors.body.DATA_FIELDS) {
                    reject(error.msg);
                }
                else {
                    if (onError) {
                        onError(error);
                    }
                    else {
                        throw new Error(JSON.stringify(error));
                    }
                }
            });
        });
    }
    // Called when the delete button on a locale was clicked
    function deleteClick(key) {
        // Delete the existing locale
        mouth.delete('locale', { _id: key }).then((data) => {
            // If it was successful
            if (data) {
                // Notify the parent
                onSuccess('delete');
                // Look for the record
                const i = afindi(records, '_id', key);
                // If it exists
                if (i > -1) {
                    // Clone the records, delete the index, and set the new
                    //	records
                    const lRecords = [...records];
                    lRecords.splice(i, 1);
                    recordsSet(lRecords);
                    // Send the clone to the locales
                    locales.set(lRecords);
                }
            }
        }, (error) => {
            if (onError) {
                onError(error);
            }
            else {
                throw new Error(JSON.stringify(error));
            }
        });
    }
    // Called when an update form is submitted
    function updateSubmit(locale, key) {
        // Add the ID to the locale
        locale._id = key;
        // Create a new Promise and return it
        return new Promise((resolve, reject) => {
            // Update the locale on the server
            mouth.update('locale', locale).then((data) => {
                // If we were successful
                if (data) {
                    // Notify the parent
                    onSuccess('update');
                    // Look for the record
                    const i = afindi(records, '_id', key);
                    // If it exists
                    if (i > -1) {
                        // Clone the records, update the index, and set the new
                        //	records
                        const lRecords = [...records];
                        merge(lRecords[i], locale);
                        recordsSet(lRecords);
                        // Send the clone to the locales
                        locales.set(lRecords);
                    }
                }
                // Resolve with the Form
                resolve(data);
            }, (error) => {
                if (error.code === errors.body.DATA_FIELDS) {
                    reject(error.msg);
                }
                else {
                    if (onError) {
                        onError(error);
                    }
                    else {
                        throw new Error(JSON.stringify(error));
                    }
                }
            });
        });
    }
    // Render
    return (React.createElement(Box, { id: "mouth_locales", className: "flexGrow padding" },
        React.createElement(Box, { className: "flexColumns" },
            React.createElement("h1", { className: "flexGrow" }, "Locales"),
            rights.create &&
                React.createElement(Box, { className: "flexStatic" },
                    React.createElement(Tooltip, { title: "Create new Locale", className: "page_action", onClick: () => createSet(b => !b) },
                        React.createElement(IconButton, null,
                            React.createElement("i", { className: 'fa-solid fa-plus' +
                                    (create ? ' open' : '') }))))),
        create &&
            React.createElement(Paper, { className: "padding" },
                React.createElement(Form, { onCancel: () => createSet(false), onSubmit: createSubmit, tree: LocaleTree, type: "create" })),
        React.createElement(Results, { data: records, orderBy: "name", onDelete: rights.delete ? deleteClick : false, onUpdate: rights.update ? updateSubmit : false, tree: LocaleTree })));
}
// Valid props
Locales.propTypes = {
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
};
