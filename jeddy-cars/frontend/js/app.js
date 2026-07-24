// shared logic used across every page — theme, wishlist, compare, auth, nav/footer, toasts

const Store = {
  get(key, fallback){ try{ const v = JSON.parse(localStorage.getItem(key)); return v===null||v===undefined ? fallback : v; }catch(e){ return fallback; } },
  set(key, val){ localStorage.setItem(key, JSON.stringify(val)); }
};

const AppState = {
  theme: Store.get('jc_theme','dark'),
  wishlist: Store.get('jc_wishlist', []),
  compare: Store.get('jc_compare', []),
  recentlyViewed: Store.get('jc_recent', []),
  user: Store.get('jc_user', null),
  users: Store.get('jc_users', []),
};

function saveState(){
  Store.set('jc_theme', AppState.theme);
  Store.set('jc_wishlist', AppState.wishlist);
  Store.set('jc_compare', AppState.compare);
  Store.set('jc_recent', AppState.recentlyViewed);
  Store.set('jc_user', AppState.user);
  Store.set('jc_users', AppState.users);
}

// dark/light toggle
function applyTheme(){
  document.documentElement.setAttribute('data-theme', AppState.theme);
  const icon = document.getElementById('theme-icon');
  if(icon) icon.innerHTML = AppState.theme==='dark' ? ICONS.sun : ICONS.moon;
}
function toggleTheme(){
  AppState.theme = AppState.theme==='dark' ? 'light' : 'dark';
  saveState(); applyTheme();
}

const ICONS = {
  sun:'<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  moon:'<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>',
  heart:'<path d="M12 20s-7-4.4-9.5-9C.8 7.4 2.6 4 6 4c2 0 3.3 1 4 2.2C10.7 5 12 4 14 4c3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9z" stroke-width="1.6"/>',
  heartFill:'<path d="M12 20s-7-4.4-9.5-9C.8 7.4 2.6 4 6 4c2 0 3.3 1 4 2.2C10.7 5 12 4 14 4c3.4 0 5.2 3.4 3.5 7-2.5 4.6-9.5 9-9.5 9z"/>',
  scale:'<path d="M12 3v18M12 3L6 8M12 3l6 5M3 8l3 6-3 1a3 3 0 0 0 6 0l-3-1 3-6M21 8l-3 6 3 1a3 3 0 0 1-6 0l3-1-3-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
  user:'<circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 20c1.5-4 4.5-6 7.5-6s6 2 7.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
  cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M2.5 3h2.4L7.2 14.6a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 7H5.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  bell:'<path d="M12 3a5 5 0 0 0-5 5v3.4c0 .8-.3 1.6-.9 2.2L5 15h14l-1.1-1.4a3 3 0 0 1-.9-2.2V8a5 5 0 0 0-5-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M9.5 18a2.5 2.5 0 0 0 5 0" stroke="currentColor" stroke-width="1.4"/>',
};

// little toast notifications
function toast(msg, type='default'){
  let stack = document.getElementById('toast-stack');
  if(!stack){ stack = document.createElement('div'); stack.id='toast-stack'; document.body.appendChild(stack); }
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  stack.appendChild(el);
  requestAnimationFrame(()=> el.classList.add('show'));
  setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=>el.remove(), 400); }, 3200);
}

