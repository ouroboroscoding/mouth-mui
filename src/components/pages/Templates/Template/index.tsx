/**
 * Communications Templates Template
 *
 * Template component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */

// Ouroboros modules
import clone from '@ouroboros/clone';
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import TemplateDef from '@ouroboros/mouth/definitions/template.json';
import { afindi, omap, ucfirst } from '@ouroboros/tools';

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

// Types
import { responseErrorStruct } from '@ouroboros/body';
import { rightsStruct } from '@ouroboros/brain-mui';
export type contentStruct = {
	_id?: string,
	_created?: number,
	_updated?: number,
	template: string,
	locale: string,
	content?: string,
	subject?: string,
	text?: string,
	type: typeOption,
	html?: string
}
export type templateStruct = {
	_id?: string,
	_created?: number,
	_updated?: number,
	name: string,
	variables: Record<string, string>
}
export type typeOption = 'email' | 'sms';
export type TemplateProps = {
	locales: Record<string, string>,
	mobile: boolean,
	onChange: (template: templateStruct) => void,
	onError: (error: responseErrorStruct) => void,
	onContent: (type: string) => void,
	rights: {
		template: rightsStruct,
		content: rightsStruct
	},
	value: templateStruct
}

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
export default function Template(props: TemplateProps) {

	// State
	const [contents, contentsSet] = useState<contentStruct[] | false>(false);
	const [tab, tabSet] = useState<number>(0);
	const [edit, editSet] = useState<templateStruct | false>(false);
	const [view, viewSet] = useState<boolean>(false);

	// Refs
	const refName = useRef<DefineNode>(null);

	// Called when the update record changes
	function change(field: string, value: any) {

		// Set the new record
		editSet(o => {
			const oRecord = clone(o);
			oRecord[field] = value;
			return oRecord;
		});
	}

	// Called when a single conent record is created
	function contentCreated(content: contentStruct) {

		// Notify the parent
		props.onContent('create');

		// Clone the current contents
		const lContents = clone(contents);

		// Add the new record to the end of the array
		lContents.push(content);

		// Set the new contents
		contentsSet(lContents);
	}

	// Called when a single content record is updated
	function contentUpdated(content: contentStruct) {

		// Notify the parent
		props.onContent('update');

		// Find the index of the record
		const i = afindi(contents as contentStruct[], '_id', content._id);

		// If we got an index
		if(i > -1) {

			// Clone the current contents, merge the current record with the
			//	new one, and set the new contents
			const lContents = clone(contents);
			lContents[i] = {...lContents[i], ...content};
			contentsSet(lContents);
		}
	}

	// Called to delete the template
	function remove() {
		throw new Error('Remove template not implemented');
	}

	// Called to update the template
	function update() {

		// Create the data in the system
		mouth.update('template', edit).then((data: boolean) => {

			// Hide the form
			editSet(false);

			// Let the parent know
			props.onChange(edit as templateStruct);

		}, (error: responseErrorStruct) => {
			if(error.code === errors.body.DB_DUPLICATE) {
				refName.current?.error('Duplicate');
			} else {
				return false;
			}
		})
	}

	// View toggle
	function viewToggle() {
		if(view) {
			viewSet(false);
		} else {
			if(contents === false) {
				mouth.read('template/contents', {
					template: props.value._id
				}).then(contentsSet);
			}
			viewSet(true);
		}
	}

	// Render
	return (
		<Paper className="template padding">
			<Box className="flexColumns">
				<Box className="flexGrow link" onClick={viewToggle}>
					<h2>
						{ucfirst(props.value.name.replace(/_/g, ' '))}&nbsp;&nbsp;
						<i className={'fa-solid fa-angle-' + (view ? 'up' : 'down')} />
					</h2>
				</Box>
				<Box className="flexStatic">
					{props.rights.template.update &&
						<Tooltip title="Edit the Template">
							<IconButton className="icon" onClick={ev => editSet(edit ? false : clone(props.value))}>
								<i className={'fa-solid fa-edit ' + (edit ? 'open' : 'closed')} />
							</IconButton>
						</Tooltip>
					}
					{props.rights.template.delete &&
						<Tooltip title="Delete the Template">
							<IconButton className="icon" onClick={remove}>
								<i className="fa-solid fa-trash-alt" />
							</IconButton>
						</Tooltip>
					}
				</Box>
			</Box>
			{edit &&
				<React.Fragment>
					<hr />
					<h3>Update Template</h3>
					<Grid container spacing={2}>
						<Grid item lg={6} md={12} className="field">
							<Typography><strong>Name</strong></Typography>
							<DefineNode
								label="none"
								name="name"
								node={oNameNode}
								onChange={value => change('name', value)}
								onEnterPressed={update}
								ref={refName}
								type="update"
								value={edit.name}
							/>
						</Grid>
						<Grid item lg={6} md={12}>
							<Typography><strong>Variables</strong></Typography>
							<Variables
								onChange={value => change('variables', value)}
								value={edit.variables || {}}
							/>
						</Grid>
						<Grid item xs={12} className="actions">
							<Button variant="contained" color="secondary" onClick={() => editSet(false)}>Cancel</Button>
							<Button variant="contained" color="primary" onClick={update}>Save</Button>
						</Grid>
					</Grid>
				</React.Fragment>
			}
			{!edit && view &&
				<React.Fragment>
					<hr />
					<Grid container spacing={1}>
						<Grid item xs={12} md={9} xl={10}>
							<Tabs
								onChange={(ev, val) => tabSet(val)}
								scrollButtons="auto"
								variant="scrollable"
								value={tab}
							>
								{contents && contents.map(o =>
									<Tab key={o._id} label={props.locales[o.locale] + ' ' + o.type} />
								)}
								{props.rights.content.create &&
									<Tab label={
										<i className="fa-solid fa-plus" />
									} />
								}
							</Tabs>
							<Box className="padding">
								<br />
								{(contents && tab < contents.length &&
									(props.rights.content.update ?
										<ContentUpdate
											key={contents[tab]._id}
											mobile={props.mobile}
											onError={props.onError}
											onUpdated={contentUpdated}
											value={contents[tab]}
										/>
									:
										<ContentView
											key={contents[tab]._id}
											mobile={props.mobile}
											onError={props.onError}
											value={contents[tab]}
										/>
									)
								) ||
								((props.rights.content.create && contents && tab === contents.length) &&
									<ContentCreate
										locales={props.locales}
										mobile={props.mobile}
										onCreated={contentCreated}
										onError={props.onError}
										template={props.value._id as string}
									/>
								)}
							</Box>
						</Grid>
						<Grid item xs={12} md={3} xl={2}>
							<h4>Available Variables</h4>
							{props.value && omap(props.value.variables, (v,k) =>
								<Typography key={k}>{'{' + k + '}'}</Typography>
							)}
						</Grid>
					</Grid>
				</React.Fragment>
			}
		</Paper>
	);
}

// Valid props
Template.propTypes = {
	locales: PropTypes.objectOf(PropTypes.string).isRequired,
	mobile: PropTypes.bool.isRequired,
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
}