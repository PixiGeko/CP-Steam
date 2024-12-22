import * as coda from '@codahq/packs-sdk';

export const CategoriesSchema = coda.makeObjectSchema({
	properties: {
		id: { type: coda.ValueType.Number },
		description: { type: coda.ValueType.String }
	}
});