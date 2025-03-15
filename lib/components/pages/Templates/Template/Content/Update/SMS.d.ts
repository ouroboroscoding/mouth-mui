/**
 * Communications Templates Template Content Update SMS
 *
 * SMS component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
import PropTypes from 'prop-types';
import React from 'react';
import { contentStruct } from '../../';
export type SMSProps = {
    errors: Record<string, any>;
    onChanged: (field: string, value: string) => void;
    value: Omit<contentStruct, 'type'>;
};
/**
 * SMS
 *
 * Handles creating new template content
 *
 * @name SMS
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function SMS({ errors, onChanged, value }: SMSProps): React.JSX.Element;
declare namespace SMS {
    var propTypes: {
        errors: PropTypes.Validator<object>;
        onChanged: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Validator<NonNullable<PropTypes.InferProps<{
            content: PropTypes.Validator<string>;
        }>>>;
    };
}
export default SMS;
