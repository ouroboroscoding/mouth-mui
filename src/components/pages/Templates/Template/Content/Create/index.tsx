/**
 * Communications Templates Template Content Create
 *
 * Create component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */

// Ouroboros modules
import { errorTree } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';
import RadioButtons from '@ouroboros/react-radiobuttons-mui';
import { omap, opop } from '@ouroboros/tools';

// NPM modules
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// Material UI
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

// Local components
import Email from './Email';
import Preview from '../Preview';
import SMS from './SMS';

// Types
import { contentStruct, typeOption } from '../../';
import { responseErrorStruct } from '@ouroboros/body';
export type TemplateContentCreateProps = {
	locales: Record<string, string>,
	onCreated: (content: contentStruct) => void,
	onError: (error: responseErrorStruct) => void,
	template: string
}

/**
 * Create
 *
 * Handles creating new template content
 *
 * @name Create
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Create(
	{ locales, onCreated, onError, template }: TemplateContentCreateProps
) {

	// State
	const [fieldErrors, fieldErrorsSet] = useState<Record<string, any>>({});
	const [preview, previewSet] = useState(false);
	const [record, recordSet] = useState<Omit<contentStruct, 'type'>>({
		locale: Object.keys(locales)[0],
		template,
		subject: '',
		text: '',
		html: ''
	})
	const [type, typeSet] = useState<typeOption>('email');

	// Called to create the new content record
	function create() {

		// Send the record data to the server
		mouth.create(`template/${type}`, record).then((data: string) => {

			// Add the type and ID
			const oRecord = { ...record, type, _id: data }

			// Tell the parent about the new record
			onCreated(oRecord);

		}, (error: responseErrorStruct) => {
			if(error.code === errors.body.DATA_FIELDS) {
				fieldErrorsSet(errorTree(error.msg));
			} else if(error.code === errors.body.DB_DUPLICATE) {
				fieldErrorsSet({ locale: 'Already used' });
			} else if(error.code === errors.TEMPLATE_CONTENT_ERROR) {
				const oLines: { templates: string[], variables: string[] } = { templates: [], variables: [] };
				for(const l of error.msg) {
					if(l[0] === 'template') {
						oLines.templates.push(l[1]);
					} else if(l[0] === 'variable') {
						oLines.variables.push(l[1]);
					}
				}
				const lLines = [];
				if(oLines.templates.length) {
					lLines.push('The following templates are invalid: ' + oLines.templates.join(', '));
				}
				if(oLines.variables.length) {
					lLines.push('The following variables are invalid: ' + oLines.variables.join(', '));
				}

				// Show the errors
				if(onError) {
					onError({ code: 0, msg: lLines.join('\n') });
				}
			} else {
				onError(error);
			}
		});
	}

	// Called when any fields in the record are changed
	function recordChanged(field: string, value: any) {

		// Clear error
		if(field in fieldErrors) {
			const oErrors = { ...fieldErrors };
			delete oErrors[field];
			fieldErrorsSet(oErrors);
		}

		// Set the new record
		recordSet(o => { return { ...o, [field]: value } });
	}

	// Called when the type is changed
	function typeChanged(value: string) {

		// Clone the current record
		const oRecord = { ...record };

		// If the new type is email
		if(value === 'email') {

			// Store the content in the text field and remove it
			oRecord.text = opop(oRecord, 'content');

			// Add the subject and html fields
			oRecord.subject = '';
			oRecord.html = '';
		}

		// Else, if it's SMS
		else if(value === 'sms') {

			// Store the text in the content field and remove it
			oRecord.content = opop(oRecord, 'text');

			// Remove the subject and html fields
			delete oRecord.subject;
			delete oRecord.html;
		}

		// Else, invalid value
		else {
			throw new Error('invalid `value`');
		}

		// Set the type
		typeSet(value);

		// Set the record
		recordSet(oRecord);
	}

	// Render
	return (
		<Grid container spacing={2} className="content_create">
			<Grid item xs={12} md={6}>
				<RadioButtons
					border={true}
					gridContainerProps={{spacing: 2}}
					gridItemProps={{
						xs: 12,
						sm: 6
					}}
					label="Type"
					onChange={typeChanged}
					options={[
						{text: 'E-Mail', value: 'email'},
						{text: 'SMS', value: 'sms'}]}
					value={type}
					variant="grid"
				/>
			</Grid>
			<Grid item xs={12} md={6} className="field">
				<FormControl variant="outlined" error={'locale' in fieldErrors ? true : false}>
					<InputLabel id="content_create_locale">Locale</InputLabel>
					<Select
						label="Locale"
						labelId="content_create_locale"
						native
						onChange={ev => recordChanged('locale', ev.target.value)}
						value={record.locale}
					>
						{omap(locales, (v,k) =>
							<option key={k} value={k}>{v}</option>
						)}
					</Select>
					{fieldErrors.locale &&
						<FormHelperText>{fieldErrors.locale}</FormHelperText>
					}
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				{(type === 'email' &&
					<Email
						errors={fieldErrors}
						onChanged={recordChanged}
						value={record}
					/>
				) || (type === 'sms' &&
					<SMS
						errors={fieldErrors}
						onChanged={recordChanged}
						value={record}
					/>
				)}
			</Grid>
			<Grid item xs={12} className="actions">
				<Button color="info" onClick={() => previewSet(true)} variant="contained">Preview</Button>
				<Button color="primary" onClick={create} variant="contained">Add Content</Button>
				{preview &&
					<Preview
						onClose={() => previewSet(false)}
						onError={(error: responseErrorStruct) => {
							if(error.code === errors.body.DATA_FIELDS) {
								fieldErrorsSet(errorTree(error.msg));
							} else {
								onError(error);
							}
							previewSet(false);
						}}
						value={{ ...record, type }}
					/>
				}
			</Grid>
		</Grid>
	);
}

// Valid props
Create.propTypes = {
	locales: PropTypes.objectOf(PropTypes.string).isRequired,
	onCreated: PropTypes.func.isRequired,
	onError: PropTypes.func,
	template: PropTypes.string.isRequired
}