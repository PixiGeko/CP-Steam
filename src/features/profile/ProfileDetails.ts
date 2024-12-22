import * as coda from '@codahq/packs-sdk';
import { profileIdParameter } from '../../parameters/Profile';
import { PackItem } from '../PackItem';
import { REGEX_PROFILE_ID } from '../../utils/regex';
import { getToken } from '../../utils/token';
import {ProfileDetailsSchema} from '../../schemas/profile/details/ProfileDetailsSchema';
import {cleanId} from '../../utils/steam-id';

export class ProfileDetailsFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get details about the specified profile.',
			connectionRequirement: coda.ConnectionRequirement.Required,
			resultType: coda.ValueType.Object,
			schema: ProfileDetailsSchema,
			parameters: [
				profileIdParameter()
			],
			execute: async([profileId], context) => {
				profileId = cleanId(profileId);

				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002', {
								key: getToken('key', context),
								steamids: profileId
							}),
						cacheTtlSecs: 60 * 10 // cache for 10 minutes
					});

					let profile = data.body?.response?.players?.[0];

					if (!profile) {
						throw new coda.UserVisibleError(`Can not find profile with id ${profileId}`);
					}

					return {
						steam_id: profile.steamid,
						name: profile.personaname,
						real_name: profile.realname,
						account_name: profile.accountname,
						profile_url: profile.profileurl,
						avatar: profile.avatar,
						avatar_medium: profile.avatarmedium,
						avatar_full: profile.avatarfull,
					};
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
		return 'ProfileDetails';
	}
}