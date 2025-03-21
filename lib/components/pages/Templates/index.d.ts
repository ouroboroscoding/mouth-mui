/**
 * Templates
 *
 * Templates page
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-19
 */
import PropTypes from 'prop-types';
import React from 'react';
import { responseErrorStruct } from '@ouroboros/body';
export type TemplatesProps = {
    onError: (error: responseErrorStruct) => void;
    onSuccess: (type: string) => void;
};
/**
 * Templates
 *
 * Handles template management
 *
 * @name Templates
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Templates({ onError, onSuccess }: TemplatesProps): React.JSX.Element;
declare namespace Templates {
    var propTypes: {
        onError: PropTypes.Validator<(...args: any[]) => any>;
        onSuccess: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default Templates;
