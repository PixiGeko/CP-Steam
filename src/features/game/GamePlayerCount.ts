import * as coda from '@codahq/packs-sdk';
import { searchGameParameter } from '../../parameters/SteamGame';
import { PackItem } from '../PackItem';

export class PlayerCountFormula extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addFormula({
			name: this.name(),
			description: 'Get current players count of the specified game.',
			connectionRequirement: coda.ConnectionRequirement.None,
			resultType: coda.ValueType.Number,
			parameters: [
				searchGameParameter()
			],
			execute: async([gameId], context) => {
				try {
					let data = await context.fetcher.fetch({
						method: 'GET',
						url: coda.withQueryParams(
							'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1', {
								appid: gameId
							}
						),
						cacheTtlSecs: 30,
					});

					let response = data.body.response;

					if (!response.result || response.result !== 1) {
						throw new coda.UserVisibleError(`Can not find game with id ${gameId}`);
					}
					return response['player_count'];
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
		return 'PlayerCount';
	}
}