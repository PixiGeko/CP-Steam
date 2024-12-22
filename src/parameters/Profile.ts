import * as coda from '@codahq/packs-sdk';

export function profileIdParameter(
	name: string = 'profileId',
	description: string = 'The profile id as a string (enclosed with double quotes). Avoid numbers as they are not well handled. You can add "@" in front of the id to ensure the id is detected as a string',
	optional: boolean = false
) {
	return coda.makeParameter({
		type: coda.ParameterType.String,
		name: name,
		description: description,
		optional: optional
	});
}

export function profileIdsParameter(
	name: string = 'profileIds',
	description: string = 'A list of the profile ids as a string (enclosed with double quotes). Avoid numbers as they are not well handled. You can add "@" in front of the id to ensure the id is detected as a string',
	optional: boolean = false
) {
	return coda.makeParameter({
		type: coda.ParameterType.SparseStringArray,
		name: name,
		description: description,
		optional: optional
	});
}