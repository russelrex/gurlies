import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Icon, Ph, Reveal,
  Header, ProductCard, Testimonials, CartDrawer,
  CATEGORIES, PRODUCTS, FILTERS, WHY, UNSPLASH,
} from './components';
import type { Product, CartItem } from './components';
import Cafe from './pages/Cafe';
import { ScrollToTop } from './ScrollToTop';
import {
  useTweaks, TweaksPanel, TweakSection, TweakText, TweakRadio, TweakToggle, TweakColor,
} from './tweaks';

/* ── Palette applicator ─────────────────────────────────────────────── */
function applyPalette(p: string | string[]) {
  if (!Array.isArray(p)) return;
  const [blush, cocoa, cream] = p;
  const r = document.documentElement.style;
  r.setProperty('--blush',      blush);
  r.setProperty('--blush-deep', `color-mix(in oklch, ${blush} 70%, ${cocoa})`);
  r.setProperty('--blush-soft', `color-mix(in oklch, ${blush} 35%, ${cream})`);
  r.setProperty('--cocoa',      cocoa);
  r.setProperty('--cocoa-2',    `color-mix(in oklch, ${cocoa} 78%, ${cream})`);
  r.setProperty('--cocoa-3',    `color-mix(in oklch, ${cocoa} 55%, ${cream})`);
  r.setProperty('--cream',      cream);
  r.setProperty('--cream-2',    `color-mix(in oklch, ${cream} 88%, ${cocoa})`);
  r.setProperty('--cream-3',    `color-mix(in oklch, ${cream} 78%, ${cocoa})`);
  r.setProperty('--nude',       `color-mix(in oklch, ${cream} 65%, ${blush})`);
  r.setProperty('--line',       `color-mix(in oklch, ${cocoa} 22%, ${cream})`);
  r.setProperty('--line-soft',  `color-mix(in oklch, ${cocoa} 10%, ${cream})`);
}

const PALETTES: Record<string, string[]> = {
  blush:  ['#e8b6b6', '#3a2a20', '#f5ede0'],
  rose:   ['#d99494', '#2e1f17', '#f3e6d8'],
  matcha: ['#a8b48a', '#2b2418', '#f1ebdd'],
  cocoa:  ['#876a55', '#231811', '#efe5d3'],
  peach:  ['#e8c2a0', '#352419', '#f6ecdb'],
};

const TWEAK_DEFAULTS = {
  headline:       'Curated Fits & Cozy Sips',
  headlineScript: 'stay awhile',
  subheadline:    'Thrifted fashion finds with café energy. Made in Lisbon, sourced from your favourite aunties.',
  palette:        ['#e8b6b6', '#3a2a20', '#f5ede0'] as string[],
  heroLayout:     'editorial',
  showBlobs:      true,
  scriptAccents:  true,
};

/* ── Hero ───────────────────────────────────────────────────────────── */
function Hero({ t }: { t: typeof TWEAK_DEFAULTS }) {
  const heroBg = t.heroLayout === 'editorial'
    ? <>
        <div className="hero__bg-img"><Ph variant="blush"  src={UNSPLASH.heroPortrait}  alt="Editorial fashion portrait" style={{ position: 'absolute', inset: 0 }} /></div>
        <div className="hero__bg-img"><Ph variant="coffee" src={UNSPLASH.heroFlatLay}   alt="Vintage apparel flat lay"   style={{ position: 'absolute', inset: 0 }} /></div>
        <div className="hero__bg-img"><Ph variant="nude"   src={UNSPLASH.heroBoutique}  alt="Curated clothing boutique"  style={{ position: 'absolute', inset: 0 }} /></div>
      </>
    : <div className="hero__bg-img" style={{ gridColumn: '1 / -1', gridRow: '1 / -1' }}>
        <Ph variant="cocoa" src={UNSPLASH.heroFull} alt="Full-bleed fashion editorial" style={{ position: 'absolute', inset: 0 }} />
      </div>;
  const words = t.headline.split(' ');
  return (
    <section className="hero" id="shop">
      <div className="hero__bg">{heroBg}</div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">Hey Gurlies! · est. 2024 · Lisbon</div>
          <h1>
            {words.slice(0, -1).join(' ')}{' '}
            <i>{words.slice(-1)}</i>
            {t.scriptAccents && (
              <><br /><span className="script">— {t.headlineScript}.</span></>
            )}
          </h1>
          <p className="hero__sub">{t.subheadline}</p>
          <div className="hero__ctas">
            <button className="btn btn--primary">
              Shop Collection <Icon name="arrow" size={16} sw={1.8} />
            </button>
            <Link className="btn btn--ghost" to="/cafe">Visit the Café</Link>
          </div>
        </div>
        <div className="hero__meta">
          <div className="hero__meta-card">
            <span className="script">Sunday Drop</span>
            <b>Vintage Knitwear</b>
            <p>32 one-of-one pieces. Live this Sunday at 10am — set a quiet alarm.</p>
          </div>
          <div className="hero__meta-card" style={{ marginTop: -6 }}>
            <span className="script">In the café</span>
            <b>Oat Matcha · €4.20</b>
            <p>Made with single-origin matcha and a little too much patience.</p>
          </div>
        </div>
      </div>
      <div className="hero__scroll">scroll · keep going</div>
    </section>
  );
}

