import * as coda from '@codahq/packs-sdk';
import { languageParameter, DEFAULT_LANGUAGE } from '../../parameters/Language';
import { searchGameParameter } from '../../parameters/SteamGame';
import { PackItem } from '../PackItem';
import {GameNewsSchema} from '../../schemas/game/news/GameNewsSchema';

export class NewsFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get the latest game news.',
			connectionRequirement: coda.ConnectionRequirement.None,
			resultType: coda.ValueType.Array,
			items: GameNewsSchema,
			parameters: [
				searchGameParameter(),
				coda.makeParameter({
					type: coda.ParameterType.Number,
					name: 'count',
					description: 'How many news you want.',
					optional: true,
					suggestedValue: 10
				}),
				languageParameter()
			],
			execute: async([gameId, count = 10, language = DEFAULT_LANGUAGE], context) => {
				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002', {
								appid: gameId,
								count,
								maxlength: 99999
							}),
						cacheTtlSecs: 60 * 5 // cache for 5 minutes
					});

					let appnews = data.body.appnews;

					if (!appnews) {
						throw new coda.UserVisibleError(`Can not find game with id ${gameId}`);
					}

					return appnews.newsitems;
				} catch (error) {
					this.handleError(error);
				}
			}
		});
	}

	name(): string {
		return 'News';
	}
}