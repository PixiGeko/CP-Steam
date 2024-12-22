import * as coda from '@codahq/packs-sdk';
import { AchievementsSchema } from './AchievementsSchema';
import { CategoriesSchema } from './CategoriesSchema';
import { GenresSchema } from './GenresSchema';
import { PlatformsSchema } from './PlatformsSchema';
import { PriceSchema } from './PriceSchema';
import { ReleaseDateSchema } from './ReleaseDateSchema';
import { RequirementsSchema } from './RequirementsSchema';
import { SupportInfoSchema } from './SupportInfoSchema';

export const GameDetailsSchema = coda.makeObjectSchema({
	idProperty: 'steam_appid',
	displayProperty: 'name',
	properties: {
		type: { type: coda.ValueType.String },
		name: { type: coda.ValueType.String },
		steam_appid: { type: coda.ValueType.Number },
		required_age: { type: coda.ValueType.Number },
		is_free: { type: coda.ValueType.Boolean },
		detailed_description: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		about_the_game: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		short_description: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		supported_languages: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		header_image: { type: coda.ValueType.String },
		website: { type: coda.ValueType.String },
		pc_requirements: RequirementsSchema,
		mac_requirements: RequirementsSchema,
		linux_requirements: RequirementsSchema,
		legal_notice: { type: coda.ValueType.String, codaType: coda.ValueHintType.Html },
		developers: { type: coda.ValueType.Array, items: { type: coda.ValueType.String } },
		publishers: { type: coda.ValueType.Array, items: { type: coda.ValueType.String } },
		price_overview: PriceSchema,
		platforms: PlatformsSchema,
		categories: { type: coda.ValueType.Array, items: CategoriesSchema },
		genres: { type: coda.ValueType.Array, items: GenresSchema },
		achievements: AchievementsSchema,
		release_date: ReleaseDateSchema,
		support_info: SupportInfoSchema,
		background: { type: coda.ValueType.String },
		background_raw: { type: coda.ValueType.String },
	}
});

export const SimplifiedGameDetailsSchema = coda.makeObjectSchema({
	idProperty: 'appid',
	displayProperty: 'name',
	featuredProperties: ['name', 'profiles'],
	properties: {
		appid: { type: coda.ValueType.Number },
		name: { type: coda.ValueType.String },
		profiles: {
			type: coda.ValueType.Array,
			items: coda.makeObjectSchema({
				properties: {
					steam_id: { type: coda.ValueType.String },
					playtime: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
					playtime_windows: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
					playtime_mac: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
					playtime_linux: { type: coda.ValueType.String, codaType: coda.ValueHintType.Duration },
					last_played: { type: coda.ValueType.Number, codaType: coda.ValueHintType.DateTime }
				}
			})
		}
	}
});