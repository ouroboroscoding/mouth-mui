/**
 * Communications Templates Template Content Update SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */

// Ouroboros modules
import { Node } from '@ouroboros/define';
import { DefineNode } from '@ouroboros/define-mui';
import TemplateSMS from '@ouroboros/mouth/definitions/template_sms.json';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Box from '@mui/material/Box';

// Record Nodes
const oContentNode = new Node(TemplateSMS.content);

// Types
import { contentStruct } from '../../';
export type SMSProps = {
	errors: Record<string, any>,
	onChanged: (field: string, value: string) => void,
	value: Omit<contentStruct, 'type'>
}

/**
 * SMS
 *
 * Handles creating new template content
 *
 * @name SMS
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function SMS(props: SMSProps) {

	// Render
	return (
		<Box className="content_update_sms field">
			<DefineNode
				error={props.errors.content || false}
				label="placeholder"
				name="content"
				node={oContentNode}
				onChange={val => props.onChanged('content', val)}
				type="update"
				value={props.value.content}
			/>
		</Box>
	);
}

// Valid props
SMS.propTypes = {
	errors: PropTypes.object.isRequired,
	onChanged: PropTypes.func.isRequired,
	value: PropTypes.shape({
		content: PropTypes.string.isRequired
	}).isRequired
}