import * as coda from '@codahq/packs-sdk';
import { currencyParameter, DEFAULT_CURRENCY } from '../../parameters/Currency';
import { languageParameter, DEFAULT_LANGUAGE } from '../../parameters/Language';
import { profileIdParameter } from '../../parameters/Profile';
import { PackItem } from '../PackItem';
import {ProfileWishListSchema} from '../../schemas/profile/wish-list/ProfileWishListSchema';
import {cleanId} from '../../utils/steam-id';

export class WishListFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get wish list of the specified profile.',
			connectionRequirement: coda.ConnectionRequirement.None,
			resultType: coda.ValueType.Array,
			items: ProfileWishListSchema,
			parameters: [
				profileIdParameter(),
				languageParameter(),
				currencyParameter()
			],
			execute: async([profileId, language = DEFAULT_LANGUAGE, currency = DEFAULT_CURRENCY], context) => {
				// API not supported anymore
				throw new coda.UserVisibleError('Steam no longer provides access to this API. This formula will be removed soon.');

				profileId = cleanId(profileId);

				try {
					let response = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							`https://store.steampowered.com/wishlist/profiles/${profileId}/wishlistdata/?p=0&v=1`, {
								l: language,
								cc: currency
							}),
						cacheTtlSecs: 60 * 5 // cache for 5 minutes
					});

					if (!response.body) {
						throw new coda.UserVisibleError('An error occured');
					}

					let games = [];

					for(const gameId of Object.keys(response.body)) {
						let game = response.body[gameId];

						games.push({
							appid: gameId,
							name: game.name,
							added: game.added,
							is_free: game.is_free_game,
							review_score: game.review_score,
							review_desc: game.review_desc,
							reviews_total: game.reviews_total,
							reviews_percent: game.reviews_percent,
							tags: game.tags
						});
					}

					return games;
				} catch (error) {
					this.handleError(error);
				}

			}
		});
	}

	name(): string {
		return 'WishList';
	}
}