import * as coda from '@codahq/packs-sdk';

export const RequirementsSchema = coda.makeObjectSchema({
	properties: {
		minimum: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		recommended: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html }
	}
});