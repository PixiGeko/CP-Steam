import * as coda from '@codahq/packs-sdk';

export const GameNewsSchema = coda.makeObjectSchema({
	idProperty: 'url',
	displayProperty: 'title',
	properties: {
		title: { type: coda.ValueType.String },
		url: { type: coda.ValueType.String, codaType: coda.ValueHintType.Url },
		is_external_url: { type: coda.ValueType.Boolean },
		author: { type: coda.ValueType.String },
		contents: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		feedlabel: { type: coda.ValueType.String },
		date: { type: coda.ValueType.String, codaType: coda.ValueHintType.DateTime }
	}
});