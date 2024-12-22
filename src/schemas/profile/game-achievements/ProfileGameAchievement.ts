import * as coda from '@codahq/packs-sdk';

export const ProfileGameAchievementSchema = coda.makeObjectSchema({
	idProperty: 'id',
	displayProperty: 'name',
	properties: {
		id: { type: coda.ValueType.String },
		name: { type: coda.ValueType.String },
		description: { type: coda.ValueType.String },
		hidden: { type: coda.ValueType.Boolean },
		achieved: { type: coda.ValueType.Boolean },
		unlock_date_time: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime },
		icon: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment },
		icon_gray: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment },
	}
});