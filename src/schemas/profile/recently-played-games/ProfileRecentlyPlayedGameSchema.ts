import * as coda from '@codahq/packs-sdk';
import { GameDetailsSchema } from '../gameDetails/GameDetailsSchema';

export const ProfileRecentlyPlayedGameSchema = coda.makeObjectSchema({
	idProperty: 'appid',
	displayProperty: 'name',
	properties: {
		appid: { type: coda.ValueType.Number },
		name: { type: coda.ValueType.String },
		playtime_2weeks: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime_windows: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime_mac: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
		playtime_linux: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration }
	}
});