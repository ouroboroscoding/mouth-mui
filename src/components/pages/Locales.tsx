/**
 * Communications Locales
 *
 * Locales page
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-19
 */

// Ouroboros modules
import { Myself } from '@ouroboros/brain-mui';
import clone from '@ouroboros/clone';
import { Tree } from '@ouroboros/define'
import { Form, Results } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import LocaleDef from '@ouroboros/mouth/definitions/locale.json';
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
const LocaleTree = new Tree(LocaleDef);

// Types
import { responseErrorStruct } from '@ouroboros/body';
export type LocalesProps = {
	mobile: boolean,
	onError: (error: responseErrorStruct) => void,
	onSuccess: (type: string) => void
}

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
export default function Locales(props: LocalesProps) {

	// State
	const [create, createSet] = useState<boolean>(false);
	const [records, recordsSet] = useState<any[]>([]);

	// Hooks
	const rights = Myself.useRights('mouth_locale');

	// User / archived change effect
	useEffect(() => {

		// If we have read rights
		if(rights.read) {
			mouth.read('locales').then(recordsSet);
		} else {
			recordsSet([]);
		}

		// If we don't have create rights
		if(!rights.create) {
			createSet(false);
		}

	}, [rights]);

	// Called when a create form is submitted
	function createSubmit(locale: any): Promise<boolean> {

		// Create a new Promise and return it
		return new Promise((resolve, reject) => {

			// Create the new locale
			mouth.create('locale').then((data: string) => {

				// If we were successful
				if(data) {

					// Notify the parent
					props.onSuccess('create');

					// Close the create form
					createSet(false);

					// Clone the records, add the new one to the start, and set the new
					//	records
					const lRecords = clone(records);
					lRecords.unshift(locale);
					recordsSet(lRecords);

					// Send the clone to the locales
					locales.set(lRecords);
				}

				// Resolve with the form
				resolve(data ? true : false);

			}, (error: responseErrorStruct) => {
				if(error.code === errors.body.DB_NO_RECORD) {
					reject([['_id', 'Already in use']]);
				} else if(error.code === errors.body.DATA_FIELDS) {
					reject(error.msg);
				} else {
					if(props.onError) {
						props.onError(error);
					} else {
						throw new Error(JSON.stringify(error));
					}
				}
			});
		});
	}

	// Called when the delete button on a locale was clicked
	function deleteClick(key: string) {

		// Delete the existing locale
		mouth.delete('locale', { _id: key }).then((data: boolean) => {

			// If it was successful
			if(data) {

				// Notify the parent
				props.onSuccess('delete');

				// Look for the record
				const i = afindi(records, '_id', key);

				// If it exists
				if(i > -1) {

					// Clone the records, delete the index, and set the new records
					const lRecords = clone(records);
					lRecords.splice(i, 1);
					recordsSet(lRecords);

					// Send the clone to the locales
					locales.set(lRecords);
				}
			}
		}, (error: responseErrorStruct) => {
			if(props.onError) {
				props.onError(error);
			} else {
				throw new Error(JSON.stringify(error));
			}
		});
	}

	// Called when an update form is submitted
	function updateSubmit(locale: any, key: string): Promise<boolean> {

		// Add the ID to the locale
		locale._id = key;

		// Create a new Promise and return it
		return new Promise((resolve, reject) => {

			// Update the locale on the server
			mouth.update('locale', locale).then((data: boolean) => {

				// If we were successful
				if(data) {

					// Notify the parent
					props.onSuccess('update');

					// Look for the record
					const i = afindi(records, '_id', key);

					// If it exists
					if(i > -1) {

						// Clone the records, update the index, and set the new records
						const lRecords = clone(records);
						merge(lRecords[i], locale);
						recordsSet(lRecords);

						// Send the clone to the locales
						locales.set(lRecords);
					}
				}

				// Resolve with the Form
				resolve(data);

			}, (error: responseErrorStruct) => {
				if(error.code === errors.body.DATA_FIELDS) {
					reject(error.msg);
				} else {
					if(props.onError) {
						props.onError(error);
					} else {
						throw new Error(JSON.stringify(error));
					}
				}
			});
		});
	}

	// Render
	return (
		<Box id="mouth_locales" className="flexGrow padding">
			<Box className="flexColumns">
				<h1 className="flexGrow">Locales</h1>
				{rights.create &&
					<Box className="flexStatic">
						<Tooltip title="Create new Locale" className="page_action" onClick={() => createSet(b => !b)}>
							<IconButton>
								<i className={'fa-solid fa-plus' + (create ? ' open' : '')} />
							</IconButton>
						</Tooltip>
					</Box>
				}
			</Box>
			{create &&
				<Paper className="padding">
					<Form
						onCancel={() => createSet(false)}
						onSubmit={createSubmit}
						tree={LocaleTree}
						type="create"
					/>
				</Paper>
			}
			<Results
				data={records}
				orderBy="name"
				onDelete={rights.delete ? deleteClick : false}
				onUpdate={rights.update ? updateSubmit : false}
				tree={LocaleTree}
			/>
		</Box>
	);
}

// Valid props
Locales.propTypes = {
	mobile: PropTypes.bool.isRequired,
	onError: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired
}