// wishlist + compare list
function isWishlisted(id){ return AppState.wishlist.includes(id); }
function toggleWishlist(id, btn){
  if(isWishlisted(id)){
    AppState.wishlist = AppState.wishlist.filter(x=>x!==id);
    toast('Removed from wishlist');
  } else {
    AppState.wishlist.push(id);
    toast('Saved to wishlist');
  }
  saveState();
  updateBadges();
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(b=>{
    b.classList.toggle('active', isWishlisted(id));
    b.innerHTML = `<svg viewBox="0 0 24 24" fill="${isWishlisted(id)?'currentColor':'none'}" stroke="currentColor">${ICONS.heart}</svg>`;
  });
}
function isComparing(id){ return AppState.compare.includes(id); }
function toggleCompare(id){
  if(isComparing(id)){
    AppState.compare = AppState.compare.filter(x=>x!==id);
  } else {
    if(AppState.compare.length>=3){ toast('You can compare up to 3 vehicles'); return; }
    AppState.compare.push(id);
    toast('Added to compare');
  }
  saveState(); updateBadges();
  document.querySelectorAll(`[data-compare-btn="${id}"]`).forEach(b=> b.classList.toggle('active', isComparing(id)));
}
function trackRecentlyViewed(id){
  AppState.recentlyViewed = [id, ...AppState.recentlyViewed.filter(x=>x!==id)].slice(0,8);
  saveState();
}
function updateBadges(){
  const w = document.getElementById('wishlist-badge');
  const c = document.getElementById('compare-badge');
  if(w){ w.textContent = AppState.wishlist.length; w.style.display = AppState.wishlist.length? 'flex':'none'; }
  if(c){ c.textContent = AppState.compare.length; c.style.display = AppState.compare.length? 'flex':'none'; }
}

// auth — all mock/localStorage for now, real JWT stuff lives in backend/
function signUp(name, email, password){
  if(AppState.users.find(u=>u.email===email)){ return {ok:false, msg:'An account with this email already exists'}; }
  const user = { id:'u'+Date.now(), name, email, password, joined:new Date().toISOString().slice(0,10), role:'customer' };
  AppState.users.push(user);
  AppState.user = { id:user.id, name, email, role:'customer' };
  saveState();
  return {ok:true};
}
function signIn(email, password){
  if(email==='admin@jeddycars.com' && password==='admin123'){
    AppState.user = { id:'admin', name:'Admin', email, role:'admin' };
    saveState();
    return {ok:true, role:'admin'};
  }
  const u = AppState.users.find(u=>u.email===email && u.password===password);
  if(!u){ return {ok:false, msg:'Invalid email or password'}; }
  AppState.user = { id:u.id, name:u.name, email:u.email, role:'customer' };
  saveState();
  return {ok:true, role:'customer'};
}
function signOut(){ AppState.user = null; saveState(); location.href='index.html'; }

// no email service hooked up yet so "forgot password" just skips straight
// to setting a new one instead of pretending to send an email
function requestPasswordReset(email){
  if(email==='admin@jeddycars.com'){
    return {ok:false, msg:'The admin demo account password is fixed and cannot be reset here.'};
  }
  const user = AppState.users.find(u=>u.email===email);
  // don't reveal whether the email exists either way
  if(user){
    const token = 'demo-' + Math.random().toString(36).slice(2, 10);
    Store.set('jc_reset_token', { email, token, issued: Date.now() });
  }
  return {ok:true, msg:'If an account exists for that email, reset instructions have been sent.'};
}
function resetPassword(email, newPassword){
  const idx = AppState.users.findIndex(u=>u.email===email);
  if(idx===-1){ return {ok:false, msg:'We could not find an account for that email.'}; }
  AppState.users[idx].password = newPassword;
  saveState();
  Store.set('jc_reset_token', null);
  return {ok:true};
}
function changePassword(currentPassword, newPassword){
  if(!AppState.user){ return {ok:false, msg:'You need to be signed in to change your password.'}; }
  if(AppState.user.role==='admin'){
    return {ok:false, msg:'The admin demo account password is fixed and cannot be changed here.'};
  }
  const idx = AppState.users.findIndex(u=>u.id===AppState.user.id);
  if(idx===-1){ return {ok:false, msg:'Account not found.'}; }
  if(AppState.users[idx].password !== currentPassword){
    return {ok:false, msg:'Current password is incorrect.'};
  }
  AppState.users[idx].password = newPassword;
  saveState();
  return {ok:true};
}

// loan math
function calcMonthlyPayment(price, downPct, aprPct, termMonths){
  const principal = price * (1 - downPct/100);
  const monthlyRate = (aprPct/100) / 12;
  if(monthlyRate === 0) return principal / termMonths;
  const m = principal * (monthlyRate * Math.pow(1+monthlyRate, termMonths)) / (Math.pow(1+monthlyRate, termMonths)-1);
  return m;
}

