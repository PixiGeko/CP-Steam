import * as coda from '@codahq/packs-sdk';

export const ProfileDetailsSchema = coda.makeObjectSchema({
	idProperty: 'steam_id',
	displayProperty: 'name',
	properties: {
		steam_id: { type: coda.ValueType.String },
		name: { type: coda.ValueType.String },
		real_name: { type: coda.ValueType.String },
		account_name: { type: coda.ValueType.String },
		profile_url: { type: coda.ValueType.String, codaType: coda.ValueHintType.Url },
		avatar: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment },
		avatar_medium: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment },
		avatar_full: { type: coda.ValueType.String, codaType: coda.ValueHintType.ImageAttachment },
	}
});