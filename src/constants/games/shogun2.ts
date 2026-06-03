/**
 * @file constants/games/shogun2.ts
 * @description Total War: Shogun 2 (incl. Fall of the Samurai) game configuration.
 *
 * The unit-class integers, AI-purpose bits and category enum below were
 * reverse-engineered from a vanilla `groupformations.bin` and validated with a
 * byte-exact round-trip. Names match RPFM's `groupformations` decoder.
 */
import type { GameConfig } from './types';
import type { UnitCategoryKey } from '../../types';

/** Unit-class (entity) string → enum integer written into the .bin. */
export const S2_UNIT_CLASS_STR_TO_INT: Record<string, number> = {
  // ETW/NTW-era land classes (shared 0..22)
  ArtilleryFixed: 0, ArtilleryFoot: 1, ArtilleryHorse: 2,
  CavalryCamels: 3, CavalryHeavy: 4, CavalryIrregular: 5,
  CavalryLancers: 6, CavalryLight: 7, CavalryMissile: 8,
  CavalryStandard: 9, Dragoons: 10, Elephants: 11, General: 12,
  InfantryBerserker: 13, InfantryElite: 14, InfantryGrenadiers: 15,
  InfantryIrregulars: 16, InfantryLight: 17, InfantryLine: 18,
  InfantryMelee: 19, InfantryMilitia: 20, InfantryMob: 21,
  InfantrySkirmishers: 22,
  // ETW/NTW-era naval rates (23..43)
  NavalAdmiral: 23, NavalBombKetch: 24, NavalBrig: 25, NavalDhow: 26,
  NavalFifthRate: 27, NavalFirstRate: 28, NavalFourthRate: 29,
  NavalHeavyGalley: 30, NavalIndiaman: 31, NavalLightGalley: 32,
  NavalLugger: 33, NavalMediumGalley: 34, NavalOverFirstRate: 35,
  NavalRazee: 36, NavalRocketShip: 37, NavalSecondRate: 38,
  NavalSixthRate: 39, NavalSloop: 40, NavalSteamShip: 41,
  NavalThirdRate: 42, NavalXebec: 43,
  // Shogun 2 land classes (45..52)
  InfantrySpearman: 45, InfantryHeavy: 46, InfantrySpecial: 47,
  InfantryBow: 48, InfantryMatchlock: 49, InfantrySword: 50,
  Siege: 51, CavalrySword: 52,
  // Shogun 2 / Fall of the Samurai naval ship-categories (54..64)
  NavalHeavyShip: 54, NavalMediumShip: 55, NavalLightShip: 56,
  NavalCannonShip: 57, NavalGalleon: 58,
  NavalIronclad: 60, NavalCorvette: 61, NavalFrigate: 62,
  NavalGunboat: 63, NavalTorpedoboat: 64,
  Any: 65,
};

export const S2_UNIT_CLASS_INT_TO_STR: Record<number, string> = Object.fromEntries(
  Object.entries(S2_UNIT_CLASS_STR_TO_INT).map(([k, v]) => [v, k])
);

const INFANTRY = [
  "InfantrySword", "InfantrySpearman", "InfantryHeavy", "InfantryMatchlock",
  "InfantryBow", "InfantrySpecial", "InfantryElite", "InfantryLine",
  "InfantryMilitia", "InfantryLight", "InfantryMelee", "InfantryBerserker",
  "InfantryMob", "InfantryIrregulars", "InfantryGrenadiers", "InfantrySkirmishers",
];
const CAVALRY = [
  "CavalryLancers", "CavalrySword", "CavalryMissile", "CavalryHeavy",
  "CavalryStandard", "CavalryCamels", "CavalryLight", "CavalryIrregular",
  "Dragoons", "Elephants",
];
const ARTILLERY = ["ArtilleryFixed", "ArtilleryFoot", "ArtilleryHorse", "Siege"];
const COMMAND = ["General"];
const NAVAL = [
  // Shogun 2 abstract ship categories
  "NavalHeavyShip", "NavalMediumShip", "NavalLightShip", "NavalCannonShip",
  // Fall of the Samurai steam/ironclad types
  "NavalIronclad", "NavalFrigate", "NavalCorvette", "NavalGunboat", "NavalTorpedoboat",
  // ETW/NTW-era rates & galleys (used by some inherited formations)
  "NavalOverFirstRate", "NavalFirstRate", "NavalSecondRate", "NavalThirdRate",
  "NavalFourthRate", "NavalFifthRate", "NavalSixthRate", "NavalRazee",
  "NavalGalleon", "NavalBrig", "NavalSloop", "NavalBombKetch", "NavalRocketShip",
  "NavalIndiaman", "NavalLugger", "NavalDhow", "NavalSteamShip", "NavalAdmiral",
  "NavalHeavyGalley", "NavalMediumGalley", "NavalLightGalley", "NavalXebec",
];
const OTHER = ["Any"];

const S2_UNIT_CATEGORY_MAP: Record<UnitCategoryKey, string[]> = {
  infantry: INFANTRY, cavalry: CAVALRY, artillery: ARTILLERY,
  command: COMMAND, naval: NAVAL, other: OTHER,
};

