/**
 * Communications Templates Template Content Preview SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
// NPM modules
import PropTypes from 'prop-types';
import React from 'react';
// Material UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
/**
 * SMS
 *
 * Handles previewing template sms content
 *
 * @name SMS
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function SMS(props) {
    // Render
    return (React.createElement(Grid, { container: true, spacing: 2 },
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "Content"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, props.value &&
            React.createElement(Typography, { style: { whiteSpace: 'pre-wrap' } }, props.value))));
}
// Valid props
SMS.propTypes = {
    mobile: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired
};
