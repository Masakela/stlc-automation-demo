# Test Cases — ShopDemo

> Summary: 21 cases across 7 requirements (positive, negative, boundary, data-variant).
> Coverage: 100% of requirements have ≥1 case. 20 automatable, 1 deferred (performance).

| TC ID | Req ID | Title | Type | Priority | Preconditions | Steps | Test Data | Expected Result |
|-------|--------|-------|------|----------|---------------|-------|-----------|-----------------|
| TC-FR-001-01 | FR-001 | Valid login lands on inventory | positive | High | On /login | enter creds, submit | standard_user | Inventory container visible |
| TC-FR-001-02 | FR-001 | Invalid password shows error | negative | High | On /login | bad password, submit | standard_user/"nope" | Error "do not match" |
| TC-FR-001-03 | FR-001 | Locked-out user blocked | negative | High | On /login | submit | locked_out_user | Error "locked out" |
| TC-FR-001-04 | FR-001 | Unknown user shows error | negative | Med | On /login | submit | ghost_user | Error visible |
| TC-FR-002-01 | FR-002 | Inventory lists six products | positive | High | Logged in | open inventory | standard_user | 6 items |
| TC-FR-002-02 | FR-002 | Add one item → badge 1 (standard) | positive | High | Logged in | add backpack | standard_user | Badge "1" |
| TC-FR-002-03 | FR-002 | Add one item → badge 1 (problem) | data-variant | Med | Logged in | add backpack | problem_user | Badge "1" |
| TC-FR-002-04 | FR-002 | Sort price low→high ascending | positive | Med | Logged in | click sort low→high | standard_user | Prices ascending |
| TC-FR-003-01 | FR-003 | Added item in cart (standard) | positive | High | Logged in | add bike light, open cart | standard_user | Bike Light in cart |
| TC-FR-003-02 | FR-003 | Added jacket in cart (error) | data-variant | High | Logged in | add jacket, open cart | error_user | Fleece Jacket in cart |
| TC-FR-004-01 | FR-004 | Backpack cart price == catalog | data-integrity | Critical | Logged in | note catalog, add, open cart | standard_user | Line price == catalog |
| TC-FR-004-02 | FR-004 | Total == subtotal + tax (standard) | calculation | High | Logged in | add item, checkout | standard_user | total ≈ subtotal + 8% |
| TC-FR-004-03 | FR-004 | Total == subtotal + tax (error) | data-variant | Critical | Logged in | add item, checkout | error_user | total ≈ subtotal + 8% |
| TC-FR-005-01 | FR-005 | Missing first name shows error | negative | High | On /checkout-info | fill last+zip, continue | standard_user | Error 'First Name is required' |
| TC-FR-005-02 | FR-005 | Missing last name shows error | negative | High | On /checkout-info | fill first+zip, continue | standard_user | Error 'Last Name is required' |
| TC-FR-005-03 | FR-005 | Missing postal code shows error | negative | High | On /checkout-info | fill first+last, continue | standard_user | Error visible |
| TC-FR-005-04 | FR-005 | Valid info proceeds to overview | positive | High | item in cart | fill all, continue | standard_user | Overview total visible |
| TC-FR-006-01 | FR-006 | Remove one of two items | positive | Med | 2 items in cart | remove one | standard_user | 1 item remains |
| TC-FR-006-02 | FR-006 | Remove last item empties cart | positive | Med | 1 item in cart | remove it | standard_user | Cart empty |
| TC-FR-006-03 | FR-006 | Remove last item empties cart (problem) | data-variant | Med | 1 item in cart | remove it | problem_user | Cart empty |
| TC-NFR-001-01 | NFR-001 | Inventory within 2.0s budget | non-functional | Med | — | measure load | performance_glitch_user | < 2.0s (deferred) |

Automatable cases map 1:1 to the generated specs under `04-execution/tests/`.