/** Color per unit class, grouped by category palette. */
const S2_UNIT_COLORS: Record<string, string> = {
  // Infantry — blues / teals
  InfantrySword: "#2563eb", InfantrySpearman: "#3b82f6", InfantryHeavy: "#1e40af",
  InfantryMatchlock: "#60a5fa", InfantryBow: "#7dd3fc", InfantrySpecial: "#818cf8",
  InfantryElite: "#1d4ed8", InfantryLine: "#60a5fa", InfantryMilitia: "#93c5fd",
  InfantryLight: "#14b8a6", InfantryMelee: "#38bdf8", InfantryBerserker: "#4338ca",
  InfantryMob: "#bfdbfe", InfantryIrregulars: "#84cc16", InfantryGrenadiers: "#2dd4bf",
  InfantrySkirmishers: "#22c55e",
  // Cavalry — reds / oranges
  CavalryLancers: "#f87171", CavalrySword: "#ef4444", CavalryMissile: "#eab308",
  CavalryHeavy: "#dc2626", CavalryStandard: "#b91c1c", CavalryCamels: "#f97316",
  CavalryLight: "#fb923c", CavalryIrregular: "#fdba74", Dragoons: "#d97706",
  Elephants: "#92400e",
  // Artillery — ambers
  ArtilleryFixed: "#fbbf24", ArtilleryFoot: "#fcd34d", ArtilleryHorse: "#fde68a",
  Siege: "#f59e0b",
  // Command / other
  General: "#a855f7", Any: "#6b7280",
  // Naval — cyans / skies
  NavalHeavyShip: "#0369a1", NavalMediumShip: "#0284c7", NavalLightShip: "#0ea5e9",
  NavalCannonShip: "#075985", NavalIronclad: "#0e7490", NavalFrigate: "#0891b2",
  NavalCorvette: "#06b6d4", NavalGunboat: "#22d3ee", NavalTorpedoboat: "#67e8f9",
  NavalOverFirstRate: "#0c4a6e", NavalFirstRate: "#075985", NavalSecondRate: "#0369a1",
  NavalThirdRate: "#0284c7", NavalFourthRate: "#0ea5e9", NavalFifthRate: "#38bdf8",
  NavalSixthRate: "#7dd3fc", NavalRazee: "#06b6d4", NavalGalleon: "#0e7490",
  NavalBrig: "#22d3ee", NavalSloop: "#67e8f9", NavalBombKetch: "#a5f3fc",
  NavalRocketShip: "#cffafe", NavalIndiaman: "#5eead4", NavalLugger: "#99f6e4",
  NavalDhow: "#ccfbf1", NavalSteamShip: "#2dd4bf", NavalAdmiral: "#7c3aed",
  NavalHeavyGalley: "#0891b2", NavalMediumGalley: "#06b6d4", NavalLightGalley: "#22d3ee",
  NavalXebec: "#14b8a6",
};

/** Minimum-unit-category enum (distinct from the entity enum above). */
const S2_CATEGORY_STR_TO_INT: Record<string, number> = {
  Cavalry: 0, InvantryMelee: 13, InfantryRanged: 14,
  NavalHeavy: 15, NavalMedium: 16, NavalLight: 17,
};
const S2_CATEGORY_INT_TO_STR: Record<number, string> = Object.fromEntries(
  Object.entries(S2_CATEGORY_STR_TO_INT).map(([k, v]) => [v, k])
);

export const SHOGUN2: GameConfig = {
  id: "shogun2",
  label: "Total War: Shogun 2",
  shortLabel: "Shogun 2",
  unitClassStrToInt: S2_UNIT_CLASS_STR_TO_INT,
  unitClassIntToStr: S2_UNIT_CLASS_INT_TO_STR,
  unitColors: S2_UNIT_COLORS,
  unitCategoryMap: S2_UNIT_CATEGORY_MAP,
  landEntityTypes: [...INFANTRY, ...CAVALRY, ...ARTILLERY, ...COMMAND, ...OTHER],
  navalEntityTypes: NAVAL,
  defaultEntity: "InfantrySword",
  commandEntity: "General",
  legendEntities: ["InfantrySword", "CavalryLancers", "ArtilleryFoot", "InfantryBow", "General", "Any"],
  allPurposes: [
    "ATTACK", "DEFEND", "RIVER_ATTACK", "NAVAL_ATTACK", "NAVAL_DEFEND",
    "DEFAULT_DEPLOYMENT", "NAVAL_DEFAULT_DEPLOYMENT", "LARGE_MAP_ONLY",
  ],
  purposeToBits: {
    ATTACK: 1, DEFEND: 2, RIVER_ATTACK: 4, NAVAL_ATTACK: 32, NAVAL_DEFEND: 64,
    DEFAULT_DEPLOYMENT: 128, NAVAL_DEFAULT_DEPLOYMENT: 256, LARGE_MAP_ONLY: 512,
  },
  metadataKind: "category-percentages",
  categoryStrToInt: S2_CATEGORY_STR_TO_INT,
  categoryIntToStr: S2_CATEGORY_INT_TO_STR,
  allCategories: Object.keys(S2_CATEGORY_STR_TO_INT),
  supportsRuby: false,
};
