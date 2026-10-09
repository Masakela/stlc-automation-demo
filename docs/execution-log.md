# Execution Log — ShopDemo — run 2026-10-09-1410

> 21 cases: 13 passed · 7 failed · 1 deferred(skipped). Pass rate 65% (13/20 executed).
> Chromium · baseURL http://localhost:7070 · duration ~34s.

| TC ID | Result | Defect | Notes |
|-------|--------|--------|-------|
| TC-FR-001-01 | Pass | — | valid login |
| TC-FR-001-02 | Pass | — | bad password rejected |
| TC-FR-001-03 | Pass | — | locked_out_user blocked |
| TC-FR-001-04 | Pass | — | unknown user rejected |
| TC-FR-002-01 | Pass | — | 6 products |
| TC-FR-002-02 | Pass | — | badge 1 (standard_user) |
| TC-FR-002-03 | Fail | DEF-002 | badge reads 2 (problem_user) |
| TC-FR-002-04 | Fail | DEF-005 | sort low→high reversed |
| TC-FR-003-01 | Pass | — | item in cart (standard_user) |
| TC-FR-003-02 | Fail | DEF-003 | jacket add ignored (error_user) |
| TC-FR-004-01 | Fail | DEF-001 | backpack line $9.99 vs catalog $29.99 |
| TC-FR-004-02 | Pass | — | total == subtotal+tax (standard_user) |
| TC-FR-004-03 | Fail | DEF-004 | total $5 high (error_user) |
| TC-FR-005-01 | Pass | — | first-name required enforced |
| TC-FR-005-02 | Pass | — | last-name required enforced |
| TC-FR-005-03 | Fail | DEF-006 | postal code not validated |
| TC-FR-005-04 | Pass | — | valid info → overview |
| TC-FR-006-01 | Pass | — | remove one of two (standard_user) |
| TC-FR-006-02 | Pass | — | remove last empties cart (standard_user) |
| TC-FR-006-03 | Fail | DEF-007 | remove ignored (problem_user) |
| TC-NFR-001-01 | Deferred | — | needs perf harness (pending) |

RTM status: FR-001 Pass · FR-002 2 defects · FR-003 1 · FR-004 2 · FR-005 1 · FR-006 1 · NFR-001 deferred.
