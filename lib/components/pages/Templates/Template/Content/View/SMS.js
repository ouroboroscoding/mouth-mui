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
export default function SMS({ value }) {
    // Render
    return (React.createElement(Grid, { container: true, spacing: 2 },
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "Content"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, value.content &&
            React.createElement(Typography, { style: { whiteSpace: 'pre-wrap' } }, value.content))));
}
// Valid props
SMS.propTypes = {
    value: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        _created: PropTypes.number,
        _updated: PropTypes.number,
        type: PropTypes.oneOf(['sms']).isRequired,
        template: PropTypes.string.isRequired,
        locale: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    })
};
