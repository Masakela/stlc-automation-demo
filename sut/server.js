'use strict';
/*
 * ShopDemo — zero-dependency SUT for the STLC demo, with SEEDED, DATA-TRIGGERED DEFECTS.
 * Flow: login -> inventory -> cart (add/remove) -> checkout-info (form) -> checkout -> finish.
 *
 * Seeded defects:
 *   DEF-001  Price integrity   : backpack checkout line price != inventory price (all users)
 *   DEF-002  Cart badge        : problem_user — adding 1 item shows badge "2"
 *   DEF-003  Add to cart       : error_user  — adding the jacket silently does nothing
 *   DEF-004  Checkout total    : error_user  — total = subtotal + tax + $5 phantom fee
 *   DEF-005  Sort order        : "price low->high" actually returns high->low (all users)
 *   DEF-006  Form validation   : postal code is NOT validated (empty zip is accepted)
 *   DEF-007  Remove from cart  : problem_user — remove is silently ignored
 *   locked_out_user            : cannot log in (intended negative case, not a defect)
 */
const http = require('http');
const PORT = process.env.PORT || 7070;

const USERS = {
  standard_user: 'secret_sauce', problem_user: 'secret_sauce', error_user: 'secret_sauce',
  performance_glitch_user: 'secret_sauce', locked_out_user: 'secret_sauce',
};
const PRODUCTS = [
  { id: 1, name: 'Sauce Labs Backpack', price: 29.99 },
  { id: 2, name: 'Sauce Labs Bike Light', price: 9.99 },
  { id: 3, name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  { id: 4, name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { id: 5, name: 'Sauce Labs Onesie', price: 7.99 },
  { id: 6, name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
];
const TAX_RATE = 0.08;
const sessions = new Map();

const money = (n) => '$' + n.toFixed(2);
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const prod = (id) => PRODUCTS.find((p) => p.id === id);
const parseCookies = (req) => Object.fromEntries((req.headers.cookie || '').split(';').map((c) => c.trim().split('=')).filter((x) => x[0]));
function sidOf(req, res) {
  let { sid } = parseCookies(req);
  if (!sid || !sessions.has(sid)) {
    sid = 'sid-' + Math.random().toString(36).slice(2);
    sessions.set(sid, { user: null, cart: [], info: null });
    res.setHeader('Set-Cookie', `sid=${sid}; Path=/; HttpOnly`);
  }
  return sid;
}
function page(title, body) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:1.5rem auto;padding:0 1rem;color:#132}
h1{font-size:1.3rem}.item{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5e5e2;padding:.5rem 0}
input,button{font-size:1rem;padding:.45rem .6rem}button{cursor:pointer}.badge{background:#0b7;color:#fff;border-radius:10px;padding:1px 8px;font-size:.8rem}
.err{color:#c0362c;font-weight:600}a{color:#2a78d6}</style></head><body>${body}</body></html>`;
}
const send = (res, code, html, headers) => { res.writeHead(code, Object.assign({ 'content-type': 'text/html; charset=utf-8' }, headers || {})); res.end(html); };
const redirect = (res, to) => { res.writeHead(302, { Location: to }); res.end(); };
const readBody = (req, cb) => { let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => cb(Object.fromEntries(new URLSearchParams(b)))); };

function loginPage(err) {
  return page('ShopDemo — Login', `<h1>ShopDemo</h1>
  <form method="POST" action="/login">
    <div class="item"><label>Username</label><input data-test="username" name="username"></div>
    <div class="item"><label>Password</label><input data-test="password" name="password" type="password"></div>
    <button data-test="login-button" type="submit">Login</button></form>
  ${err ? `<p class="err" data-test="error">${err}</p>` : ''}
  <p style="color:#789;font-size:.85rem">standard_user · problem_user · error_user · performance_glitch_user · locked_out_user / <code>secret_sauce</code></p>`);
}
const cartBadge = (s) => { let n = s.cart.length; if (s.user === 'problem_user' && n > 0) n += 1; return n; };
const linesPrice = (p) => (p.id === 1 ? 9.99 : p.price);  // DEF-001

function inventoryPage(s, sort) {
  let list = PRODUCTS.slice();
  if (sort === 'lohi' || sort === 'hilo') list.sort((a, b) => b.price - a.price);  // DEF-005 on lohi
  const badge = cartBadge(s);
  const rows = list.map((p) => `<div class="item" data-test="inventory-item">
    <span data-test="inventory-item-name">${p.name}</span>
    <span><span data-test="inventory-item-price">${money(p.price)}</span>
    <form method="POST" action="/cart/add?id=${p.id}" style="display:inline"><button data-test="add-to-cart-${slug(p.name)}">Add</button></form></span></div>`).join('');
  return page('ShopDemo — Inventory', `<h1>Products <a href="/cart" data-test="cart-link">Cart ${badge ? `<span class="badge" data-test="shopping-cart-badge">${badge}</span>` : ''}</a></h1>
    <p>Sort: <a data-test="sort-lohi" href="/inventory?sort=lohi">low&rarr;high</a> · <a data-test="sort-hilo" href="/inventory?sort=hilo">high&rarr;low</a></p>
    <div data-test="inventory-container">${rows}</div>`);
}
function cartPage(s) {
  const rows = s.cart.map((id) => { const p = prod(id);
    return `<div class="item" data-test="cart-item"><span data-test="cart-item-name">${p.name}</span>
    <span><span data-test="cart-item-price">${money(linesPrice(p))}</span>
    <form method="POST" action="/cart/remove?id=${id}" style="display:inline"><button data-test="remove-${slug(p.name)}">Remove</button></form></span></div>`; }).join('') || '<p data-test="cart-empty">Cart is empty.</p>';
  return page('ShopDemo — Cart', `<h1>Your Cart <a href="/inventory">continue</a></h1>
    <div data-test="cart-container">${rows}</div>
    <p><a href="/checkout-info" data-test="checkout">Checkout</a></p>`);
}
function checkoutInfoPage(err) {
  return page('ShopDemo — Your Information', `<h1>Checkout: Your Information</h1>
    <form method="POST" action="/checkout-info">
      <div class="item"><label>First Name</label><input data-test="first-name" name="firstName"></div>
      <div class="item"><label>Last Name</label><input data-test="last-name" name="lastName"></div>
      <div class="item"><label>Zip/Postal Code</label><input data-test="postal-code" name="postalCode"></div>
      <button data-test="continue" type="submit">Continue</button></form>
    ${err ? `<p class="err" data-test="error">${err}</p>` : ''}`);
}
function checkoutPage(s) {
  const subtotal = s.cart.reduce((a, id) => a + linesPrice(prod(id)), 0);
  const tax = +(subtotal * TAX_RATE).toFixed(2);
  let total = +(subtotal + tax).toFixed(2);
  if (s.user === 'error_user') total = +(total + 5).toFixed(2);  // DEF-004
  return page('ShopDemo — Overview', `<h1>Checkout Overview</h1>
    <div class="item">Subtotal <span data-test="subtotal">${money(subtotal)}</span></div>
    <div class="item">Tax <span data-test="tax">${money(tax)}</span></div>
    <div class="item"><b>Total</b> <b data-test="total">${money(total)}</b></div>
    <p><a href="/finish" data-test="finish">Finish</a></p>`);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const s = sessions.get(sidOf(req, res));
  const p = url.pathname;

  if (p === '/health') return send(res, 200, 'ok');
  if (p === '/' || p === '/login') {
    if (req.method === 'GET') return send(res, 200, loginPage(null));
    return readBody(req, (f) => {
      const u = (f.username || '').trim(); const pw = f.password || '';
      if (u === 'locked_out_user') return send(res, 200, loginPage('Sorry, this user has been locked out.'));
      if (!USERS[u] || USERS[u] !== pw) return send(res, 200, loginPage('Username and password do not match any user in this service.'));
      s.user = u; s.cart = []; s.info = null; return redirect(res, '/inventory');
    });
  }
  if (!s.user) return redirect(res, '/login');

  if (p === '/inventory') return send(res, 200, inventoryPage(s, url.searchParams.get('sort')));
  if (p === '/cart/add' && req.method === 'POST') {
    const id = Number(url.searchParams.get('id'));
    if (!(s.user === 'error_user' && id === 4) && prod(id)) s.cart.push(id);  // DEF-003
    return redirect(res, '/inventory');
  }
  if (p === '/cart/remove' && req.method === 'POST') {
    const id = Number(url.searchParams.get('id'));
    if (s.user !== 'problem_user') { const i = s.cart.indexOf(id); if (i >= 0) s.cart.splice(i, 1); }  // DEF-007
    return redirect(res, '/cart');
  }
  if (p === '/cart') return send(res, 200, cartPage(s));
  if (p === '/checkout-info') {
    if (req.method === 'GET') return send(res, 200, checkoutInfoPage(null));
    return readBody(req, (f) => {
      if (!(f.firstName || '').trim()) return send(res, 200, checkoutInfoPage('First Name is required'));
      if (!(f.lastName || '').trim()) return send(res, 200, checkoutInfoPage('Last Name is required'));
      // DEF-006: postal code is NOT validated here (should be required, isn't)
      s.info = { firstName: f.firstName, lastName: f.lastName, postalCode: f.postalCode };
      return redirect(res, '/checkout');
    });
  }
  if (p === '/checkout') return send(res, 200, checkoutPage(s));
  if (p === '/finish') return send(res, 200, page('Done', '<h1 data-test="complete">Thank you for your order!</h1>'));
  return send(res, 404, page('404', '<h1>404</h1>'));
});
server.listen(PORT, () => console.log(`ShopDemo (SUT) on http://localhost:${PORT}`));
