/**
 * Communications Templates Template Content Preview
 *
 * Preview component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-23
 */
import PropTypes from 'prop-types';
import React from 'react';
import { contentStruct } from '../..';
import { responseErrorStruct } from '@ouroboros/body';
export type PreviewProps = {
    onClose: () => void;
    onError: (error: responseErrorStruct) => void;
    value: contentStruct;
};
/**
 * Preview
 *
 * Handles viewing template content
 *
 * @name Preview
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Preview({ onClose, onError, value }: PreviewProps): React.JSX.Element;
declare namespace Preview {
    var propTypes: {
        onClose: PropTypes.Validator<(...args: any[]) => any>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Requireable<PropTypes.InferProps<{
            locale: PropTypes.Validator<string>;
            template: PropTypes.Requireable<string>;
            type: PropTypes.Validator<string>;
        }>>;
    };
}
export default Preview;
