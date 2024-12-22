import * as coda from '@codahq/packs-sdk';
import { GameDetailsFormula } from '../../content/formulas/GameDetails';
import { GameDetailsSchema } from '../gameDetails/GameDetailsSchema';

export const ProfileWishListSchema = coda.makeObjectSchema({
	idProperty: 'appid',
	displayProperty: 'name',
	properties: {
		appid: { type: coda.ValueType.Number },
		name: { type: coda.ValueType.String },
		added: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime },
		is_free: { type: coda.ValueType.Boolean },
		review_score: { type: coda.ValueType.Number },
		review_desc: { type: coda.ValueType.String },
		reviews_total: { type: coda.ValueType.String },
		reviews_percent: { type: coda.ValueType.Number },
		tags: { type: coda.ValueType.Array, items: { type: coda.ValueType.String } }
	}
});