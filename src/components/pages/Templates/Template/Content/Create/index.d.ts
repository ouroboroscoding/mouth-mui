/**
 * Communications Templates Template Content Create
 *
 * Create component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-22
 */
import PropTypes from 'prop-types';
import React from 'react';
import { contentStruct } from '../../';
import { responseErrorStruct } from '@ouroboros/body';
export type TemplateContentCreateProps = {
    locales: Record<string, string>;
    mobile: boolean;
    onCreated: (content: contentStruct) => void;
    onError: (error: responseErrorStruct) => void;
    template: string;
};
/**
 * Create
 *
 * Handles creating new template content
 *
 * @name Create
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Create(props: TemplateContentCreateProps): React.JSX.Element;
declare namespace Create {
    var propTypes: {
        locales: PropTypes.Validator<{
            [x: string]: string | null | undefined;
        }>;
        mobile: PropTypes.Validator<boolean>;
        onCreated: PropTypes.Validator<(...args: any[]) => any>;
        onError: PropTypes.Requireable<(...args: any[]) => any>;
        template: PropTypes.Validator<string>;
    };
}
export default Create;
