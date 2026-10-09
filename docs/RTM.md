# Requirement Traceability Matrix (RTM) — ShopDemo

> Summary: 6 functional + 1 non-functional requirements · 21 testable items · 1 open question.
> Status after execution: every requirement traces to cases and results; 7 defects found.

| Req ID | Requirement | Type | Source | Priority | Acceptance Criteria | Testable Items | Test Case IDs | Status |
|--------|-------------|------|--------|----------|---------------------|----------------|---------------|--------|
| FR-001 | Users authenticate with username + password; invalid or locked users are rejected | Functional | inferred (login flow) | High | Valid creds reach inventory; bad creds and locked_out_user show an error | valid login, bad password, locked-out, unknown user | TC-FR-001-01..04 | Executed |
| FR-002 | Inventory lists products; cart badge reflects item count; sort orders correctly | Functional | inferred (inventory) | High | 6 products; badge = items added; "low→high" ascending by price | product count, badge (standard), badge (problem_user), sort asc | TC-FR-002-01..04 | Executed |
| FR-003 | Items added to the cart appear in the cart for every valid user | Functional | inferred (cart) | High | Added item is present in cart contents | add→cart (standard), add→cart (error_user) | TC-FR-003-01..02 | Executed |
| FR-004 | Pricing integrity: cart/checkout prices match catalog; total = subtotal + tax | Functional | inferred (checkout) | Critical | Line price == catalog price; total == subtotal + 8% tax | price integrity, total (standard), total (error_user) | TC-FR-004-01..03 | Executed |
| FR-005 | Checkout information form validates required fields (first name, last name, postal code) | Functional | inferred (checkout form) | High | Missing any required field is rejected with a message | first-name, last-name, postal-code, valid info | TC-FR-005-01..04 | Executed |
| FR-006 | Items can be removed from the cart for every valid user | Functional | inferred (cart) | Med | Remove deletes the item and updates the cart | remove one of two, remove last, remove (problem_user) | TC-FR-006-01..03 | Executed |
| NFR-001 | Inventory page meets a performance budget for all users | Non-functional | inferred | Medium | Inventory interactive < 2.0s (incl. performance_glitch_user) | perf budget | TC-NFR-001-01 | Deferred (manual) |

**Open question:** OQ-1 — Is the backpack's correct price $29.99 (catalog) or $9.99 (checkout)? The two disagree; business must confirm the source of truth. (Drives DEF-001 severity.)
