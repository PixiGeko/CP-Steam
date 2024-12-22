import * as coda from '@codahq/packs-sdk';
import { ignoreFailedProfile } from '../../parameters/IgnoreProfileNotFound';
import { includeFreeGames } from '../../parameters/IncludeFreeGames';
import { profileIdParameter, profileIdsParameter } from '../../parameters/Profile';
import { PackItem } from '../PackItem';
import { getToken } from '../../utils/token';
import {ProfileOwnedGameSchema} from '../../schemas/profile/owned-games/ProfileOwnedGameSchema';
import { SimplifiedGameDetailsSchema } from '../../schemas/game/details/GameDetailsSchema';
import {cleanId} from '../../utils/steam-id';

export class OwnedGamesFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get owned Steam games for the specified profile.',
			connectionRequirement: coda.ConnectionRequirement.Required,
			resultType: coda.ValueType.Array,
			items: ProfileOwnedGameSchema,
			parameters: [
				profileIdParameter(),
				includeFreeGames(),
				ignoreFailedProfile()
			],
			execute: async([profileId, includeFreeGames = false, ignoreFailedProfile = false], context) => {
				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1', {
								key: getToken('key', context),
								steamid: cleanId(profileId),
								include_appinfo: true,
								include_played_free_games: includeFreeGames
							}),
						cacheTtlSecs: 60 * 5 // cache for 5 minutes
					});

					let response = data?.body?.response;

					if (!response) {
						if (ignoreFailedProfile) {
							return [];
						}
						throw new coda.UserVisibleError('An error occured');
					}

					if (!response.games) {
						if (ignoreFailedProfile) {
							return [];
						}
						throw new coda.UserVisibleError('Can not fetch user\'s games. Check the profile id, and be sure that the profile is public.');
					}

					let ownedGames = [];

					for (let game of response.games) {
						ownedGames.push({
							appid: game.appid,
							name: game.name,
							playtime: game.playtime_forever + ' minutes',
							playtime_windows: game.playtime_windows_forever + ' minutes',
							playtime_mac: game.playtime_mac_forever + ' minutes',
							playtime_linux: game.playtime_linux_forever + ' minutes',
							last_played: game.rtime_last_played
						});
					}

					return ownedGames;
				} catch (error) {
					if (ignoreFailedProfile) {
						return [];
					}

					this.handleError(error);
				}

			}
		});

		pack.addSyncTable({
			name: this.name(),
			identityName: 'OwnedGame',
			schema: SimplifiedGameDetailsSchema,
			connectionRequirement: coda.ConnectionRequirement.Required,
			formula: {
				name: 'FetchOwnedGames',
				description: 'Gets all owned games',
				parameters: [
					profileIdsParameter()
				],
				execute: async function ([profileIds], context) {
					try {
						if (!profileIds || profileIds.length === 0) {
							throw new coda.UserVisibleError('The profile ids can not be empty.');
						}

						let games = [];

						for (let i = 0; i < profileIds.length; i++) {
							let profileId = cleanId(profileIds[i]);
							try {
								let data = await context.fetcher.fetch({
									method: 'GET',
									url: coda.withQueryParams(
										'https://api.steampowered.com/IPlayerService/GetOwnedGames/v1', {
											key: getToken('key', context),
											steamid: cleanId(profileId),
											include_appinfo: true,
											include_played_free_games: includeFreeGames
										}),
									cacheTtlSecs: 60 * 5 // cache for 5 minutes
								});

								let response = data?.body?.response;

								if (!response) {
									throw new coda.UserVisibleError('An error occured');
								}

								if (response.games) {
									for (let game of response.games) {
										let gameFound = games.find(g => g.appid === game.appid);

										if (gameFound) {
											if (!gameFound.profiles.some(p => p.steam_id === profileId)) gameFound.profiles.push({
												steam_id: profileId,
												playtime: game.playtime_forever + ' minutes',
												playtime_windows: game.playtime_windows_forever + ' minutes',
												playtime_mac: game.playtime_mac_forever + ' minutes',
												playtime_linux: game.playtime_linux_forever + ' minutes',
												last_played: game.rtime_last_played
											});
										} else {
											games.push({
												appid: game.appid,
												name: game.name,
												profiles: [
													{
														steam_id: profileId,
														playtime: game.playtime_forever + ' minutes',
														playtime_windows: game.playtime_windows_forever + ' minutes',
														playtime_mac: game.playtime_mac_forever + ' minutes',
														playtime_linux: game.playtime_linux_forever + ' minutes',
														last_played: game.rtime_last_played
													}
												]
											});
										}
									}
								}
							} catch (e) {
								console.error('Can not fetch game for profile ' + profileId);
							}
						}

						return {
							result: games
						};
					} catch (error) {
						if (error.statusCode) {
							let statusError = error as coda.StatusCodeError;
							let message = statusError.body?.message;
							if (message) {
								throw new coda.UserVisibleError(message);
							}
						}
						throw error;
					}
				}
			}
		});

		pack.addColumnFormat({
			name: this.name(),
			formulaName: this.name()
		});
	}

	name(): string {
		return 'OwnedGames';
	}
}