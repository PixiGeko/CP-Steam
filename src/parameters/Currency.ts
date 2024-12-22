import * as coda from '@codahq/packs-sdk';

// TODO : add more currencies
const currencies: coda.SimpleAutocompleteOption<coda.ParameterType.String>[] = [
	{ display: '$ (dollar)', value: 'us' },
	{ display: '£ (pound)', value: 'gb' },
	{ display: '€ (euro)', value: 'fr' },
	{ display: '¥ (yen)', value: 'jp' }
];

export const DEFAULT_CURRENCY = 'us';

export function currencyParameter(
	name: string = 'currency',
	description: string = 'The country code of the currency. Autocomplete may not work due to a bug with Coda.',
	optional: boolean = true
) {
	return coda.makeParameter({
		type: coda.ParameterType.String,
		name: name,
		description: description,
		autocomplete: currencies,
		optional: optional
	});
}