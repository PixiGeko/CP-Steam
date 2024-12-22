import * as coda from '@codahq/packs-sdk';

export const ProfileOwnedGameSchema = coda.makeObjectSchema({
	idProperty: 'appid',
	displayProperty: 'name',
	properties: {
		appid: { type: coda.ValueType.Number },
		name: { type: coda.ValueType.String },
		playtime: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime_windows: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime_mac: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime_linux: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		last_played: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime }
	}
});