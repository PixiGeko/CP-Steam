import * as coda from '@codahq/packs-sdk';

export const DEFAULT_IGNORE_PROFILE_NOT_FOUND = false;

export function ignoreFailedProfile(
	name: string = 'ignoreFailedProfile',
	description: string = 'Ignore the private/invalid profile. The formula will return an empty array instead of an error.',
	optional: boolean = true
) {
	return coda.makeParameter({
		type: coda.ParameterType.Boolean,
		name: name,
		description: description,
		optional: optional
	});
}