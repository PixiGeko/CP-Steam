import * as coda from '@codahq/packs-sdk';
import { profileIdParameter } from '../../parameters/Profile';
import { PackItem } from '../PackItem';
import { REGEX_PROFILE_ID } from '../../utils/regex';
import { getToken } from '../../utils/token';
import {ProfileFriendsSchema} from '../../schemas/profile/friends/ProfileFriendsSchema';
import {cleanId} from '../../utils/steam-id';

export class ProfileFriendsFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get friends list from the specified profile. (Friends list must be public)',
			connectionRequirement: coda.ConnectionRequirement.Required,
			resultType: coda.ValueType.Array,
			items: ProfileFriendsSchema,
			parameters: [
				profileIdParameter()
			],
			execute: async([profileId], context) => {
				profileId = cleanId(profileId);

				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/ISteamUser/GetFriendList/v0001', {
								key: getToken('key', context),
								steamid: profileId
							}),
						cacheTtlSecs: 60 * 10 // cache for 10 minutes
					});

					let friends = data.body?.friendslist?.friends;

					if (!friends?.length) {
						throw new coda.UserVisibleError(`Can not find profile with id ${profileId}`);
					}

					return friends;
				} catch (error) {
					this.handleError(error);
				}
			}
		});

		pack.addColumnFormat({
			name: this.name(),
			matchers: [ 
				REGEX_PROFILE_ID
			],
			formulaName: this.name()
		});
	}

	name(): string {
		return 'ProfileFriends';
	}
}