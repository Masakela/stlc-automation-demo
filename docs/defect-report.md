# Defect Report — ShopDemo — run 2026-10-09-1410

> Summary: 7 defects — 1 Critical, 2 High, 4 Medium. Pass rate 65% (13/20 executed).
> Exit criteria NOT met: open Critical (DEF-004) and High (DEF-001, DEF-003) defects.

| Defect ID | TC ID | Req ID | Severity | Priority | Steps to Reproduce | Expected | Actual | Evidence | Status |
|-----------|-------|--------|----------|----------|--------------------|----------|--------|----------|--------|
| DEF-004 | TC-FR-004-03 | FR-004 | Critical | High | Log in as error_user; add any item; go to /checkout | total = subtotal + 8% tax | total is $5.00 higher (phantom fee) | trace/screenshot | New |
| DEF-001 | TC-FR-004-01 | FR-004 | High | High | Note backpack catalog ($29.99); add; open cart | cart line == $29.99 | cart line shows $9.99 | trace | New |
| DEF-003 | TC-FR-003-02 | FR-003 | High | Med | Log in as error_user; add Fleece Jacket; open cart | Jacket present | cart empty — add ignored | trace | New |
| DEF-006 | TC-FR-005-03 | FR-005 | Medium | High | On /checkout-info fill first+last, leave zip blank, continue | Error: postal code required | no error — proceeds to overview | trace | New |
| DEF-002 | TC-FR-002-03 | FR-002 | Medium | Med | Log in as problem_user; add one item | badge "1" | badge "2" | trace | New |
| DEF-005 | TC-FR-002-04 | FR-002 | Medium | Low | Click "price low→high" | ascending | descending (reversed) | trace | New |
| DEF-007 | TC-FR-006-03 | FR-006 | Medium | Med | Log in as problem_user; add item; open cart; Remove | cart empty | item remains — remove ignored | trace | New |

**Notes**
- DEF-004 (money) and DEF-001 (price integrity, tied to OQ-1) are release blockers.
- DEF-006 is a **validation gap**: the postal-code field has no required-field check, so
  incomplete orders can proceed — often flagged in security/data-quality review too.
- DEF-002/003/007 are **user-type-specific** (problem_user / error_user), which is exactly
  why the test data varies the account.
