/**
 * Communications Templates Template Content Preview
 *
 * Preview component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */

// Ouroboos modules
import { errorTree } from '@ouroboros/define-mui';
import mouth, { errors } from '@ouroboros/mouth';

// NPM modules
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// Material UI
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

// Local components
import Email from './Email';
import SMS from './SMS';

// Types
import { contentStruct } from '../..';
import { responseErrorStruct } from '@ouroboros/body';
export type PreviewProps = {
	onClose: () => void,
	onError: (error: responseErrorStruct) => void,
	value: contentStruct
}

/**
 * Preview
 *
 * Handles viewing template content
 *
 * @name Preview
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Preview({ onClose, onError, value }: PreviewProps) {

	// State
	const [ preview, previewSet ] = useState<contentStruct | string | false>(false);

	// Value effect
	useEffect(() => {
		mouth.create(
			`template/${value.type}/generate`,
			value
		).then(previewSet, onError);
	}, [value, onError]);

	// Render
	return (
		<Dialog
			fullWidth={true}
			maxWidth="lg"
			onClose={onClose}
			open={true}
			aria-labelledby="template-content-preview-title"
		>
			<DialogTitle id="template-content-preview-title">Template Preview for {value.locale}-{value.type}</DialogTitle>
			<DialogContent dividers className="content_preview">
				{preview === false ?
					<Typography>Loading...</Typography>
				: (
					value.type === 'email' &&
						<Email
							key={value.template + '_' + value.locale + '_email'}
							value={preview as contentStruct}
						/>
				) || (
					value.type === 'sms' &&
						<SMS
							key={value.template + '_' + value.locale + '_sms'}
							value={preview as string}
						/>
				)}
			</DialogContent>
		</Dialog>
	);
}

// Valid props
Preview.propTypes = {
	onClose: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired,
	value: PropTypes.shape({
		locale: PropTypes.string.isRequired,
		template: PropTypes.string,
		type: PropTypes.oneOf(['email', 'sms']).isRequired
	})
}