/**
 * Communications Templates Template Content View
 *
 * View component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */

// NPM modules
import PropTypes from 'prop-types';
import React, { useState } from 'react';

// Material UI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Local components
import Email from './Email';
import Preview from '../Preview';
import SMS from './SMS';

// Types
import { responseErrorStruct } from '@ouroboros/body';
import { contentStruct } from '../..';
export type ViewProps = {
	onError: (error: responseErrorStruct) => void,
	value: contentStruct
}

/**
 * View
 *
 * Handles viewing template content
 *
 * @name View
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function View({ onError, value }: ViewProps) {

	// State
	const [ preview, previewSet ] = useState(false);

	// Render
	return (
		<Box className="content_view">
			{(value.type === 'email' &&
				<Email key={value._id} value={value} />
			) || (value.type === 'sms' &&
				<SMS key={value._id} value={value} />
			)}
			<Box className="actions">
				<Button color="info" onClick={() => previewSet(true)} variant="contained">Preview</Button>
				{preview &&
					<Preview
						onClose={() => previewSet(false)}
						onError={onError}
						value={value}
					/>
				}
			</Box>
		</Box>
	);
}

// Valid props
View.propTypes = {
	onError: PropTypes.func.isRequired,
	value: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		type: PropTypes.oneOf([ 'email', 'sms' ]).isRequired
	})
}