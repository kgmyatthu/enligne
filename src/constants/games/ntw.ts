/**
 * @file constants/games/ntw.ts
 * @description Napoleon: Total War game configuration. Assembled from the
 * original NTW unit/purpose constants so existing behaviour is preserved exactly.
 */
import type { GameConfig } from './types';
import {
  UNIT_COLORS, UNIT_CATEGORY_MAP, ALL_ENTITY_TYPES,
  UNIT_CLASS_STR_TO_INT, UNIT_CLASS_INT_TO_STR,
} from '../units';
import { ALL_PURPOSES, PURPOSE_TO_BITS } from '../formations';

export const NTW: GameConfig = {
  id: "ntw",
  label: "Napoleon: Total War",
  shortLabel: "NTW",
  unitClassStrToInt: UNIT_CLASS_STR_TO_INT,
  unitClassIntToStr: UNIT_CLASS_INT_TO_STR,
  unitColors: UNIT_COLORS,
  unitCategoryMap: UNIT_CATEGORY_MAP,
  landEntityTypes: ALL_ENTITY_TYPES,
  navalEntityTypes: UNIT_CATEGORY_MAP.naval,
  defaultEntity: "infantry_line",
  commandEntity: "general",
  legendEntities: ["infantry_line", "cavalry_heavy", "artillery_foot", "infantry_light", "general", "any"],
  allPurposes: ALL_PURPOSES,
  purposeToBits: PURPOSE_TO_BITS,
  metadataKind: "ntw-mins",
  categoryStrToInt: {},
  categoryIntToStr: {},
  allCategories: [],
  supportsRuby: true,
};
