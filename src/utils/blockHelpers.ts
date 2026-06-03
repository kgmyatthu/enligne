/**
 * @file utils/blockHelpers.ts
 * @description Helper functions for block rendering and creation. Color/label
 * logic is driven by the active GameConfig so it works for any supported game.
 */
import type { Block, Formation, UnitCategory, EntityDescription, GameConfig } from '../types';

/** Returns the fill color for a block based on its first entity preference. */
export function getBlockColor(block: Block, config: GameConfig): string {
  if (block.type === "spanning") return "transparent";
  const p = (block.entities || [])[0];
  return p ? (config.unitColors[p.description] || "#6b7280") : "#6b7280";
}

/** Determines the military category of an entity description string. */
export function getEntityCategory(desc: EntityDescription, config: GameConfig): UnitCategory {
  const m = config.unitCategoryMap;
  if (m.infantry.includes(desc)) return "INF";
  if (m.cavalry.includes(desc)) return "CAV";
  if (m.artillery.includes(desc)) return "ART";
  if (m.naval.includes(desc)) return "NAV";
  if (m.command.includes(desc)) return "GEN";
  if (m.other.includes(desc)) return "ANY";
  return "OTH";
}

/**
 * Computes a short label based on entity preference majority, weighted by priority.
 * Top category must be ≥60% for a definitive label, otherwise "MIX".
 */
export function getBlockLabel(block: Block, config: GameConfig): string {
  if (block.type === "spanning") return "Span";
  const ents = block.entities || [];
  if (ents.length === 0) return `B${block.id}`;

  const counts: Partial<Record<UnitCategory, number>> = {};
  ents.forEach(e => {
    const cat = getEntityCategory(e.description, config);
    counts[cat] = (counts[cat] || 0) + (e.priority > 0 ? e.priority : 0.1);
  });

  const keys = (Object.keys(counts) as UnitCategory[]).filter(k => k !== "ANY");
  if (keys.length === 0) return "ANY";
  keys.sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
  const top = keys[0];
  const total = keys.reduce((s, k) => s + (counts[k] || 0), 0);
  if ((counts[top] || 0) / total >= 0.6) return top;
  return "MIX";
}

/** Human-readable label for an entity id (snake_case or PascalCase → spaced). */
export function prettifyEntity(desc: string): string {
  if (desc.includes("_")) return desc.replace(/_/g, " ");
  return desc.replace(/([a-z])([A-Z])/g, "$1 $2");
}

/** Creates a new default formation with anchor + command blocks for the game. */
export function createDefaultFormation(config: GameConfig): Formation {
  const anyUnit = config.unitCategoryMap.other[0] || config.defaultEntity;
  return {
    name: "New Formation", priority: 0, purposes: config.allPurposes.slice(0, 2),
    min_artillery: 0, min_infantry: 0, min_cavalry: 0, minCategories: [], factions: [],
    blocks: [
      { id: 0, type: "absolute", blockPriority: 1.0, arrangement: "Line", spacing: 2.0, crescentYOffset: 0, x: 0, y: 0, minThreshold: 0, maxThreshold: -1, entities: [{ priority: 1.0, description: config.defaultEntity }] },
      { id: 1, type: "relative", blockPriority: 0.5, arrangement: "Line", spacing: 2.0, crescentYOffset: 0, x: 0, y: -10, relativeToBlock: 0, minThreshold: 0, maxThreshold: -1, entities: [{ priority: 1.0, description: config.commandEntity }, { priority: 0.0, description: anyUnit }] },
    ],
  };
}