/* ── Categories ─────────────────────────────────────────────────────── */
function Categories() {
  return (
    <section className="sec" id="new-arrivals">
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            Shop the<br />
            <i>closet, the café,</i><br />
            <span className="script">&amp; everything in between.</span>
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">Six aisles · One vibe</span>
            From dresses your aunt almost kept to ceramic mugs we glaze ourselves. Browse by feeling.
          </div>
        </Reveal>
        <Reveal className="cats">
          {CATEGORIES.map((c, i) => (
            <a key={c.id} href={`#${c.id}`}
               className={`cat cat--${c.size}`}
               style={{ animationDelay: `${i * 60}ms` } as CSSProperties}>
              <div className="cat__img">
                <Ph variant={c.variant} src={c.img} alt={c.alt}
                    style={{ position: 'absolute', inset: 0 }} />
              </div>
              {c.tag && <span className="cat__tag">{c.tag}</span>}
              <div className="cat__body">
                <div>
                  <div className="cat__name">{c.name}</div>
                  <div className="cat__count">{c.count}</div>
                </div>
                <span className="cat__arr"><Icon name="arrow" size={16} sw={1.8} /></span>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── New Arrivals ───────────────────────────────────────────────────── */
function NewArrivals({ wishlist, onWish, onAdd }: {
  wishlist: Set<string>; onWish: (id: string) => void; onAdd: (p: Product) => void;
}) {
  const [active, setActive] = useState('all');
  const items = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.filter === active);
  return (
    <section className="sec" style={{ paddingTop: 40 }}>
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            New in this<br /><i>week</i> <span className="script">— go on, peek.</span>
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">8 fresh pieces · Hover for the alt</span>
            Restock arrives Friday at 6pm. If it's not on the rail, it's in someone's tote.
          </div>
        </Reveal>
        <Reveal>
          <div className="filters">
            {FILTERS.map(f => (
              <button key={f.id} data-active={active === f.id ? '1' : '0'}
                      onClick={() => setActive(f.id)}>{f.label}</button>
            ))}
            <a className="sec__link" href="#shop" style={{ marginLeft: 'auto', alignSelf: 'center' }}>
              View all 184 pieces <Icon name="arrow" size={14} sw={1.8} />
            </a>
          </div>
        </Reveal>
        <Reveal className="products">
          {items.map(p => (
            <ProductCard key={p.id} p={p}
                         wished={wishlist.has(p.id)}
                         onWish={onWish}
                         onAdd={onAdd} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Lifestyle split ────────────────────────────────────────────────── */
function LifestyleSplit({ scriptAccents }: { scriptAccents: boolean }) {
  return (
    <section className="sec" id="lifestyle" style={{ background: 'var(--cream-2)' }}>
      <div className="container split">
        {scriptAccents && (
          <>
            <span className="split__script" style={{ top: -10, left: '44%' }}>two halves,</span>
            <span className="split__script" style={{ top: 60, left: '52%', fontSize: 64, color: 'var(--cocoa-3)' }}>one mood.</span>
          </>
        )}
        <Reveal className="split__col split__col--apparel">
          <Ph variant="blush" src={UNSPLASH.splitApparel} alt="Editorial apparel still life" />
          <div className="split__caption">
            <span className="num">01</span>
            <div>
              <h3>The closet, hand-curated.</h3>
              <p>Every piece is sourced, mended, and styled before it goes on the rail. No bulk lots, no surprises — only the ones we'd wear home.</p>
              <a className="sec__link" href="#shop" style={{ marginTop: 16, display: 'inline-flex' }}>
                Explore the closet <Icon name="arrow" size={14} sw={1.8} />
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal className="split__col split__col--cafe" delay={120}>
          <div className="split__caption">
            <span className="num">02</span>
            <div>
              <h3>The café, upstairs.</h3>
              <p>Oat matcha, vinyl, and a 6-stool counter where strangers become group-chat regulars. Open daily, 8am to 7pm.</p>
              <Link className="sec__link" to="/cafe" style={{ marginTop: 16, display: 'inline-flex' }}>
                Find the café <Icon name="pin" size={14} sw={1.8} />
              </Link>
            </div>
          </div>
          <Ph variant="coffee" src={UNSPLASH.splitCafe} alt="Cozy café interior" />
          <Ph variant="nude"   src={UNSPLASH.splitLatte} alt="Latte pour-over moment" style={{ aspectRatio: '5/3' }} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Why Hey Gurlies ────────────────────────────────────────────────── */
function Why() {
  return (
    <section className="sec" id="about">
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            Why <span className="script">Hey Gurlies</span>?<br />
            <i>Five reasons,</i> none of them filler.
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">The honest version</span>
            We didn't start a thrift store to be a brand. We started a brand because the thrift store needed a name.
          </div>
        </Reveal>
        <Reveal className="why">
          {WHY.map(w => (
            <div key={w.num} className="why__card">
              <div className="why__num">{w.num} / 05</div>
              <div className="why__body">{w.body}</div>
              <div className="why__title">{w.title}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── Newsletter ─────────────────────────────────────────────────────── */
function Newsletter({ showBlobs }: { showBlobs: boolean }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ kind: 'idle', msg: '' });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setState({ kind: 'err', msg: '→ that doesn\'t look like an email, gurl' });
      return;
    }
    setState({ kind: 'ok', msg: `→ welcome to the club — check ${email} for your 10% code` });
    setEmail('');
  };
  return (
    <section className="news">
      {showBlobs && (
        <div className="news__blobs">
          <span className="news__blob news__blob--1" />
          <span className="news__blob news__blob--2" />
          <span className="news__blob news__blob--3" />
        </div>
      )}
      <div className="container news__inner">
        <Reveal>
          <h2>
            Join the <span className="script">gurlies</span><br />
            <i>club.</i>
          </h2>
          <p className="news__sub">
            Early access to the Sunday drop, an open invite to trade-in night, and €4 oat matcha on your birthday. No spam — we hate it too.
          </p>
          <form className="news__form" onSubmit={submit}>
            <input
              type="email"
              placeholder="your.email@thecafe.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (state.kind !== 'idle') setState({ kind: 'idle', msg: '' }); }}
              aria-label="Email address"
            />
            <button type="submit" className="btn btn--dark btn--sm">
              Join the club <Icon name="arrow" size={14} sw={1.8} />
            </button>
          </form>
          <div className={`news__msg ${state.kind === 'err' ? 'news__msg--err' : state.kind === 'ok' ? 'news__msg--ok' : ''}`}>
            {state.msg}
          </div>
          <div className="news__perks">
            <span>10% off your first piece</span>
            <span>Sunday drop early access</span>
            <span>Café birthday matcha</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot__top">
          <div>
            <img className="foot__brand-logo" src="/heygurlies_logo.png" alt="Hey Gurlies!" />
            <p className="foot__brand-line">Curated thrift fashion + the slowest café in Lisbon. Sip, style &amp; stay awhile.</p>
            <div className="foot__social">
              <a aria-label="Instagram"><Icon name="ig" size={16} /></a>
              <a aria-label="TikTok"><Icon name="tiktok" size={16} /></a>
              <a aria-label="Pinterest"><Icon name="pin" size={16} /></a>
            </div>
          </div>
          <div className="foot__col">
            <h4>Shop</h4>
            <ul>
              <li><a>New Arrivals</a></li>
              <li><a>Tops &amp; Knits</a></li>
              <li><a>Dresses</a></li>
              <li><a>Vintage Finds</a></li>
              <li><a>Café Corner</a></li>
              <li><a>Gift Cards</a></li>
            </ul>
          </div>
          <div className="foot__col">
            <h4>Brand</h4>
            <ul>
              <li><a>Our Story</a></li>
              <li><a>Sustainability</a></li>
              <li><a>Journal</a></li>
              <li><a>Trade-in Night</a></li>
              <li><a>Press</a></li>
            </ul>
          </div>
          <div className="foot__col">
            <h4>Help</h4>
            <ul>
              <li><a>Shipping</a></li>
              <li><a>Returns</a></li>
              <li><a>Size Guide</a></li>
              <li><a>FAQ</a></li>
              <li><a>Contact</a></li>
            </ul>
          </div>
          <div className="foot__col">
            <h4>The Café</h4>
            <p className="foot__cafe-line">R. da Boavista 84<br />1200-067 Lisbon, PT</p>
            <dl className="foot__cafe-hours">
              <dt>Mon–Fri</dt><dd>08:00 — 19:00</dd>
              <dt>Saturday</dt><dd>09:00 — 20:00</dd>
              <dt>Sunday</dt><dd>10:00 — 17:00</dd>
            </dl>
            <form style={{ marginTop: 18, display: 'flex', gap: 6 }} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="email for café news"
                style={{
                  flex: 1, height: 36, padding: '0 12px',
                  background: 'transparent',
                  border: '1px solid color-mix(in oklch, currentColor 25%, transparent)',
                  borderRadius: 999, color: 'inherit', fontFamily: 'inherit', fontSize: 12, outline: 'none',
                }}
              />
              <button type="submit" className="btn btn--blush btn--sm">Join</button>
            </form>
          </div>
        </div>
        <div className="foot__bottom">
          <span>© 2026 Hey Gurlies! · Sip, Style &amp; Stay Awhile</span>
          <div className="foot__bottom-links">
            <a>Privacy</a><a>Terms</a><a>Cookies</a><a>Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Toast ──────────────────────────────────────────────────────────── */
function Toast({ msg, show }: { msg: string; show: boolean }) {
  return (
    <div className="toast" data-show={show ? '1' : '0'}>
      <i>✦</i> {msg}
    </div>
  );
}

/* ── App ────────────────────────────────────────────────────────────── */
export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState(() => new Set<string>());
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { applyPalette(t.palette); }, [t.palette]);

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(s => ({ ...s, show: false })), 2200);
  };

  const onWish = useCallback((id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast('Removed from wishlist'); }
      else { next.add(id); showToast('Added to wishlist ♡'); }
      return next;
    });
  }, []);

  const onAdd = useCallback((p: Product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, brand: p.brand, price: p.price, v: p.v, qty: 1 }];
    });
    showToast(`Added · ${p.name}`);
  }, []);

  const onQty = useCallback((id: string, delta: number) => {
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0));
  }, []);

  const onRemove = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast('Removed from bag');
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero t={t} />
            <Categories />
            <NewArrivals wishlist={wishlist} onWish={onWish} onAdd={onAdd} />
            <LifestyleSplit scriptAccents={t.scriptAccents} />
            <Why />
            <Testimonials />
            <Newsletter showBlobs={t.showBlobs} />
          </main>
        } />
        <Route path="/cafe" element={
          <main>
            <Cafe />
          </main>
        } />
      </Routes>
      <Footer />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)}
                  items={cart} onQty={onQty} onRemove={onRemove} />
      <Toast msg={toast.msg} show={toast.show} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor label="Theme" value={t.palette}
                    options={Object.values(PALETTES)}
                    onChange={(v) => setTweak('palette', v)} />
        <TweakSection label="Hero" />
        <TweakText label="Headline" value={t.headline}
                   onChange={(v) => setTweak('headline', v)} />
        <TweakText label="Script accent" value={t.headlineScript}
                   onChange={(v) => setTweak('headlineScript', v)} />
        <TweakRadio label="Layout" value={t.heroLayout}
                    options={['editorial', 'fullbleed']}
                    onChange={(v) => setTweak('heroLayout', v)} />
        <TweakSection label="Decor" />
        <TweakToggle label="Script accents" value={t.scriptAccents}
                     onChange={(v) => setTweak('scriptAccents', v)} />
        <TweakToggle label="Newsletter blobs" value={t.showBlobs}
                     onChange={(v) => setTweak('showBlobs', v)} />
      </TweaksPanel>
    </BrowserRouter>
  );
}
