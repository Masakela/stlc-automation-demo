# Testable Items — ShopDemo

**FR-001 Authentication**
- TI-1 valid login lands on inventory (positive)
- TI-2 invalid password shows error (negative)
- TI-3 locked_out_user is blocked with a message (negative)
- TI-4 unknown username shows error (negative)

**FR-002 Inventory & cart badge**
- TI-5 inventory lists exactly 6 products (positive)
- TI-6 adding one item sets badge to 1 — standard_user (positive)
- TI-7 adding one item sets badge to 1 — problem_user (data-variant; defect-prone)
- TI-8 "price low→high" sorts ascending (positive)

**FR-003 Cart contents**
- TI-9 added item appears in cart — standard_user (positive)
- TI-10 added jacket appears in cart — error_user (data-variant; defect-prone)

**FR-004 Pricing & checkout integrity**
- TI-11 backpack cart price == catalog price (data integrity)
- TI-12 checkout total == subtotal + tax — standard_user (calculation)
- TI-13 checkout total == subtotal + tax — error_user (data-variant; defect-prone)

**NFR-001 Performance**
- TI-14 inventory loads within 2.0s budget (non-functional; needs perf harness)

## Open questions / ambiguities
- OQ-1: Backpack price conflict ($29.99 vs $9.99) — confirm the authoritative value.
- The "user type" is the key test-data dimension: standard_user is the clean baseline;
  problem_user / error_user / performance_glitch_user each exercise a different fault class.

**FR-005 Checkout information validation**
- TI-15 missing first name shows error (negative)
- TI-16 missing last name shows error (negative)
- TI-17 missing postal code shows error (negative; defect-prone)
- TI-18 valid info proceeds to overview (positive)

**FR-006 Remove from cart**
- TI-19 removing one of two items leaves the other — standard_user (positive)
- TI-20 removing the last item empties the cart — standard_user (positive)
- TI-21 removing the last item empties the cart — problem_user (data-variant; defect-prone)
