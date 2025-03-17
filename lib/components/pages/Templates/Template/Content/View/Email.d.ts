/**
 * Communications Templates Template Content View Email
 *
 * Email component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
import PropTypes from 'prop-types';
import React from 'react';
import { contentStruct } from '../../';
export type EmailProps = {
    value: contentStruct;
};
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
declare function Email({ value }: EmailProps): React.JSX.Element;
declare namespace Email {
    var propTypes: {
        value: PropTypes.Requireable<Required<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            _created: PropTypes.Requireable<number>;
            _updated: PropTypes.Requireable<number>;
            type: PropTypes.Validator<string>;
            template: PropTypes.Validator<string>;
            locale: PropTypes.Validator<string>;
            subject: PropTypes.Validator<string>;
            text: PropTypes.Validator<string>;
            html: PropTypes.Validator<string>;
        }>>>;
    };
}
export default Email;
