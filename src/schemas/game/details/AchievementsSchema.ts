import * as coda from '@codahq/packs-sdk';

export const AchievementsDetailsSchema = coda.makeObjectSchema({
	properties: {
		name: { type: coda.ValueType.String },
		path: { type: coda.ValueType.String }
	}
});

export const AchievementsSchema = coda.makeObjectSchema({
	properties: {
		total: { type: coda.ValueType.Number },
		highlighted: { type: coda.ValueType.Array, items: AchievementsDetailsSchema },
	}
});