// builds the car card HTML used on every listing page
function carCardHTML(v){
  const fav = isWishlisted(v.id);
  const cmp = isComparing(v.id);
  let tagHTML = '';
  if(v.status==='sold') tagHTML = `<span class="car-tag tag-sold">Sold</span>`;
  else if(v.tag==='new') tagHTML = `<span class="car-tag tag-new">New Arrival</span>`;
  else if(v.tag==='bestseller') tagHTML = `<span class="car-tag tag-bestseller">Bestseller</span>`;
  return `
  <article class="car-card reveal">
    <div class="car-media">
      ${tagHTML}
      <button class="car-fav ${fav?'active':''}" data-fav="${v.id}" onclick="toggleWishlist('${v.id}')" aria-label="Save to wishlist">
        <svg viewBox="0 0 24 24" fill="${fav?'currentColor':'none'}" stroke="currentColor">${ICONS.heart}</svg>
      </button>
      <a href="vehicle.html?id=${v.id}"><img src="${v.images[0]}" alt="${v.brand} ${v.model}" loading="lazy"></a>
    </div>
    <div class="car-body">
      <div class="car-brand">${v.brand}</div>
      <a href="vehicle.html?id=${v.id}"><h3 class="car-name">${v.model}</h3></a>
      <div class="car-specs">
        <span>${v.year}</span>
        <span>·</span>
        <span>${fmtMileage(v.mileage)}</span>
        <span>·</span>
        <span>${v.fuel}</span>
        <span>·</span>
        <span>${v.transmission.split(' ')[0]}</span>
      </div>
      <div class="car-foot">
        <div class="car-price">${fmtPrice(v.price)}<small>or ${fmtPrice(Math.round(calcMonthlyPayment(v.price,20,6.9,60)))}/mo</small></div>
        <div class="car-cta">
          <button class="icon-sq ${cmp?'active':''}" data-compare-btn="${v.id}" onclick="toggleCompare('${v.id}')" title="Compare" aria-label="Add to compare"><svg viewBox="0 0 24 24" fill="none">${ICONS.scale}</svg></button>
          <a class="icon-sq" href="vehicle.html?id=${v.id}" title="View details" aria-label="View details">→</a>
        </div>
      </div>
    </div>
  </article>`;
}

function renderGrid(containerId, vehicles){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = vehicles.length ? vehicles.map(carCardHTML).join('') : `
    <div class="empty-state" style="grid-column:1/-1">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M8 15c1.2 1 2.6 1.5 4 1.5s2.8-.5 4-1.5"/></svg>
      <p>No vehicles match these filters yet. Try widening your search.</p>
    </div>`;
  initReveal();
}

// fade-in on scroll
function initReveal(){
  const items = document.querySelectorAll('.reveal:not(.in)');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.12});
  items.forEach(i=>io.observe(i));
}

