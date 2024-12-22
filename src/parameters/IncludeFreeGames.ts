import * as coda from '@codahq/packs-sdk';

export const DEFAULT_WITH_GAME_DETAILS = false;

export function includeFreeGames(
	name: string = 'includeFreeGames',
	description: string = 'Include the free games the profile has played.',
	optional: boolean = true
) {
	return coda.makeParameter({
		type: coda.ParameterType.Boolean,
		name: name,
		description: description,
		optional: optional
	});
}