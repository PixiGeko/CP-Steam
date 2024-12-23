import * as coda from '@codahq/packs-sdk';

export const ProfileFriendsSchema = coda.makeObjectSchema({
	idProperty: 'steam_id',
	displayProperty: 'steam_id',
	properties: {
		steam_id: { type: coda.ValueType.String },
		relationship: { type: coda.ValueType.String },
		friend_since: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime },
	}
});