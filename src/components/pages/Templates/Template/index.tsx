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

// Types
import { responseErrorStruct } from '@ouroboros/body';
import { idStruct } from '@ouroboros/brain-react';
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
	onChange: (template: templateStruct) => void,
	onError: (error: responseErrorStruct) => void,
	onContent: (type: string) => void,
	rights: {
		template: idStruct,
		content: idStruct
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
export default function Template(
	{ locales, onChange, onError, onContent, rights, value }: TemplateProps
) {

	// State
	const [ contents, contentsSet ] = useState<contentStruct[] | false>(false);
	const [ tab, tabSet ] = useState<number>(0);
	const [ edit, editSet ] = useState<templateStruct | false>(false);
	const [ view, viewSet ] = useState<boolean>(false);

	// Refs
	const refName = useRef<DefineNode>(null);

	// Called when the update record changes
	function change(field: string, val: any) {

		// Set the new record
		editSet(o => { return { ...o as templateStruct, [field]: val } });
	}

	// Called when a single conent record is created
	function contentCreated(content: contentStruct) {

		// Notify the parent
		onContent('create');

		// Add it to the end
		contentsSet(l => [ ...l as contentStruct[], content ]);
	}

	// Called when a single content record is updated
	function contentUpdated(content: contentStruct) {

		// Notify the parent
		onContent('update');

		// Work on latest
		contentsSet(l => arrayFindMerge(
			l as contentStruct[], '_id', content._id, content, true
		) as contentStruct[]);
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
			onChange(edit as templateStruct);

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
					template: value._id
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
						{ucfirst(value.name.replace(/_/g, ' '))}&nbsp;&nbsp;
						<i className={'fa-solid fa-angle-' + (view ? 'up' : 'down')} />
					</h2>
				</Box>
				<Box className="flexStatic">
					{rights.template.update &&
						<Tooltip title="Edit the Template">
							<IconButton className="icon" onClick={ev => editSet(edit ? false : { ...value })}>
								<i className={'fa-solid fa-edit ' + (edit ? 'open' : 'closed')} />
							</IconButton>
						</Tooltip>
					}
					{rights.template.delete &&
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
								onChange={val => change('name', val)}
								onEnterPressed={update}
								ref={refName}
								type="update"
								value={edit.name}
							/>
						</Grid>
						<Grid item lg={6} md={12}>
							<Typography><strong>Variables</strong></Typography>
							<Variables
								onChange={val => change('variables', val)}
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
									<Tab key={o._id} label={locales[o.locale] + ' ' + o.type} />
								)}
								{rights.content.create &&
									<Tab label={
										<i className="fa-solid fa-plus" />
									} />
								}
							</Tabs>
							<Box className="padding">
								<br />
								{(contents && tab < contents.length &&
									(rights.content.update ?
										<ContentUpdate
											key={contents[tab]._id}
											onError={onError}
											onUpdated={contentUpdated}
											value={contents[tab]}
										/>
									:
										<ContentView
											key={contents[tab]._id}
											onError={onError}
											value={contents[tab]}
										/>
									)
								) ||
								((rights.content.create && contents && tab === contents.length) &&
									<ContentCreate
										locales={locales}
										onCreated={contentCreated}
										onError={onError}
										template={value._id as string}
									/>
								)}
							</Box>
						</Grid>
						<Grid item xs={12} md={3} xl={2}>
							<h4>Available Variables</h4>
							{value && omap(value.variables, (v,k) =>
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