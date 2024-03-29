/**
 * Locales
 *
 * Keeps track of the locales available
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2021-03-17
 */
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';
export type Option = {
    id: string;
    text: string;
};
export type Options = Record<string, Option[]>;
/**
 * Locales
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name Locales
 * @extends Subscribe
 */
declare class Locales extends Subscribe {
    private failed;
    private fetching;
    /**
     * Constructor
     *
     * Creates a new instance
     *
     * @name Locales
     * @access public
     * @returns a new instance
     */
    constructor();
    /**
     * Array Sort
     *
     * Splits the records so they are stored by locale and then orders them
     * alphabetically
     *
     * @name arraySort
     * @param records The records to sort
     * @param idKey The primary key of the records to sort
     * @param valueKey The value with locale data in the records
     */
    static arraySort(records: Record<string, any>[], idKey?: string, valueKey?: string): Options;
    /**
     * Object Sort
     *
     * Splits the records so they are stored by locale and then orders them
     * alphabetically
     *
     * @name objectSort
     * @access public
     * @param records The records to re-order
     * @returns an object of locale keys to option records sorted by the display
     * 			text
     */
    static objectSort(records: Record<string, Record<string, string>>): Options;
    /**
     * Fetch
     *
     * Private method to fetch the locales from the server which loops if
     * there's network issues
     *
     * @name fetch
     * @access private
     * @returns void
     */
    private fetch;
    /**
     * Subscribe
     *
     * Override the subscribe method to initiate the fetching process
     *
     * @name subscribe
     * @access public
     * @param callback The function to call when locales change
     * @returns an object with the current available `data` and `unsubscribe`
     * 			to remove the callback from the list when we're done
     */
    subscribe(callback: SubscribeCallback): SubscribeReturn;
}
declare const locale: Locales;
export default locale;
