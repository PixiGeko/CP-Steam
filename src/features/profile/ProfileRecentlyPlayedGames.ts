import * as coda from '@codahq/packs-sdk';
import { profileIdParameter } from '../../parameters/Profile';
import { PackItem } from '../PackItem';
import { getToken } from '../../utils/token';
import {
	ProfileRecentlyPlayedGameSchema
} from '../../schemas/profile/recently-played-games/ProfileRecentlyPlayedGameSchema';
import {cleanId} from '../../utils/steam-id';

export class RecentlyPlayedGamesFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get the recently played Steam games of the specified profile.',
			connectionRequirement: coda.ConnectionRequirement.Required,
			resultType: coda.ValueType.Array,
			items: ProfileRecentlyPlayedGameSchema,
			parameters: [
				profileIdParameter()
			],
			execute: async([profileId], context) => {
				profileId = cleanId(profileId);

				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001', {
								key: getToken('key', context),
								steamid: profileId
							}),
						cacheTtlSecs: 60 * 5 // cache for 5 minutes
					});

					let response = data?.body?.response;

					if (!response) {
						throw new coda.UserVisibleError('An error occured');
					}

					if (!response.games) {
						throw new coda.UserVisibleError('Can not fetch user\'s games. Check the profile id, and be sure that the profile is public.');
					}

					let ownedGames = [];

					for (let game of response.games) {

						ownedGames.push({
							appid: game.appid,
							name: game.name,
							playtime_2weeks: game.playtime_2weeks + ' minutes',
							playtime: game.playtime_forever + ' minutes',
							playtime_windows: game.playtime_windows_forever + ' minutes',
							playtime_macr: game.playtime_mac_forever + ' minutes',
							playtime_linux: game.playtime_linux_forever + ' minutes',
							last_played: game.rtime_last_played
						});
					}

					return ownedGames;
				} catch (error) {
					this.handleError(error);
				}

			}
		});
	}

	name(): string {
		return 'RecentlyPlayedGames';
	}
}