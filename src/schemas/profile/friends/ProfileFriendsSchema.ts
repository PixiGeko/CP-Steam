import * as coda from '@codahq/packs-sdk';

export const ProfileFriendsSchema = coda.makeObjectSchema({
	idProperty: 'steamid',
	displayProperty: 'steamid',
	properties: {
		steamid: { type: coda.ValueType.String },
		relationship: { type: coda.ValueType.String },
		friend_since: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime },
	}
});