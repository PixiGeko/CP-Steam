import * as coda from '@codahq/packs-sdk';
import { PackItem } from './src/features/PackItem';
import { GameDetailsFormula } from './src/features/game/GameDetails';
import { PlayerCountFormula } from './src/features/game/GamePlayerCount';
import { OwnedGamesFormula } from './src/features/profile/ProfileOwnedGames';
import { WishListFormula } from './src/features/profile/ProfileWishList';
import { NewsFormula } from './src/features/game/GameNews';
import { RecentlyPlayedGamesFormula } from './src/features/profile/ProfileRecentlyPlayedGames';
import { ProfileDetailsFormula } from './src/features/profile/ProfileDetails';
import { GameAchievementsFormula } from './src/features/game/GameAchievements';
import { ProfileLevel } from './src/features/profile/ProfileLevel';
import { GameSearch } from './src/features/game/GameSearch';

// create pack
export const pack = coda.newPack();
pack.addNetworkDomain('steampowered.com');

pack.setUserAuthentication({
	type: coda.AuthenticationType.Custom,
	params: [
		{
			name: 'key',
			description: 'The Steam API key. You can get one by visiting https://steamcommunity.com/dev/apikey'
		}
	]
});

// game
register(new GameDetailsFormula());
register(new PlayerCountFormula());
register(new NewsFormula());
register(new GameSearch());

// profile
register(new ProfileDetailsFormula());
register(new OwnedGamesFormula());
register(new RecentlyPlayedGamesFormula());
register(new WishListFormula());
register(new GameAchievementsFormula());
register(new ProfileLevel());


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//              REGISTER                //
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
function register(register: PackItem) {
	register.register(pack);
}