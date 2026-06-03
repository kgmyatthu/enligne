/**
 * @file constants/games/types.ts
 * @description Per-game configuration contract. Each supported Total War title
 * provides a GameConfig describing its unit-class enum, AI purposes, colors and
 * the shape of its formation metadata so the parsers, exporters and UI can be
 * driven generically.
 */
import type { UnitCategoryKey } from '../../types';

export type GameId = "ntw" | "shogun2";

/**
 * How a game encodes the per-formation minimum unit requirements.
 *  - "ntw-mins"            → three fixed u32s (artillery, infantry, cavalry %).
 *  - "category-percentages"→ a variable list of {category enum, percentage} pairs.
 */
export type MetadataKind = "ntw-mins" | "category-percentages";

export interface GameConfig {
  id: GameId;
  /** Full title shown in the game picker. */
  label: string;
  /** Compact title shown in headers. */
  shortLabel: string;

  /** Unit-class (entity) enum — the integers written into the .bin. */
  unitClassStrToInt: Record<string, number>;
  unitClassIntToStr: Record<number, string>;
  /** Fill color per unit-class string. */
  unitColors: Record<string, string>;
  /** Unit classes grouped by military category (drives labels + bulk buttons). */
  unitCategoryMap: Record<UnitCategoryKey, string[]>;
  /** Ordered land unit classes offered in the entity dropdown. */
  landEntityTypes: string[];
  /** Ordered naval unit classes offered in the entity dropdown. */
  navalEntityTypes: string[];
  /** Default unit class used when creating a new block / entity row. */
  defaultEntity: string;
  /** The commanding-unit class (general / admiral) for default formations. */
  commandEntity: string;
  /** A small, representative set of classes shown in the canvas legend. */
  legendEntities: string[];

  /** AI purposes, in display order, plus their bitmask values. */
  allPurposes: string[];
  purposeToBits: Record<string, number>;

  /** Shape of the formation metadata section in the binary. */
  metadataKind: MetadataKind;
  /** Category enum for "category-percentages" metadata (Shogun 2). */
  categoryStrToInt: Record<string, number>;
  categoryIntToStr: Record<number, string>;
  allCategories: string[];
  /** Whether taw's Ruby (.txt) interchange applies to this game (NTW only). */
  supportsRuby: boolean;
}
