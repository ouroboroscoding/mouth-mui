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
import clone from '@ouroboros/clone';
import mouth from '@ouroboros/mouth';
import { afindi } from '@ouroboros/tools';

// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Material UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

// Locale components
import Create from './Create'
import Template, { templateStruct } from './Template';

// Types
import { responseErrorStruct } from '@ouroboros/body';
export type TemplatesProps = {
	mobile: boolean,
	onError: (error: responseErrorStruct) => void,
	onSuccess: (type: string) => void
}

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
export default function Templates(props: TemplatesProps) {

	// State
	const [create, createSet] = useState<boolean>(false);
	const [locales, localesSet] = useState<Record<string, string>>({});
	const [templates, templatesSet] = useState<templateStruct[]>([]);

	// Hooks
	const rightsContent = useRights('mouth_content');
	const rightsTemplate = useRights('mouth_template');

	// User / archived change effect
	useEffect(() => {

		// If we have template read permissions
		if(rightsTemplate.read) {
			mouth.read('locales').then((data: Record<string, any>[]) => {
				const oLocales: Record<string, string> = {};
				for(const o of data) {
					oLocales[o._id] = o.name;
				}
				localesSet(oLocales);
			});
			mouth.read('templates').then(templatesSet);
		} else {
			localesSet({});
			templatesSet([]);
		}

		// If we have no template create right
		if(!rightsTemplate.create) {
			createSet(false);
		}

	}, [rightsTemplate]);

	// Called when a template has been created
	function templateCreated(template: templateStruct) {

		// Notify parent
		props.onSuccess('template_create');

		// Hide the create form
		createSet(false);

		// Clone the current templates, add the new one to the front, and set
		//	the new templates
		const lTemplates = clone(templates);
		lTemplates.unshift(template);
		templatesSet(lTemplates);
	}

	// Called when a template has been updated
	function templateUpdated(template: templateStruct) {

		// Notify parent
		props.onSuccess('template_update');

		// Look for the template
		const i = afindi(templates, '_id', template._id);

		// If we have it
		if(i > -1) {

			// Clone the current templates, update the index, and set the new
			//	templates
			const lTemplates = clone(templates);
			lTemplates[i] = template;
			templatesSet(lTemplates);
		}
	}

	// Render
	return (
		<Box id="mouth_templates" className="flexGrow padding">
			<Box className="flexColumns">
				<h1 className="flexGrow">Templates</h1>
				{rightsTemplate.create &&
					<Box className="flexStatic">
						<Tooltip title="Create new Template" className="page_action" onClick={() => createSet(b => !b)}>
							<IconButton>
								<i className={'fa-solid fa-plus' + (create ? ' open' : '')} />
							</IconButton>
						</Tooltip>
					</Box>
				}
			</Box>
			{create &&
				<Create
					onCancel={() => createSet(false)}
					onCreated={templateCreated}
					onError={props.onError}
				/>
			}
			{templates.map((o: templateStruct) =>
				<Template
					key={o._id}
					locales={locales}
					mobile={props.mobile}
					onChange={templateUpdated}
					onContent={type => props.onSuccess(`content_${type}`)}
					onError={props.onError}
					rights={{
						content: rightsContent,
						template: rightsTemplate
					}}
					value={o}
				/>
			)}
		</Box>
	);
}

// Valid props
Templates.propTypes = {
	mobile: PropTypes.bool.isRequired,
	onError: PropTypes.func.isRequired,
	onSuccess: PropTypes.func.isRequired
}