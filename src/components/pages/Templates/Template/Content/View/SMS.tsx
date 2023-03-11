/**
 * Communications Templates Template Content View SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */

// NPM modules
import PropTypes from 'prop-types';
import React from 'react';

// Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Types
import { contentStruct } from '../../';
export type SMSProps = {
	mobile: boolean,
	value: contentStruct
}

/**
 * SMS
 *
 * Handles viewing template sms content
 *
 * @name SMS
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function SMS(props: SMSProps) {

	// Render
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={4} lg={2} xl={1}>
				<Typography><strong>Content</strong></Typography>
			</Grid>
			<Grid item xs={12} md={8} lg={10} xl={11}>
				{props.value.content &&
					<Typography style={{whiteSpace: 'pre-wrap'}}>{props.value.content}</Typography>
				}
			</Grid>
		</Grid>
	);
}

// Valid props
SMS.propTypes = {
	mobile: PropTypes.bool.isRequired,
	value: PropTypes.exact({
		_id: PropTypes.string.isRequired,
		_created: PropTypes.number,
		_updated: PropTypes.number,
		type: PropTypes.oneOf(['sms']).isRequired,
		template: PropTypes.string.isRequired,
		locale: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired
	})
}