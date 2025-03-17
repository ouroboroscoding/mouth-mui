/**
 * Communications Templates Template Content View SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
import PropTypes from 'prop-types';
import React from 'react';
import { contentStruct } from '../../';
export type SMSProps = {
    value: contentStruct;
};
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
declare function SMS({ value }: SMSProps): React.JSX.Element;
declare namespace SMS {
    var propTypes: {
        value: PropTypes.Requireable<Required<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            _created: PropTypes.Requireable<number>;
            _updated: PropTypes.Requireable<number>;
            type: PropTypes.Validator<string>;
            template: PropTypes.Validator<string>;
            locale: PropTypes.Validator<string>;
            content: PropTypes.Validator<string>;
        }>>>;
    };
}
export default SMS;
