/**
 * Communications Templates Template Content Preview SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
import PropTypes from 'prop-types';
import React from 'react';
export type SMSProps = {
    mobile: boolean;
    value: string;
};
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
declare function SMS(props: SMSProps): React.JSX.Element;
declare namespace SMS {
    var propTypes: {
        mobile: PropTypes.Validator<boolean>;
        value: PropTypes.Validator<string>;
    };
}
export default SMS;
