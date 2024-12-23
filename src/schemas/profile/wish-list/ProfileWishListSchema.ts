import * as coda from '@codahq/packs-sdk';
import { GameDetailsFormula } from '../../content/formulas/GameDetails';
import { GameDetailsSchema } from '../gameDetails/GameDetailsSchema';

export const ProfileWishListSchema = coda.makeObjectSchema({
	idProperty: 'appid',
	displayProperty: 'appid',
	properties: {
		appid: { type: coda.ValueType.Number },
		priority: { type: coda.ValueType.Number },
		date_added: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime }
	}
});