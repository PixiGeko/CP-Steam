import * as coda from '@codahq/packs-sdk';

export const AchievementSchema = coda.makeObjectSchema({
	displayProperty: 'displayName',
	idProperty: 'name',
	properties: {
		name: { type: coda.ValueType.String },
		defaultvalue: { type: coda.ValueType.Number },
		displayName: { type: coda.ValueType.String },
		hidden: { type: coda.ValueType.Boolean },
		description: { type: coda.ValueType.String },
		icon: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment },
		icongray: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment }
	}
});