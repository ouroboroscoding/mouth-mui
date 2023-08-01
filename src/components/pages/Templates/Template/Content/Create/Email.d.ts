/**
 * Communications Templates Template Content Create Email
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
    errors: Record<string, any>;
    onChanged: (field: string, value: string) => void;
    value: Omit<contentStruct, 'type'>;
};
/**
 * Email
 *
 * Handles creating new template content
 *
 * @name Email
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Email(props: EmailProps): React.JSX.Element;
declare namespace Email {
    var propTypes: {
        errors: PropTypes.Validator<object>;
        onChanged: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            subject: PropTypes.Validator<string>;
            text: PropTypes.Validator<string>;
            html: PropTypes.Validator<string>;
        }>>>;
    };
}
export default Email;
