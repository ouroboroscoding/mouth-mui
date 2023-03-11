/**
 * Communications Templates Template Content Create Email
 *
 * Email component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */

// Ouroboros modules
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import TemplateEmail from '@ouroboros/mouth/definitions/template_email.json';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Grid from '@mui/material/Grid';

// Record Nodes
const oSubjectNode = new Node(TemplateEmail.subject);
const oTextNode = new Node(TemplateEmail.text);
const oHtmlNode = new Node(TemplateEmail.html);

// Types
import { contentStruct } from '../../';
export type EmailProps = {
	errors: Record<string, any>,
	onChanged: (field: string, value: string) => void,
	value: Omit<contentStruct, 'type'>
}

/**
 * Email
 *
 * Handles creating new template content
 *
 * @name Email
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Email(props: EmailProps) {

	// Render
	return (
		<Grid container className="content_create_email" spacing={1}>
			<Grid item xs={12} className="field">
				<DefineNode
					error={props.errors.subject || false}
					label="placeholder"
					name="subject"
					node={oSubjectNode}
					onChange={val => props.onChanged('subject', val)}
					type="create"
					value={props.value.subject}
				/>
			</Grid>
			<Grid item xs={12} lg={6} className="field">
				<DefineNode
					error={props.errors.text || false}
					label="placeholder"
					name="text"
					node={oTextNode}
					onChange={val => props.onChanged('text', val)}
					type="create"
					value={props.value.text}
				/>
			</Grid>
			<Grid item xs={12} lg={6} className="field">
				<DefineNode
					error={props.errors.html || false}
					label="placeholder"
					name="html"
					node={oHtmlNode}
					onChange={val => props.onChanged('html', val)}
					type="create"
					value={props.value.html}
				/>
			</Grid>
		</Grid>
	);
}

// Valid props
Email.propTypes = {
	errors: PropTypes.object.isRequired,
	onChanged: PropTypes.func.isRequired,
	value: PropTypes.shape({
		subject: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		html: PropTypes.string.isRequired
	}).isRequired
}