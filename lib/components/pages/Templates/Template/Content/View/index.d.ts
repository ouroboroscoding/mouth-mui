/**
 * Communications Templates Template Content View
 *
 * View component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
import PropTypes from 'prop-types';
import React from 'react';
import { responseErrorStruct } from '@ouroboros/body';
import { contentStruct } from '../..';
export type ViewProps = {
    mobile: boolean;
    onError: (error: responseErrorStruct) => void;
    value: contentStruct;
};
/**
 * View
 *
 * Handles viewing template content
 *
 * @name View
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function View(props: ViewProps): React.JSX.Element;
declare namespace View {
    var propTypes: {
        mobile: PropTypes.Validator<boolean>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Requireable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            type: PropTypes.Validator<string>;
        }>>;
    };
}
export default View;
