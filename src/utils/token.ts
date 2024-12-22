import * as coda from '@codahq/packs-sdk';

export function getToken(key: string, context: coda.ExecutionContext) {
	return `{{${key}-${context.invocationToken}}}`;
}