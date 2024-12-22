import * as coda from '@codahq/packs-sdk';
import { languageParameter, DEFAULT_LANGUAGE } from '../../parameters/Language';
import { profileIdParameter } from '../../parameters/Profile';
import { searchGameParameter } from '../../parameters/SteamGame';
import { PackItem } from '../PackItem';
import { getToken } from '../../utils/token';
import {ProfileGameAchievementSchema} from '../../schemas/profile/game-achievements/ProfileGameAchievement';
import {cleanId} from '../../utils/steam-id';

export class GameAchievementsFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get the profile\'s achievements for the specified game.',
			connectionRequirement: coda.ConnectionRequirement.Required,
			resultType: coda.ValueType.Array,
			items: ProfileGameAchievementSchema,
			parameters: [
				profileIdParameter(),
				searchGameParameter(),
				languageParameter()
			],
			execute: async([profileId, gameId, language = DEFAULT_LANGUAGE], context) => {
				try {
					profileId = cleanId(profileId);

					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001', {
								key: getToken('key', context),
								steamid: profileId,
								appid: gameId
							}),
						cacheTtlSecs: 60 * 5 // cache for 5 minutes
					});

					let playerStats = data?.body?.playerstats;

					if (!playerStats || !playerStats.achievements) {
						throw new coda.UserVisibleError('Can not get player achievements. Check the profile id.');
					}

					// game achievements details
					let gameSchema = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v0002', {
								key: getToken('key', context),
								steamid: profileId,
								appid: gameId,
								l: language
							}),
						cacheTtlSecs: 60 * 15 // cache for 15 minutes
					});

					let gameSchemaAchievements = gameSchema.body?.game?.availableGameStats?.achievements;

					if (!gameSchemaAchievements) {
						throw new coda.UserVisibleError('Can not get game achievements. Check the game id.');
					}

					//
					let achievements = playerStats.achievements;

					let playerAchievements = [];

					for (let achievement of achievements) {
						let achievementDetails = gameSchemaAchievements.filter(gsa => gsa.name === achievement.apiname)[0];

						playerAchievements.push({
							id: achievement.apiname,
							achieved: achievement.achieved,
							unlock_date_time: achievement.unlocktime,
							icon: achievementDetails?.icon,
							icon_gray: achievementDetails?.icongray,
							name: achievementDetails?.displayName,
							description: achievementDetails?.description,
							hidden: achievementDetails?.hidden,
						});
					}

					return playerAchievements;
				} catch (error) {
					this.handleError(error);
				}
			}
		});
	}

	name(): string {
		return 'GameAchievements';
	}
}