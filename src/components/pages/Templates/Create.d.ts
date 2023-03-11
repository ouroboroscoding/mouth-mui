/**
 * Templates Create
 *
 * Create component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */
/// <reference types="react" />
import PropTypes from 'prop-types';
import { responseErrorStruct } from '@ouroboros/body';
import { templateStruct } from './Template';
export interface CreateProps {
    onCancel?: () => void;
    onCreated: (template: templateStruct) => void;
    onError: (error: responseErrorStruct) => void;
}
/**
 * Create
 *
 * Form for creating a new template
 *
 * @name Create
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Create(props: CreateProps): JSX.Element;
declare namespace Create {
    var propTypes: {
        onCancel: PropTypes.Requireable<(...args: any[]) => any>;
        onCreated: PropTypes.Validator<(...args: any[]) => any>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
    };
}
export default Create;
