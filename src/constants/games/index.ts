/**
 * @file constants/games/index.ts
 * @description Registry of supported games. Add a GameConfig here to expose a
 * new title throughout the editor.
 */
import type { GameConfig, GameId } from './types';
import { NTW } from './ntw';
import { SHOGUN2 } from './shogun2';

export type { GameConfig, GameId, MetadataKind } from './types';

export const GAMES: Record<GameId, GameConfig> = {
  ntw: NTW,
  shogun2: SHOGUN2,
};

/** Ordered list for pickers. */
export const GAME_LIST: GameConfig[] = [NTW, SHOGUN2];

export const DEFAULT_GAME: GameId = "shogun2";

export const getGame = (id: GameId): GameConfig => GAMES[id];
