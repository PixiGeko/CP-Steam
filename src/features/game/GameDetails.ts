import * as coda from '@codahq/packs-sdk';
import { currencyParameter, DEFAULT_CURRENCY } from '../../parameters/Currency';
import { languageParameter, DEFAULT_LANGUAGE } from '../../parameters/Language';
import { searchGameParameter } from '../../parameters/SteamGame';
import { PackItem } from '../PackItem';
import { REGEX_GAME_ID } from '../../utils/regex';
import {GameDetailsSchema} from '../../schemas/game/details/GameDetailsSchema';

export class GameDetailsFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get details about the specified game.',
			connectionRequirement: coda.ConnectionRequirement.None,
			resultType: coda.ValueType.Object,
			schema: GameDetailsSchema,
			parameters: [
				searchGameParameter(),
				languageParameter(),
				currencyParameter()
			],
			execute: async([gameId, language = DEFAULT_LANGUAGE, currency = DEFAULT_CURRENCY], context) => {
				try {
					let game = await getGameDetails(context, gameId, language, currency);

					if (!game || (game['success'] !== undefined && !game['success'])) {
						throw new coda.UserVisibleError(`Can not find game with id '${gameId}'`);
					}

					return game;
				} catch (error) {
					this.handleError(error);
				}
			}
		});

		pack.addColumnFormat({
			name: this.name(),
			matchers: [ 
				REGEX_GAME_ID
			],
			formulaName: this.name()
		});
	}

	name(): string {
		return 'GameDetails';
	}
}

export async function getGameDetails(context: coda.ExecutionContext, id: any, language: string, currency: string) {
	let response = await context.fetcher.fetch({
		method: 'GET',
		url: coda.withQueryParams(
			'https://store.steampowered.com/api/appdetails', {
				appids: id,
				l: language,
				cc: currency
			}),
		cacheTtlSecs: 60 * 10, // cache for 10 minutes
	});

	return response?.body[id]?.data;
}