import * as coda from '@codahq/packs-sdk';
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
				profileIdParameter()
			],
			execute: async([profileId], context) => {
				profileId = cleanId(profileId);

				try {
					let response = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/IWishlistService/GetWishlist/v0001/', {
								steamid: profileId
							}),
						cacheTtlSecs: 60 * 5 // cache for 5 minutes
					});

					const games = response.body?.response?.items;

					if (!games) {
						throw new coda.UserVisibleError('An error occurred. Check that the profile ID is valid.');
					}

					return games.sort((a, b) => a.priority < b.priority);
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