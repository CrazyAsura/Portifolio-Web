# Premium portfolio implementation plan

**Goal:** Replace MUI with a custom Tailwind/shadcn interface, Motion, Lenis and a restrained Three.js accent.

**Approved design:** Charcoal, ivory and gold. Rounded controls and portrait, editorial typography, original project content. Desktop circular cursor with a contrasting click ring. Golden scrollbar. User approved this direction on 2026-09-15.

**Architecture:** Render repository content on the server. Keep theme, navigation and decorative effects in small client components. Use local shadcn Button/Badge primitives and CSS theme tokens. Load Three.js dynamically and stop rendering while offscreen or hidden. Keep native scrolling and cursor on touch/reduced-motion devices.

## Steps

- [ ] Replace MUI/Emotion dependencies with Motion, Three.js, Lenis, Radix Slot and shadcn utilities; reconcile lockfile with available package versions without losing unrelated user changes.
- [ ] Add `components/ui/button.tsx`, `badge.tsx`, `lib/utils.ts`, `components.json` and global design tokens.
- [ ] Rewrite the existing Header, Dock, Footer and four sections, preserving project URLs, assets, contact data and qualifications. Render Home from async repositories without a mount gate.
- [ ] Add isolated cursor, smooth-scroll and Three.js effects with cleanup, touch and reduced-motion fallbacks. Retain Redux theme preference.
- [ ] Verify TypeScript, ESLint and production build. Check browser rendering at desktop/mobile sizes, keyboard navigation, theme persistence, cursor clicks and reduced motion where browser tooling is available.

## Acceptance checks

No MUI/Emotion imports remain. Every navigation link resolves to a section. Projects and contacts are visible in server HTML. No horizontal overflow on mobile. Theme controls have accessible names. Cursor never intercepts clicks and native cursor returns when custom cursor is inactive. Three.js renderer, geometry, material, observers and animation loops are released on unmount. Scroll smoothing is disabled for reduced motion. Record actual verification results in the delivery notes.
