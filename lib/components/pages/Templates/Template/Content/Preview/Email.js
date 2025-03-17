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
export default function Email({ value }) {
    // Render
    return (React.createElement(Grid, { container: true, spacing: 2 },
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "Subject"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, value.subject),
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "Text"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, value.text &&
            React.createElement(Typography, { style: { whiteSpace: 'pre-wrap' } }, value.text)),
        React.createElement(Grid, { item: true, xs: 12, md: 4, lg: 2, xl: 1 },
            React.createElement(Typography, null,
                React.createElement("strong", null, "HTML"))),
        React.createElement(Grid, { item: true, xs: 12, md: 8, lg: 10, xl: 11 }, value.html &&
            React.createElement("div", { dangerouslySetInnerHTML: { __html: value.html } }))));
}
// Valid props
Email.propTypes = {
    value: PropTypes.shape({
        subject: PropTypes.string,
        text: PropTypes.string,
        html: PropTypes.string
    })
};
