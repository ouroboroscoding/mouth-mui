/**
 * Locales
 *
 * Keeps track of the locales available
 *
 * @author Chris Nasr <chris@ouroboroscoding.com>
 * @copyright Ouroboros Coding Inc.
 * @created 2021-03-17
 */

// Ouroboros modules
import events from '@ouroboros/events';
import Subscribe, { SubscribeCallback, SubscribeReturn } from '@ouroboros/subscribe';

// Local modules
import mouth from '@ouroboros/mouth';

// Types
export type Option = {
	id: string,
	text: string
}
export type Options = Record<string, Option[]>;

/**
 * Locales
 *
 * Extends the Subscribe class to be created once and exported
 *
 * @name Locales
 * @extends Subscribe
 */
class Locales extends Subscribe {

	// Keep track of failed attempts
	private failed: number;

	// Keeps the state of if the rest request is taking place
	private fetching: boolean;

	/**
	 * Constructor
	 *
	 * Creates a new instance
	 *
	 * @name Locales
	 * @access public
	 * @returns a new instance
	 */
	constructor() {

		// Call the Subscribe constructor with empty data
		super([]);

		// Init the running flag
		this.fetching = false;
	}

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
	static arraySort(records: Record<string, any>[], idKey='_id', valueKey='name'): Options {

		// Init the return
		const oRet: Options = {};

		// Go through each record
		for(const oRecord of records) {

			// Go through each locale
			for(const sLocale of Object.keys(oRecord[valueKey])) {

				// If we don't have the locale
				if(!(sLocale in oRet)) {
					oRet[sLocale] = [];
				}

				// Add the ID and text to the list
				oRet[sLocale].push({
					id: oRecord[idKey],
					text: oRecord[valueKey][sLocale]
				});
			}
		}

		// Go through each locale
		for(const sLocale of Object.keys(oRet)) {

			// Sort it alphabetically
			oRet[sLocale].sort((a, b) => {
				if(a.text.normalize('NFD') === b.text.normalize('NFD')) return 0;
				else return (a.text.normalize('NFD') < b.text.normalize('NFD')) ? -1 : 1;
			});
		}

		// Return the new structure
		return oRet;
	}

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
	static objectSort(records: Record<string, Record<string, string>>): Options {

		// Init the return
		const oRet: Options = {};

		// Go through each record
		for(const sID of Object.keys(records)) {

			// Go through each locale
			for(const sLocale of Object.keys(records[sID])) {

				// If we don't have the locale
				if(!(sLocale in oRet)) {
					oRet[sLocale] = [];
				}

				// Add the ID and text to the list
				oRet[sLocale].push({
					id: sID,
					text: records[sID][sLocale]
				});
			}
		}

		// Go through each locale
		for(const sLocale of Object.keys(oRet)) {

			// Sort it alphabetically
			oRet[sLocale].sort((a, b) => {
				if(a.text.normalize('NFD') === b.text.normalize('NFD')) return 0;
				else return (a.text.normalize('NFD') < b.text.normalize('NFD')) ? -1 : 1;
			});
		}

		// Return the new structure
		return oRet;
	}

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
	private fetch(): void {

		// Mark us as running
		this.fetching = true;

		// Fetch the data from the server
		mouth.read('locales').then((list: any) => {

			// If there's data
			if(list) {

				// Trigger all callbacks
				this.set(list);
			}

			// Finish running
			this.fetching = false;

			// Reset the count
			this.failed = 0;

		}, error => {

			// If we haven't hit the limit
			if(this.failed < 3) {

				// Increase the failed count
				++this.failed;

				// Fetch again
				this.fetch();
			}

			// Else, we can't keep trying, notify the user
			else {
				events.get('error').trigger(error);
			}

		}).finally(() => {

			// Regardless of the outcome, we're done fetching
			this.fetching = false;
		})
	}

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
	subscribe(callback: SubscribeCallback): SubscribeReturn {

		// Call the Subscribe subscribe
		const oReturn = super.subscribe(callback);

		// If we don't have a value yet and it's not running
		if(oReturn.data.length === 0 && this.fetching === false) {

			// Fetch the data
			this.fetch();

			// Overwrite the data
			oReturn.data = [];
		}

		// Return the Subscribe result
		return oReturn;
	}
}

// Create an instance of the class
const locale = new Locales();

// Default export
export default locale;