import * as coda from '@codahq/packs-sdk';

export const SupportInfoSchema = coda.makeObjectSchema({
	properties: {
		url: { type: coda.ValueType.String },
		email: { type: coda.ValueType.String, codaType: coda.ValueHintType.Email }
	}
});