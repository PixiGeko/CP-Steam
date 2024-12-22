import * as coda from '@codahq/packs-sdk';

export const PlatformsSchema = coda.makeObjectSchema({
	properties: {
		windows: { type: coda.ValueType.Boolean },
		mac: { type: coda.ValueType.Boolean },
		linux: { type: coda.ValueType.Boolean }
	}
});