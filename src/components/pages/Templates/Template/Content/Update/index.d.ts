/**
 * Communications Templates Template Content Update
 *
 * Update component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
/// <reference types="react" />
import PropTypes from 'prop-types';
import { responseErrorStruct } from '@ouroboros/body';
import { contentStruct } from '../..';
export type updateStruct = Omit<contentStruct, 'type'>;
export type UpdateProps = {
    mobile: boolean;
    onError: (error: responseErrorStruct) => void;
    onUpdated: (content: contentStruct) => void;
    value: contentStruct;
};
/**
 * Update
 *
 * Handles updating template content
 *
 * @name Update
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Update(props: UpdateProps): JSX.Element;
declare namespace Update {
    var propTypes: {
        mobile: PropTypes.Validator<boolean>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
        onUpdated: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Requireable<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            type: PropTypes.Validator<string>;
        }>>;
    };
}
export default Update;
