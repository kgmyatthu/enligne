# Total War GroupFormation Visual Editor

A React-based visual editor for the `groupformations.bin` files that control AI
army (and fleet) deployment formations in **Napoleon: Total War** and
**Total War: Shogun 2** (incl. Fall of the Samurai).

## Supported games

Pick the game from the **Game** selector in the top-left before importing.
Unit-class IDs, AI purposes and the formation-metadata layout are all
game-specific, so the selector must match your file.

| Game | Import / Export | Notes |
|------|-----------------|-------|
| **Napoleon: Total War** | Binary `.bin` + taw Ruby `.txt` | `min_artillery/infantry/cavalry` metadata |
| **Total War: Shogun 2** | Binary `.bin` | `min_unit_category_percentage` metadata; land + naval + FotS unit classes |

## Features

- **Import/Export** — Reads/writes `groupformations.bin` directly for both games (byte-exact round-trip). NTW additionally supports taw's Ruby `.txt`.
- **2D SVG Canvas** — Pan/zoom/drag blocks with arrangement-aware shapes (Line, Column, Crescent)
- **Block Property Editor** — Full editing of priority, arrangement, position, spacing, thresholds, entity preferences
- **Shogun 2 metadata** — Editor for the `min_unit_category_percentage` requirement list
- **Spanning Block Config** — Checkbox UI for selecting which blocks a spanning block covers
- **Multi-select** — Ctrl+click blocks for bulk editing; Ctrl/Shift+click formations for batch AI priority
- **Selective Export** — Multi-select formations in sidebar, export only those
- **Anchor Management** — Delete/promote anchor blocks with modal chooser and automatic ID re-indexing
- **Sequential ID Enforcement** — Block deletion re-indexes all IDs and updates all references

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build for Production

```bash
npm run build
npm run preview   # preview the build locally
```

## Usage Workflow (Shogun 2)

1. Extract `groupformations.bin` from the game/pack (e.g. with RPFM or PFM)
2. Select **Shogun 2** in the Game selector
3. Click **Import** → upload `groupformations.bin`
4. Edit formations visually on the canvas and property panel
5. Click **Export** → **Download .bin**
6. Re-pack the `.bin` into your mod and load in-game

(For NTW you can use the same `.bin` flow, or taw's `gfunpack`/`gfpack` Ruby `.txt`.)

## Project Structure

```
src/
├── main.tsx                    # React entry point
├── App.tsx                     # Root component — state, game selector, sidebar, layout
├── constants/
│   ├── games/                  # Per-game configuration registry
│   │   ├── types.ts            # GameConfig contract
│   │   ├── ntw.ts              # Napoleon: Total War config
│   │   ├── shogun2.ts          # Total War: Shogun 2 config
│   │   └── index.ts            # GAMES registry + getGame()
│   ├── units.ts                # NTW unit colors, categories, class integers
│   ├── formations.ts           # Shared arrangements/shape mappings + NTW purposes
│   └── styles.ts               # Shared inline style definitions
├── utils/
│   ├── parsers.ts              # Binary (.bin) + Ruby (.txt) import — game-aware
│   ├── exporters.ts            # Binary (.bin) + Ruby (.txt) export — game-aware
│   ├── positions.ts            # Absolute position computation from relative offsets
│   └── blockHelpers.ts         # Block color, label, category detection, factory
└── components/
    ├── FormationCanvas.tsx     # SVG canvas with pan/zoom/drag/selection
    ├── PropertyEditor.tsx      # Right panel — formation/block/bulk editing
    ├── ImportModal.tsx         # Import dialog
    ├── ExportModal.tsx         # Export dialog
    └── AnchorPromptModal.tsx   # Anchor block deletion/promotion chooser
```

### Adding another title

Create a new `GameConfig` under `src/constants/games/`, register it in
`games/index.ts`, and (if its binary metadata differs) extend the `metadataKind`
branch in `parsers.ts`/`exporters.ts`. Everything else is config-driven.

## Key Domain Knowledge

### Shared wire format
`groupformations.bin` is a little-endian binary. Strings are `u16` length +
UTF-16LE chars. A formation is: name, `f32` AI priority, `u32` purpose bitmask,
**metadata** (game-specific), faction list, then blocks. The block count is
written as the prefix of block 0; subsequent blocks are prefixed by their id.

Blocks: `0`=ContainerAbsolute, `1`=ContainerRelative, `3`=Spanning. Entity
preferences are `u32` count + `[f32 priority, i32 class]` pairs. Positions are
center-to-center additive offsets. Shapes: `0=Line, 1=Column, 2=CrescentFront,
3=CrescentBack`.

### NTW vs Shogun 2 differences
- **Metadata**: NTW writes three fixed `u32` minimums (artillery, infantry,
  cavalry). Shogun 2 writes a `u32` count followed by `[u32 category, u32 pct]`
  pairs (`min_unit_category_percentage`).
- **Unit-class enum** and **AI-purpose bits** differ per game (see the
  respective `games/*.ts`).

### Shogun 2 AI purpose bits
`ATTACK=1, DEFEND=2, RIVER_ATTACK=4, NAVAL_ATTACK=32, NAVAL_DEFEND=64,
DEFAULT_DEPLOYMENT=128, NAVAL_DEFAULT_DEPLOYMENT=256, LARGE_MAP_ONLY=512`

### NTW notes
- No official Assembly Kit for NTW; community tool by **taw**
  ([github.com/taw/etwng](https://github.com/taw/etwng)) is the bidirectional
  Ruby converter. Unit class integers are alphabetically ordered.

## ⚠️ Safety

- **Do not delete vanilla formations** — a missing stock formation crashes the
  game on battle load. To disable one, set its **AI Priority to 0** instead.
- Empty spanning blocks (0 spanned) will crash the game.
- Always keep a backup of the original `.bin`.

## License

MIT
