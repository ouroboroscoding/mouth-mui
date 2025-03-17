/**
 * Communications Templates Template Content Update Email
 *
 * Email component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */

// Ouroboros modules
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Grid from '@mui/material/Grid';

// Import the shared types
import { EmailTree } from '../../../../../../shared';

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
export default function Email({ errors, onChanged, value }: EmailProps) {

	// Render
	return (
		<Grid container className="content_update_email" spacing={1}>
			<Grid item xs={12} className="field">
				<DefineNode
					error={errors.subject || false}
					label="placeholder"
					name="subject"
					node={EmailTree.get('subject') as Node}
					onChange={val => onChanged('subject', val)}
					type="update"
					value={value.subject}
				/>
			</Grid>
			<Grid item xs={12} lg={6} className="field">
				<DefineNode
					error={errors.text || false}
					label="placeholder"
					name="text"
					node={EmailTree.get('text') as Node}
					onChange={val => onChanged('text', val)}
					type="update"
					value={value.text}
				/>
			</Grid>
			<Grid item xs={12} lg={6} className="field">
				<DefineNode
					error={errors.html || false}
					label="placeholder"
					name="html"
					node={EmailTree.get('html') as Node}
					onChange={val => onChanged('html', val)}
					type="update"
					value={value.html}
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