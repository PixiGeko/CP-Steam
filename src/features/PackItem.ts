import { FormulaDefinition, PackDefinitionBuilder, ParamDefs, Schema, ValueType } from '@codahq/packs-sdk';
import * as coda from '@codahq/packs-sdk';

export abstract class PackItem {
    abstract register(pack: PackDefinitionBuilder) : void;

    abstract name() : string;

    protected handleError(error: any) {
    	if(error instanceof coda.UserVisibleError) {
    		throw error;
    	}

    	if (coda.StatusCodeError.isStatusCodeError(error)) {
    		let statusError = error as coda.StatusCodeError;
    		let message = statusError.body?.detail ?? statusError.body?.message;
    		if (message) {
    			throw new coda.UserVisibleError(message);
    		}
    	}

    	throw error;
    }
}