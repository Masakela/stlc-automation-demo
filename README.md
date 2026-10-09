# End-to-End QA Automation Pipeline — ShopDemo

A complete **Software Testing Life Cycle** run against **ShopDemo**, a small web app built
with intentionally **seeded, data-triggered defects** so the automation finds real bugs and
the KPI dashboard is meaningful — not all-green. Which user you log in as decides which bug
you hit, so the *test data* generates the defects.

## Result

**13 passed · 7 failed · 1 deferred → 65% pass rate · 7 defects** (1 Critical, 2 High, 4
Medium), each traced back to a test case and a requirement.

Once GitHub Pages is enabled, the live stakeholder dashboard publishes here:

> **Live KPI dashboard:** `https://<your-username>.github.io/stlc-automation-demo/`

## The pipeline (full STLC)

| Phase | Deliverable |
|------|-------------|
| 1. Requirement Analysis | `docs/RTM.md` (Requirement Traceability Matrix) + `docs/testable-items.md` |
| 2. Test Planning | `docs/Master-Test-Plan.md` + `docs/estimation.md` |
| 3. Test Case Development | `docs/test-cases.md` (positive / negative / boundary / data-variant) |
| 4. Test Execution | the Playwright suite in `tests/`, run against `sut/`, producing `docs/defect-report.md`, `docs/execution-log.md`, and the KPI dashboard |

Every requirement traces through testable items → test cases → execution results, so coverage
gaps and defects are visible end to end.

## The seeded defects (what each failing test caught)

| Defect | Severity | Trigger (test data) | Requirement |
|--------|----------|---------------------|-------------|
| DEF-004 | Critical | checkout total $5 too high (error_user) | FR-004 |
| DEF-001 | High | backpack price $9.99 vs catalog $29.99 | FR-004 |
| DEF-003 | High | add-to-cart silently ignored (error_user) | FR-003 |
| DEF-006 | Medium | postal code not validated (blank zip accepted) | FR-005 |
| DEF-002 | Medium | cart badge miscounts (problem_user) | FR-002 |
| DEF-005 | Medium | "price low→high" sorts descending | FR-002 |
| DEF-007 | Medium | remove-from-cart ignored (problem_user) | FR-006 |

## Run it locally

```bash
npm install
npx playwright install
npx playwright test            # Playwright auto-starts ShopDemo (sut/server.js) on :7070
node scripts/kpi-report.js --pw test-results/results.json --out kpis-out
# open kpis-out/index.html
```

## Stack

Playwright (`@playwright/test`, TypeScript) · Page-Object / data-driven tests · a
zero-dependency Node system-under-test · a zero-dependency KPI dashboard generator ·
GitHub Actions CI that runs the suite and deploys the dashboard to GitHub Pages.

> The test step uses `|| true` in CI so the intentionally-failing demo doesn't fail the
> build. In a real project you'd remove that so failures gate the pipeline.
