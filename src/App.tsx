import { useState, useEffect, useRef, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {
  Icon, Ph, Reveal,
  Header, CartDrawer, FreshFindsGrid,
  BOUTIQUE_CATEGORIES,
  CAFE_CATEGORIES, WHY, UNSPLASH, CAFE_IMAGES,
} from './components';
import type { CartItem, CategoryItem } from './components';
import Cafe from './pages/Cafe';
import Boutique from './pages/Boutique';
import About from './pages/About';
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
  headline:       'Fashion, Coffee, & Cozy Moments.',
  headlineScript: 'stay awhile',
  subheadline:    "Women's Wear • Men's Wear • Café",
  palette:        ['#e8b6b6', '#3a2a20', '#f5ede0'] as string[],
  heroLayout:     'editorial',
  showBlobs:      true,
  scriptAccents:  false,
};

/* ── Hero ───────────────────────────────────────────────────────────── */
function Hero({ t }: { t: typeof TWEAK_DEFAULTS }) {
  const heroBg = t.heroLayout === 'editorial'
    ? <>
        <div className="hero__bg-img"><Ph variant="blush"  src="/home/home01.png" alt="Hey Gurlies boutique fashion" style={{ position: 'absolute', inset: 0 }} /></div>
        <div className="hero__bg-img"><Ph variant="coffee" src={UNSPLASH.heroFlatLay}   alt="Vintage apparel flat lay"   style={{ position: 'absolute', inset: 0 }} /></div>
        <div className="hero__bg-img"><Ph variant="nude"   src="/home/home_male0.png" alt="Men's clothing at Hey Gurlies" style={{ position: 'absolute', inset: 0 }} /></div>
      </>
    : <div className="hero__bg-img" style={{ gridColumn: '1 / -1', gridRow: '1 / -1' }}>
        <Ph variant="cocoa" src={UNSPLASH.heroFull} alt="Full-bleed fashion editorial" style={{ position: 'absolute', inset: 0 }} />
      </div>;
  return (
    <section className="hero" id="shop">
      <div className="hero__bg">{heroBg}</div>
      <div className="container hero__inner">
        <div className="hero__copy">
          <div className="hero__eyebrow">Hey Gurlies! · Decolores Village, Pangantucan</div>
          <h1>
            Fashion, Coffee,<br />
            <span className="script">&amp; Cozy Moments.</span>
          </h1>
          <p className="hero__sub">{t.subheadline}</p>
          <div className="hero__ctas">
            <Link className="btn btn--primary" to="/boutique">
              Shop the Boutique <Icon name="arrow" size={16} sw={1.8} />
            </Link>
            <Link className="btn btn--ghost" to="/cafe">Visit the Café</Link>
          </div>
        </div>
        {/* <div className="hero__meta">
          <div className="hero__meta-card">
            <span className="script">The boutique</span>
            <b>Women's &amp; Men's Wear</b>
            <p>Curated styles for women and men. Handpicked pieces you'll love to wear again and again.</p>
          </div>
          <div className="hero__meta-card" style={{ marginTop: -6 }}>
            <span className="script">The café</span>
            <b>Coffee &amp; Sweet Treats</b>
            <p>Coffee, refreshers, and sweet treats. A cozy place to slow down, catch up, and stay awhile.</p>
          </div>
        </div> */}
      </div>
      <div className="hero__scroll">scroll · keep going</div>
    </section>
  );
}

/* ── Category card helper ───────────────────────────────────────────── */
function CategoryCard({ c, to, delay }: {
  c: CategoryItem; to: string; delay: number;
}) {
  const inner = (
    <>
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
    </>
  );
  const cls = `cat cat--${c.size}`;
  const style = { animationDelay: `${delay}ms` } as CSSProperties;
  return to.startsWith('/')
    ? <Link to={to} className={cls} style={style}>{inner}</Link>
    : <a href={to} className={cls} style={style}>{inner}</a>;
}

