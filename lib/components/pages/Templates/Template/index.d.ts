/**
 * Communications Templates Template
 *
 * Template component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */
import PropTypes from 'prop-types';
import React from 'react';
import { responseErrorStruct } from '@ouroboros/body';
import { idStruct } from '@ouroboros/brain-react';
export type contentStruct = {
    _id?: string;
    _created?: number;
    _updated?: number;
    template: string;
    locale: string;
    content?: string;
    subject?: string;
    text?: string;
    type: typeOption;
    html?: string;
};
export type templateStruct = {
    _id?: string;
    _created?: number;
    _updated?: number;
    name: string;
    variables: Record<string, string>;
};
export type typeOption = 'email' | 'sms';
export type TemplateProps = {
    locales: Record<string, string>;
    onChange: (template: templateStruct) => void;
    onError: (error: responseErrorStruct) => void;
    onContent: (type: string) => void;
    rights: {
        template: idStruct;
        content: idStruct;
    };
    value: templateStruct;
};
/**
 * Template
 *
 * Handles a single template
 *
 * @name Template
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Template({ locales, onChange, onError, onContent, rights, value }: TemplateProps): React.JSX.Element;
declare namespace Template {
    var propTypes: {
        locales: PropTypes.Validator<{
            [x: string]: string | null | undefined;
        }>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        onError: PropTypes.Validator<(...args: any[]) => any>;
        onContent: PropTypes.Validator<(...args: any[]) => any>;
        rights: PropTypes.Requireable<Required<PropTypes.InferProps<{
            template: PropTypes.Validator<Required<PropTypes.InferProps<{
                create: PropTypes.Requireable<boolean>;
                delete: PropTypes.Requireable<boolean>;
                read: PropTypes.Requireable<boolean>;
                update: PropTypes.Requireable<boolean>;
            }>>>;
            content: PropTypes.Validator<Required<PropTypes.InferProps<{
                create: PropTypes.Requireable<boolean>;
                delete: PropTypes.Requireable<boolean>;
                read: PropTypes.Requireable<boolean>;
                update: PropTypes.Requireable<boolean>;
            }>>>;
        }>>>;
        value: PropTypes.Validator<Required<PropTypes.InferProps<{
            _id: PropTypes.Validator<string>;
            _created: PropTypes.Requireable<number>;
            _updated: PropTypes.Requireable<number>;
            name: PropTypes.Validator<string>;
            variables: PropTypes.Validator<{
                [x: string]: string | null | undefined;
            }>;
        }>>>;
    };
}
export default Template;
