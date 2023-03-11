/**
 * Communications Templates Template Content View Email
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
/**
 * Email
 *
 * Handles viewing template email content
 *
 * @name Email
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
export default function Email(props) {
    // Render
    return (React.createElement(Grid, { container: true, spacing: 2 },
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "Subject"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, props.value.subject),
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "Text"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, props.value.text &&
            React.createElement(Typography, { style: { whiteSpace: 'pre-wrap' } }, props.value.text)),
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "HTML"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, props.value.html &&
            React.createElement(Typography, { style: { whiteSpace: 'pre-wrap' } }, props.value.html))));
}
// Valid props
Email.propTypes = {
    mobile: PropTypes.bool.isRequired,
    value: PropTypes.exact({
        _id: PropTypes.string.isRequired,
        _created: PropTypes.number,
        _updated: PropTypes.number,
        type: PropTypes.oneOf(['email']).isRequired,
        template: PropTypes.string.isRequired,
        locale: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired
    })
};
