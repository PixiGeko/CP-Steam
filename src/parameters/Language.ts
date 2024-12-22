import * as coda from '@codahq/packs-sdk';

const languages = [
	'arabic',
	'bulgarian',
	'schinese',
	'tchinese',
	'czech',
	'danish',
	'dutch',
	'english',
	'finnish',
	'french',
	'german',
	'greek',
	'hungarian',
	'italian',
	'japanese',
	'koreana',
	'norwegian',
	'polish',
	'portuguese',
	'brazilian',
	'romanian',
	'russian',
	'spanish',
	'latam',
	'swedish',
	'thai',
	'turkish',
	'ukrainian',
	'vietnamese'
];

export const DEFAULT_LANGUAGE = 'english';

export function languageParameter(
	name: string = 'language',
	description: string = 'The language. Autocomplete may not work due to a bug in Coda.',
	optional: boolean = true
) {
	return coda.makeParameter({
		type: coda.ParameterType.String,
		name: name,
		description: description,
		autocomplete: languages,
		optional: optional
	});
}