import * as coda from '@codahq/packs-sdk';
import { profileIdParameter } from '../../parameters/Profile';
import { PackItem } from '../PackItem';
import { getToken } from '../../utils/token';
import {cleanId} from '../../utils/steam-id';

export class ProfileLevel extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get Steam level for the specified profile.',
			connectionRequirement: coda.ConnectionRequirement.Required,
			resultType: coda.ValueType.Number,
			parameters: [
				profileIdParameter()
			],
			execute: async([profileId], context) => {
				profileId = cleanId(profileId);

				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/IPlayerService/GetSteamLevel/v1', {
								key: getToken('key', context),
								steamid: profileId
							}),
						cacheTtlSecs: 60 * 30 // cache for 30 minutes
					});

					let level = data.body?.response?.player_level;

					if (level === undefined) {
						throw new coda.UserVisibleError(`Can not find profile with id ${profileId}`);
					}

					return level;
				} catch (error) {
					this.handleError(error);
				}
			}
		});

		pack.addColumnFormat({
			name: this.name(),
			formulaName: this.name()
		});
	}

	name(): string {
		return 'ProfileLevel';
	}
}