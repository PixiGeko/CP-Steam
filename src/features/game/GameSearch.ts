import * as coda from '@codahq/packs-sdk';
import { PackItem } from '../PackItem';
import { searchGame } from '../../parameters/SteamGame';
import {SearchGameSchema} from '../../schemas/game/game/SearchGameSchema';

export class GameSearch extends PackItem {
	register(pack: coda.PackDefinitionBuilder) {
		pack.addSyncTable({
			name: this.name(),
			identityName: 'Game',
			schema: SearchGameSchema,
			connectionRequirement: coda.ConnectionRequirement.None,
			formula: {
				name: 'SearchGames',
				description: 'Search games',
				parameters: [
					coda.makeParameter({
						name: 'search',
						description: 'The game name to search',
						type: coda.ParameterType.String
					})
				],
				execute: async([search], context) => {
					try {
						let games = await searchGame(context, search) as [];

						return {
							result: games
						};
					} catch (error) {
						this.handleError(error);
					}
				}
			}
		});
	}

	name(): string {
		return 'SearchGames';
	}
}