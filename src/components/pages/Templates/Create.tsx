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

// Types
import { responseErrorStruct } from '@ouroboros/body';
import { templateStruct } from './Template';
export interface CreateProps {
	onCancel?: () => void,
	onCreated: (template: templateStruct) => void,
	onError: (error: responseErrorStruct) => void
}

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
export default function Create({ onCancel, onCreated, onError }: CreateProps) {

	// State
	const [ record, recordSet ] = useState<templateStruct>({
		name: '',
		variables: {}
	});

	// Refs
	const refName = useRef<DefineNode>(null);

	// Called when record changes
	function change(field: string, val: any) {

		// Set the new record
		recordSet((o: templateStruct) => {
			return { ...o, [field]: val }
		});
	}

	// Called to create the template
	function create() {

		// Create the data in the system
		mouth.create('template', record).then((data: string) => {

			// Add the ID to the record
			record._id = data;

			// Let the parent know
			onCreated({ ...record });
		}, (error: responseErrorStruct) => {
			if(error.code === errors.body.DB_DUPLICATE) {
				refName.current?.error('Duplicate');
			} else {
				if(onError) {
					onError(error);
				} else {
					throw new Error(JSON.stringify(error));
				}
			}
		})
	}

	// Render
	return (
		<Paper className="padding">
			<h2>Create new Template</h2>
			<Grid container spacing={2}>
				<Grid item lg={6} md={12} className="field">
					<Typography><strong>Name</strong></Typography>
					<DefineNode
						label="none"
						name="name"
						node={oNameNode}
						onChange={val => change('name', val)}
						onEnterPressed={create}
						ref={refName}
						type="create"
						value={record.name || null}
					/>
				</Grid>
				<Grid item lg={6} md={12}>
					<Typography><strong>Variables</strong></Typography>
					<Variables
						onChange={val => change('variables', val)}
						value={record.variables || {}}
					/>
				</Grid>
				<Grid item xs={12} className="actions">
					{onCancel &&
						<Button variant="contained" color="secondary" onClick={onCancel}>Cancel</Button>
					}
					<Button variant="contained" color="primary" onClick={create}>Create Template</Button>
				</Grid>
			</Grid>
		</Paper>
	);
}

// Valid props
Create.propTypes = {
	onCancel: PropTypes.func,
	onCreated: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired,
}