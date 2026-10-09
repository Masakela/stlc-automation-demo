# Master Test Plan — ShopDemo

> Executive summary: Risk-based functional testing of a login→inventory→cart→checkout
> flow, automated with Playwright (TypeScript). Highest risk is **pricing/checkout
> integrity** (money) and **data-variant behavior by user type**, so those get the deepest
> coverage. Performance is scoped as a separate non-functional effort.

## 1. Objectives
Verify that ShopDemo satisfies FR-001..FR-004 for all user types, and surface any
defect with a reproducible, traceable report. Give stakeholders a pass-rate KPI per run.

## 2. Scope
**In scope:** authentication, inventory listing + cart badge, cart contents, pricing &
checkout totals, across the five seeded user types. Chromium engine.
**Out of scope:** payment processing, account management, email, cross-browser matrix
(firefox/webkit) and load/stress testing (tracked separately).

## 3. Test strategy & approach
- **Automated** E2E via Playwright for all functional cases (FR-001..FR-004).
- **Risk-based**: FR-004 (money) = Critical, deepest coverage incl. negative/data variants;
  FR-002/FR-003 = High; NFR-001 = Medium, deferred to a perf harness.
- **Data-driven by user type** — the user account is the primary test-data axis and the main
  source of defects (problem_user, error_user).

## 4. Test types / levels
| Type | Covers |
|------|--------|
| Functional / E2E | FR-001, FR-002, FR-003, FR-004 |
| Negative | FR-001 (bad/locked/unknown), FR-002 problem_user, FR-003 error_user |
| Data integrity | FR-004 (price match, total calc) |
| Non-functional (performance) | NFR-001 (deferred) |

## 5. Test environment
- SUT: ShopDemo (`sut/server.js`) on `http://localhost:7070` (free port; avoids 8080).
- Browser: Chromium. Data: `test-data/users.json`, `test-data/products.json`.

## 6. Tools
Playwright `@playwright/test` (TS); KPI dashboard (`scripts/kpi-report.js`);
GitHub Actions CI; this STLC pipeline for orchestration.

## 7. Entry & exit criteria
- **Entry:** SUT reachable at baseURL; test data prepared; cases designed.
- **Exit:** 100% of High/Critical cases executed; 0 open Critical defects; pass rate reported.
  (This run: exit NOT met — 1 Critical + 1 High defect open; see defect report.)

## 8. Schedule & milestones
Phase 1 analysis → Phase 2 plan → Phase 3 case design → Phase 4 execute+report, single cycle.

## 9. Roles & responsibilities
Automated pipeline: `requirement-analyst` → `test-planner` → `test-case-designer` →
`test-executor`. Human: triage defects, decide OQ-1, approve exit.

## 10. Risks & mitigations
- **Thin/implicit requirements** (inferred from behavior) → flagged OQ-1; confirm with business.
- **Money defects** highest impact → FR-004 gets negative + data-variant cases.
- **Flaky env** → fixed port, localhost proxy bypass, retain-on-failure traces.

## 11. Deliverables
RTM, this plan + estimation, test cases + data, generated Playwright suite, defect report,
execution log, KPI dashboard.
