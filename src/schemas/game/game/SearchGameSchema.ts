import * as coda from '@codahq/packs-sdk';

export const SearchGameSchema = coda.makeObjectSchema({
	idProperty: 'appId',
	displayProperty: 'name',
	featuredProperties: ['name', 'appId'],
	properties: {
		appId: { type: coda.ValueType.Number },
		name: { type: coda.ValueType.String },
		url: { type: coda.ValueType.String, codaType: coda.ValueHintType.Url }
	}
});