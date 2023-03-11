/**
 * Communications Templates Template Content Oreview Email
 *
 * Email component
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

// UI Shared components
//import FreeText from 'ui-shared/components/elements/FreeText';
//<FreeText content={props.value.text} />

// Types
import { contentStruct } from '../..';
export type EmailProps = {
	mobile: boolean,
	value: contentStruct
}

/**
 * Email
 *
 * Handles previewing template email content
 *
 * @name Email
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Email(props: EmailProps) {

	// Render
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={4} lg={2} xl={1}>
				<Typography><strong>Subject</strong></Typography>
			</Grid>
			<Grid item xs={12} md={8} lg={10} xl={11}>
				{props.value.subject}
			</Grid>
			<Grid item xs={12} md={4} lg={2} xl={1}>
				<Typography><strong>Text</strong></Typography>
			</Grid>
			<Grid item xs={12} md={8} lg={10} xl={11}>
				{props.value.text &&
					<Typography style={{whiteSpace: 'pre-wrap'}}>{props.value.text}</Typography>
				}
			</Grid>
			<Grid item xs={12} md={4} lg={2} xl={1}>
				<Typography><strong>HTML</strong></Typography>
			</Grid>
			<Grid item xs={12} md={8} lg={10} xl={11}>
				{props.value.html &&
					<div dangerouslySetInnerHTML={{__html: props.value.html}} />
				}
			</Grid>
		</Grid>
	);
}

// Valid props
Email.propTypes = {
	mobile: PropTypes.bool.isRequired,
	value: PropTypes.shape({
		subject: PropTypes.string,
		text: PropTypes.string,
		html: PropTypes.string
	})
}