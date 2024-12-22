import * as coda from '@codahq/packs-sdk';

export const ReleaseDateSchema = coda.makeObjectSchema({
	properties: {
		coming_soon: { type: coda.ValueType.Boolean },
		date: { type: coda.ValueType.String, codaType: coda.ValueHintType.Date }
	}
});