/**
 * Communications Templates Template Content Oreview Email
 *
 * Email component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
/// <reference types="react" />
import PropTypes from 'prop-types';
import { contentStruct } from '../..';
export type EmailProps = {
    mobile: boolean;
    value: contentStruct;
};
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
declare function Email(props: EmailProps): JSX.Element;
declare namespace Email {
    var propTypes: {
        mobile: PropTypes.Validator<boolean>;
        value: PropTypes.Requireable<PropTypes.InferProps<{
            subject: PropTypes.Requireable<string>;
            text: PropTypes.Requireable<string>;
            html: PropTypes.Requireable<string>;
        }>>;
    };
}
export default Email;