/* ── Boutique + Café categories ─────────────────────────────────────── */
function ShopStructure() {
  return (
    <section className="sec" id="boutique">
      <div className="container">
        <Reveal className="dual-cards">
          <Link to="/boutique" className="dual-card dual-card--boutique">
            <span className="dual-card__eyebrow">Shop the boutique</span>
            <h3 className="dual-card__title">Women's &amp; Men's Clothing</h3>
            <ul className="dual-card__list">
              <li>Women's Clothing</li>
              <li>Men's Clothing</li>
              <li>Accessories</li>
            </ul>
            <span className="dual-card__cta">Shop the Boutique <Icon name="arrow" size={14} sw={1.8} /></span>
          </Link>
          <Link to="/cafe" className="dual-card dual-card--cafe">
            <span className="dual-card__eyebrow">Visit the café</span>
            <h3 className="dual-card__title">Coffee, Refreshers &amp; Treats</h3>
            <ul className="dual-card__list">
              <li>Coffee</li>
              <li>Refreshers</li>
              <li>Sweet Treats</li>
            </ul>
            <span className="dual-card__cta">Visit the Café <Icon name="arrow" size={14} sw={1.8} /></span>
          </Link>
        </Reveal>

        <Reveal className="dept" delay={60}>
          <div className="dept__head">
            <span className="dept__brand">Hey Gurlies</span>
            <h2 className="dept__title">Boutique</h2>
            <p className="dept__sub">Curated styles for women and men. Handpicked pieces you'll love to wear again and again.</p>
          </div>
          <div className="cats cats--3">
            {BOUTIQUE_CATEGORIES.map((c, i) => (
              <CategoryCard key={c.id} c={c} to="/boutique#new-arrivals" delay={i * 60} />
            ))}
          </div>
        </Reveal>

        <Reveal className="fresh-finds" delay={80} id="new-arrivals">
          <div className="dept__head">
            <span className="dept__brand">Hey Gurlies</span>
            <h2 className="dept__title">Fresh Finds</h2>
            <p className="dept__sub">Discover the latest additions to our collection.</p>
          </div>
          <FreshFindsGrid />
          <div className="dept__cta">
            <Link className="sec__link" to="/boutique#new-arrivals">
              View all new arrivals <Icon name="arrow" size={14} sw={1.8} />
            </Link>
          </div>
        </Reveal>

        <Reveal className="dept dept--cafe" delay={100} id="cafe-preview">
          <div className="dept__head">
            <span className="dept__brand">Hey Gurlies</span>
            <h2 className="dept__title">Café</h2>
            <p className="dept__sub">Coffee, refreshers, and sweet treats. A cozy place to slow down, catch up, and stay awhile.</p>
          </div>
          <div className="cats cats--3">
            {CAFE_CATEGORIES.map((c, i) => (
              <CategoryCard key={c.id} c={c} to="/cafe#menu" delay={i * 60} />
            ))}
          </div>
          <div className="dept__cta">
            <Link className="btn btn--primary" to="/cafe#menu">
              View Menu <Icon name="arrow" size={16} sw={1.8} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Lifestyle split ────────────────────────────────────────────────── */
export function LifestyleSplit({ scriptAccents }: { scriptAccents: boolean }) {
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
              <h3>The boutique, hand-curated.</h3>
              <p>Curated styles for women and men. Handpicked pieces you'll love to wear again and again.</p>
              <Link className="sec__link" to="/boutique" style={{ marginTop: 16, display: 'inline-flex' }}>
                Shop the boutique <Icon name="arrow" size={14} sw={1.8} />
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal className="split__col split__col--cafe" delay={120}>
          <div className="split__caption">
            <span className="num">02</span>
            <div>
              <h3>The café, downstairs.</h3>
              <p>Coffee, refreshers, and sweet treats. A cozy place to slow down, catch up, and stay awhile. Open daily, 8am to 8pm.</p>
              <Link className="sec__link" to="/cafe#menu" style={{ marginTop: 16, display: 'inline-flex' }}>
                View the menu <Icon name="pin" size={14} sw={1.8} />
              </Link>
            </div>
          </div>
          <Ph variant="coffee" src={CAFE_IMAGES.interior} alt="Hey Gurlies café interior" />
          <Ph variant="nude"   src={CAFE_IMAGES.latte} alt="Coffee at Hey Gurlies" style={{ aspectRatio: '5/3' }} />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Why Hey Gurlies ────────────────────────────────────────────────── */
export function Why() {
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
export function Newsletter({ showBlobs }: { showBlobs: boolean }) {
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
    <footer className="foot" id="contact">
      <div className="container">
        <div className="foot__top">
          <div>
            <img className="foot__brand-logo" src="/heygurlies_logo.png" alt="Hey Gurlies!" />
            <p className="foot__brand-line">Fashion, coffee &amp; cozy moments in Pangantucan. A boutique and café under one roof — sip, style &amp; stay awhile.</p>
            <div className="foot__social">
              <a aria-label="Instagram"><Icon name="ig" size={16} /></a>
              <a aria-label="TikTok"><Icon name="tiktok" size={16} /></a>
              <a aria-label="Pinterest"><Icon name="pin" size={16} /></a>
            </div>
          </div>
          <div className="foot__col">
            <h4>Boutique</h4>
            <ul>
              <li><Link to="/boutique#womens">Women's Clothing</Link></li>
              <li><Link to="/boutique#mens">Men's Clothing</Link></li>
              <li><Link to="/boutique#accessories">Accessories</Link></li>
              <li><Link to="/boutique#new-arrivals">New Arrivals</Link></li>
            </ul>
          </div>
          <div className="foot__col">
            <h4>Visit the Café</h4>
            <ul>
              <li><Link to="/cafe#menu">Coffee</Link></li>
              <li><Link to="/cafe#menu">Refreshers</Link></li>
              <li><Link to="/cafe#menu">Sweet Treats</Link></li>
              <li><Link to="/cafe#menu" className="foot__menu-link">View Menu →</Link></li>
            </ul>
          </div>
          <div className="foot__col">
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/boutique">The Boutique</Link></li>
              <li><a href="/cafe">The Café</a></li>
            </ul>
          </div>
          <div className="foot__col">
            <h4>Contact</h4>
            <p className="foot__cafe-line">
              Decolores Village, Poblacion<br />
              Pangantucan, Bukidnon
            </p>
            <dl className="foot__cafe-hours">
              <dt>Opens</dt><dd>Monday – Sunday</dd>
              <dt>Hours</dt><dd>8:00 AM – 8:00 PM</dd>
            </dl>
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
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { applyPalette(t.palette); }, [t.palette]);

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(s => ({ ...s, show: false })), 2200);
  };

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
            <ShopStructure />
            {/* <LifestyleSplit scriptAccents={t.scriptAccents} /> */}
            {/* <Why /> */}
            {/* <Testimonials /> */}
            {/* <Newsletter showBlobs={t.showBlobs} /> */}
          </main>
        } />
        <Route path="/boutique" element={
          <main>
            <Boutique />
          </main>
        } />
        <Route path="/about" element={
          <main>
            <About />
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
