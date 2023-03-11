/**
 * Communications Templates Variables
 *
 * Variables component
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @created 2023-01-20
 */
/// <reference types="react" />
import PropTypes from 'prop-types';
export type VariablesProps = {
    onChange: (variables: Record<string, string>) => void;
    value: Record<string, string>;
};
/**
 * Variables
 *
 * Handles template locale management
 *
 * @name Variables
 * @access public
 * @param Object props Properties passed to the component
 * @returns React.Component
 */
declare function Variables(props: VariablesProps): JSX.Element;
declare namespace Variables {
    var propTypes: {
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        value: PropTypes.Validator<{
            [x: string]: string | null | undefined;
        }>;
    };
}
export default Variables;
