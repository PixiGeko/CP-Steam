import * as coda from '@codahq/packs-sdk';

export const PriceSchema = coda.makeObjectSchema({
	properties: {
		currency: { type: coda.ValueType.String },
		initial: { type: coda.ValueType.Number },
		final: { type: coda.ValueType.Number },
		discount_percent: { type: coda.ValueType.Number },
		initial_formatted: { type: coda.ValueType.String },
		final_formatted: { type: coda.ValueType.String }
	}
});