// nav + footer get injected here so we're not copy-pasting them into every page
function renderNavFooter(){
  const navHost = document.getElementById('site-nav');
  if(navHost){
    navHost.innerHTML = `
    <nav class="nav">
      <div class="container nav-inner">
        <a href="index.html" class="brand"><span class="mark">J</span>eddy Cars</a>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="inventory.html">Inventory</a>
          <a href="finance.html">Financing</a>
          <a href="compare.html">Compare</a>
          <a href="contact.html">Contact</a>
          ${AppState.user && AppState.user.role==='admin' ? '<a href="admin.html">Admin</a>' : ''}
        </div>
        <div class="nav-actions">
          <button class="icon-btn" onclick="toggleTheme()" aria-label="Toggle theme"><svg id="theme-icon" viewBox="0 0 24 24" fill="none" stroke-linecap="round">${AppState.theme==='dark'?ICONS.sun:ICONS.moon}</svg></button>
          <a class="icon-btn" href="compare.html" aria-label="Compare vehicles"><svg viewBox="0 0 24 24" fill="none">${ICONS.scale}</svg><span id="compare-badge" class="badge-count" style="display:none"></span></a>
          <a class="icon-btn" href="dashboard.html?tab=wishlist" aria-label="Wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor">${ICONS.heart}</svg><span id="wishlist-badge" class="badge-count" style="display:none"></span></a>
          <a class="icon-btn" href="${AppState.user? 'dashboard.html':'login.html'}" aria-label="Account"><svg viewBox="0 0 24 24" fill="none">${ICONS.user}</svg></a>
          <button class="icon-btn nav-toggle" onclick="document.getElementById('mnav').classList.toggle('show')" aria-label="Menu"><svg viewBox="0 0 24 24" fill="none">${ICONS.menu}</svg></button>
        </div>
      </div>
      <div id="mnav" class="container" style="display:none; padding-bottom:18px;">
        <div style="display:flex; flex-direction:column; gap:14px;">
          <a href="index.html">Home</a><a href="inventory.html">Inventory</a><a href="finance.html">Financing</a>
          <a href="compare.html">Compare</a><a href="contact.html">Contact</a><a href="dashboard.html">Dashboard</a>
        </div>
      </div>
    </nav>`;
    // toggle mobile nav visibility styling via JS since it's dynamically inserted
    const style = document.createElement('style');
    style.textContent = `#mnav.show{display:block !important;}`;
    document.head.appendChild(style);
  }

  const footHost = document.getElementById('site-footer');
  if(footHost){
    footHost.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <div class="brand" style="margin-bottom:16px;"><span class="mark">J</span>eddy Cars</div>
            <p style="color:var(--ink-dim); font-size:14px; line-height:1.7; max-width:280px;">Curated luxury and premium vehicles, transparent financing, and a buying experience built for people who don't have time to waste.</p>
            <div class="social-row" style="margin-top:20px;">
              <a class="icon-btn" href="#" aria-label="Instagram">IG</a>
              <a class="icon-btn" href="#" aria-label="Facebook">FB</a>
              <a class="icon-btn" href="#" aria-label="X / Twitter">X</a>
            </div>
          </div>
          <div class="footer-col"><h4>Shop</h4><ul>
            <li><a href="inventory.html">All Inventory</a></li>
            <li><a href="inventory.html?tag=new">New Arrivals</a></li>
            <li><a href="inventory.html?tag=bestseller">Bestsellers</a></li>
            <li><a href="compare.html">Compare Vehicles</a></li>
          </ul></div>
          <div class="footer-col"><h4>Company</h4><ul>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="finance.html">Financing</a></li>
            <li><a href="contact.html#faq">FAQ</a></li>
            <li><a href="login.html">Sign In</a></li>
          </ul></div>
          <div class="footer-col"><h4>Legal</h4><ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Warranty</a></li>
          </ul></div>
          <div class="footer-col"><h4>Visit Showroom</h4><ul>
            <li style="color:var(--ink-dim)">Central Business District<br>Abuja, Nigeria</li>
            <li><a href="tel:+2348121101146">0812 110 1146</a></li>
            <li><a href="mailto:jeddybackupgmail@gmail.com">jeddybackupgmail@gmail.com</a></li>
            <li style="color:var(--ink-dim)">Mon–Sat: 9:00 – 19:00</li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Jeddy Cars. All rights reserved.</span>
          <span>Built for the drive that matters.</span>
        </div>
      </div>
    </footer>
    <div id="cookie-banner">
      <div>
        <strong style="font-family:'Fraunces',serif; font-size:16px;">A note on cookies</strong>
        <p style="color:var(--ink-dim); font-size:13.5px; margin-top:8px; line-height:1.6;">We use cookies to remember your wishlist, comparisons, and preferences. No data is sold to third parties.</p>
      </div>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-gold btn-sm" onclick="acceptCookies()">Accept All</button>
        <button class="btn btn-ghost btn-sm" onclick="dismissCookies()">Dismiss</button>
      </div>
    </div>
    <button id="back-to-top" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Back to top">↑</button>
    <a class="whatsapp-float" href="https://wa.me/2348121101146" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32"><path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.34.653 4.527 1.789 6.393L4 29l7.822-1.75A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3zm5.995 17.09c-.276.777-1.372 1.464-2.24 1.65-.6.128-1.38.23-4.006-.86-3.363-1.394-5.53-4.822-5.698-5.045-.164-.223-1.362-1.816-1.362-3.462s.85-2.454 1.15-2.79c.3-.336.658-.42.877-.42.22 0 .438.002.63.012.202.011.475-.077.742.567.276.664.938 2.29 1.02 2.457.083.166.138.36.028.583-.11.223-.166.36-.328.554-.164.196-.343.436-.49.586-.164.166-.334.346-.144.68.192.335.853 1.406 1.83 2.28 1.257 1.122 2.318 1.47 2.652 1.634.336.166.53.14.727-.083.196-.223.84-.98 1.064-1.317.222-.336.446-.28.75-.168.307.112 1.94.916 2.273 1.082.335.166.556.25.638.39.083.14.083.804-.192 1.58z"/></svg>
    </a>
    <div class="chat-window" id="chat-window">
      <div class="chat-head"><span>Jeddy Concierge</span><button onclick="toggleChat()" style="background:none;border:none;color:var(--ink-dim)">✕</button></div>
      <div class="chat-body" id="chat-body">
        <div class="chat-msg bot">Hi! I'm the Jeddy Concierge. Ask me about financing, a specific model, or booking a test drive.</div>
      </div>
      <div class="chat-input-row">
        <input id="chat-text" type="text" placeholder="Type a message…" onkeydown="if(event.key==='Enter')sendChat()">
        <button onclick="sendChat()">Send</button>
      </div>
    </div>
    <button class="chat-launcher" onclick="toggleChat()" aria-label="Open live chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="#141110" stroke-width="1.6"><path d="M4 12c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1 0-2-.2-2.9-.5L5 21l1.6-3.9C5.3 15.7 4 14 4 12z"/></svg>
    </button>
    `;
  }
  updateBadges();

  // cookie consent
  const consent = Store.get('jc_cookie_consent', null);
  if(consent===null){ setTimeout(()=> document.getElementById('cookie-banner') && document.getElementById('cookie-banner').classList.add('show'), 1200); }
  // back to top
  window.addEventListener('scroll', ()=>{
    const btn = document.getElementById('back-to-top');
    if(btn) btn.classList.toggle('show', window.scrollY>500);
  });
}
function acceptCookies(){ Store.set('jc_cookie_consent', true); document.getElementById('cookie-banner').classList.remove('show'); }
function dismissCookies(){ Store.set('jc_cookie_consent', false); document.getElementById('cookie-banner').classList.remove('show'); }
function toggleChat(){ document.getElementById('chat-window').classList.toggle('show'); }
function sendChat(){
  const input = document.getElementById('chat-text');
  const body = document.getElementById('chat-body');
  const text = input.value.trim();
  if(!text) return;
  body.insertAdjacentHTML('beforeend', `<div class="chat-msg user">${text}</div>`);
  input.value='';
  body.scrollTop = body.scrollHeight;
  setTimeout(()=>{
    const replies = [
      "Great question — one of our finance specialists can get you an exact rate. Want me to book a call?",
      "That model is currently in stock. Would you like to schedule a test drive?",
      "I can pull up financing estimates for that — check out the Financing page for a live calculator.",
      "Our showroom is open Mon–Sat, 9:00–19:00. Happy to book an inspection slot for you."
    ];
    body.insertAdjacentHTML('beforeend', `<div class="chat-msg bot">${replies[Math.floor(Math.random()*replies.length)]}</div>`);
    body.scrollTop = body.scrollHeight;
  }, 700);
}

// the loading spinner on page load
function hideLoader(){
  const l = document.getElementById('page-loader');
  if(l) setTimeout(()=>l.classList.add('hide'), 350);
}

document.addEventListener('DOMContentLoaded', ()=>{
  applyTheme();
  renderNavFooter();
  initReveal();
  hideLoader();
  // set nav active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href').split('?')[0]===path) a.classList.add('active');
  });
});
