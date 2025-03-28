/**
 * Communications Locales
 *
 * Locales page
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-19
 */
import PropTypes from 'prop-types';
import React from 'react';
import { responseErrorStruct } from '@ouroboros/body';
export type LocalesProps = {
    onError: (error: responseErrorStruct) => void;
    onSuccess: (type: string) => void;
};
/**
 * Locales
 *
 * Handles template locale management
 *
 * @name Locales
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Locales({ onError, onSuccess }: LocalesProps): React.JSX.Element;
declare namespace Locales {
    var propTypes: {
        onError: PropTypes.Validator<(...args: any[]) => any>;
        onSuccess: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default Locales;
