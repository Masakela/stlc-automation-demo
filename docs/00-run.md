# STLC Run — ShopDemo — 2026-10-09 14:10

**Input:** ShopDemo SUT (login→inventory→cart→checkout) with seeded, data-triggered defects.
**Stack:** Playwright + TypeScript (chromium). **SUT:** `04-execution/sut/server.js` @ :7070.

## Result at a glance
- Requirements: 6 functional + 1 non-functional · Testable items: 21 · Test cases: 21
- Execution: **13 passed · 7 failed · 1 deferred** → **pass rate 65%** (13/20 executed)
- Defects: **7** (1 Critical, 2 High, 4 Medium) — exit criteria NOT met (open Critical)

## Top defects
1. **DEF-004 (Critical)** — checkout total $5 high for error_user (money).
2. **DEF-001 (High)** — backpack price integrity ($9.99 vs $29.99); see OQ-1.
3. **DEF-003 (High)** — add-to-cart silently fails for error_user.

## Deliverables
- `01-requirement-analysis/` — RTM.md, RTM.csv, testable-items.md
- `02-test-planning/` — Master-Test-Plan.md, estimation.md
- `03-test-cases/` — test-cases.md, test-cases.csv, test-data/
- `04-execution/` — sut/, tests/, test-results/, playwright-report/, defect-report.md,
  execution-log.md, **kpis-out/index.html** (stakeholder dashboard)

## How to reproduce
```bash
cd 04-execution
npm install && npx playwright install
npx playwright test            # auto-starts the SUT on :7070
node scripts/kpi-report.js --pw test-results/results.json --out kpis-out
```
> Note: the delivered `playwright.config.ts` reads the browser from a normal Playwright
> install. (The demo run used an executablePath override only because this sandbox ships a
> pinned Chromium.)

## Open questions
- OQ-1: Is the backpack's correct price $29.99 (catalog) or $9.99 (checkout line)?
