import * as coda from '@codahq/packs-sdk';

export const GenresSchema = coda.makeObjectSchema({
	properties: {
		id: { type: coda.ValueType.Number },
		description: { type: coda.ValueType.String }
	}
});