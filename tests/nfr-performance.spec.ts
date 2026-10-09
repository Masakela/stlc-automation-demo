import { test, expect } from '@playwright/test';

// Req NFR-001 — Performance. Requires a dedicated perf harness/budget run;
// left as a manual/pending case so it shows as skipped in the KPI until wired up.
test.fixme('TC-NFR-001-01 inventory loads within 2s budget (performance_glitch_user)', async ({ page }) => {
  // TODO: measure LCP/navigation timing against a perf budget in a controlled env.
});
