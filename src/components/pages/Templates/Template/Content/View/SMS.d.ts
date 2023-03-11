/**
 * Communications Templates Template Content View SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
/// <reference types="react" />
import PropTypes from 'prop-types';
import { contentStruct } from '../../';
export type SMSProps = {
    mobile: boolean;
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
declare function SMS(props: SMSProps): JSX.Element;
declare namespace SMS {
    var propTypes: {
        mobile: PropTypes.Validator<boolean>;
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
