import * as coda from '@codahq/packs-sdk';
import { parse } from 'node-html-parser';

export function searchGameParameter(
	name: string = 'gameId',
	description: string = 'The game id. Autocomplete may not work due to a bug in Coda.',
	optional: boolean = false
) {
	return coda.makeParameter({
		type: coda.ParameterType.Number,
		name: name,
		description: description,
		optional: optional,
		autocomplete: async function (context, search, parameters) {
			let games = await searchGame(context, search);
			return coda.autocompleteSearchObjects(search, games, 'name', 'appId');
		}
	});
}

export interface GameSearchResult {
    name: string;
    appId: Number;
    url: string;
}

export async function searchGame(context: coda.ExecutionContext, search: string) : Promise<GameSearchResult[]>{
	if (!search) {
		return [];
	}

	let response = await context.fetcher.fetch({
		method: 'GET',
		url: coda.withQueryParams(
			'https://store.steampowered.com/search/suggest',
			{
				term: search,
				f: 'games',
				cc: 'BE'
			}
		),
		headers: {
			'Content-Type': 'text/html',
		},
		cacheTtlSecs: 60 * 3 // cache for 3 minutes
	});

	const root = parse(String(response.body));
	let matches = root.querySelectorAll('.match');

	let games: GameSearchResult[] = [];

	matches.forEach(match => {
		games.push({
			name: match.querySelectorAll('.match_name')[0].innerText,
			appId: Number(match.getAttribute('data-ds-appid')),
			url: match.getAttribute('href')
		});
	});

	return games;
}