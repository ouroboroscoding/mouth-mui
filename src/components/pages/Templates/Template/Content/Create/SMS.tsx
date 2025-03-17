/**
 * Communications Templates Template Content Create SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */

// Ouroboros modules
import { DefineNode } from '@ouroboros/define-mui';

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Box from '@mui/material/Box';

// Import the shared types
import { SmsTree } from '../../../../../../shared';

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
export default function SMS({ errors, onChanged, value }: SMSProps) {

	// Render
	return (
		<Box className="content_create_sms field">
			<DefineNode
				error={errors.content || false}
				label="placeholder"
				name="content"
				node={SmsTree.get('content') as any}
				onChange={val => onChanged('content', val)}
				type="create"
				value={value.content}
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