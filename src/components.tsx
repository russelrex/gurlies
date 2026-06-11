import { useState, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode, ElementType } from 'react';

/* ── Icons ──────────────────────────────────────────────────────────── */
type IconName = 'search' | 'bag' | 'user' | 'heart' | 'x' | 'arrow' | 'arrowUp' | 'chevL' | 'chevR' | 'plus' | 'minus' | 'ig' | 'tiktok' | 'pin' | 'spark';

export const Icon = ({ name, size = 18, fill = 'none', stroke = 'currentColor', sw = 1.5 }: {
  name: IconName; size?: number; fill?: string; stroke?: string; sw?: number;
}) => {
  const paths: Record<IconName, ReactNode> = {
    search:  <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    bag:     <><path d="M5 7h14l-1.2 13.2A2 2 0 0 1 15.8 22H8.2a2 2 0 0 1-2-1.8L5 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>,
    user:    <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
    heart:   <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />,
    x:       <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
    arrow:   <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    arrowUp: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    chevL:   <path d="m14 6-6 6 6 6" />,
    chevR:   <path d="m10 6 6 6-6 6" />,
    plus:    <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus:   <path d="M5 12h14" />,
    ig:      <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>,
    tiktok:  <path d="M15 4v9.5a3.5 3.5 0 1 1-3.5-3.5M15 4a4 4 0 0 0 4 4" />,
    pin:     <><circle cx="12" cy="11" r="3" /><path d="M12 21c-4-5-7-8.5-7-12a7 7 0 0 1 14 0c0 3.5-3 7-7 12Z" /></>,
    spark:   <path d="M12 3v6m0 6v6M3 12h6m6 0h6M6 6l3 3m6 6 3 3M6 18l3-3m6-6 3-3" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}
         stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true">
      {paths[name]}
    </svg>
  );
};

/* ── Unsplash — clothing & apparel (verified CDN URLs) ───────────────── */
const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const UNSPLASH = {
  heroPortrait:  U('photo-1515372039744-b8f02a3ae446'),
  heroFlatLay:   U('photo-1445205170230-053b83016050', 900),
  heroBoutique:  U('photo-1617137968427-85924c800a22', 900),
  heroFull:      U('photo-1583743814966-8936f5b7be1a'),
  catTops:       U('photo-1576566588028-4147f3842f27', 900),
  catDresses:    U('photo-1496747611176-843222e1e57c', 900),
  catVintage:    U('photo-1551028719-00167b16eac5', 900),
  catCafe:       U('photo-1618354691373-d851c5c3a990', 900),
  catNew:        U('photo-1591047139829-d91aecb6caea', 900),
  catBest:       U('photo-1556909114-f6e7ad7d3136', 900),
  splitApparel:  U('photo-1445205170230-053b83016050', 1000),
  splitCafe:     U('photo-1554118811-1e0d58224f24', 900),
  splitLatte:    U('photo-1558618666-fcd25c85cd64', 700),
  prodCardigan:  U('photo-1576566588028-4147f3842f27', 700),
  prodDress:     U('photo-1496747611176-843222e1e57c', 700),
  prodKnit:      U('photo-1434389677669-e08b4cac3105', 700),
  prodSkirt:     U('photo-1551028719-00167b16eac5', 700),
  prodCami:      U('photo-1515372039744-b8f02a3ae446', 700),
  prodTrouser:   U('photo-1583743814966-8936f5b7be1a', 700),
  prodBlouse:    U('photo-1617137968427-85924c800a22', 700),
  prodTee:       U('photo-1521572163474-6864f9cf17ab', 700),
  prodAlt1:      U('photo-1591047139829-d91aecb6caea', 700),
  prodAlt2:      U('photo-1556909114-f6e7ad7d3136', 700),
  prodAlt3:      U('photo-1618354691373-d851c5c3a990', 700),
  prodAlt4:      U('photo-1487412720507-e7ab37603c6f', 700),
  prodAlt5:      U('photo-1558618666-fcd25c85cd64', 700),
  prodAlt6:      U('photo-1445205170230-053b83016050', 700),
  prodAlt7:      U('photo-1496747611176-843222e1e57c', 700),
  prodAlt8:      U('photo-1576566588028-4147f3842f27', 700),
  avatarBlush:   U('photo-1534528741775-53994a69daeb', 200),
  avatarNude:    U('photo-1524504388940-b1c1722653e1', 200),
  avatarCoffee:  U('photo-1544005313-94ddf0286df2', 200),
  avatarOlive:   U('photo-1506794778202-cad84cf45f1d', 200),
  emptyBag:      U('photo-1445205170230-053b83016050', 400),
} as const;

/* ── Placeholder / Unsplash image ───────────────────────────────────── */
type PhVariant = 'nude' | 'blush' | 'cocoa' | 'coffee' | 'olive';

export const Ph = ({ label, variant = 'nude', angle = 135, style, children, src, alt }: {
  label?: string; variant?: PhVariant; angle?: number; style?: CSSProperties; children?: ReactNode;
  src?: string; alt?: string;
}) => (
  <div className={`ph ph--${variant}${src ? ' ph--img' : ''}`}
       style={{ '--ph-angle': `${angle}deg`, ...style } as CSSProperties}>
    {src && (
      <img className="ph__img" src={src} alt={alt ?? label ?? ''} loading="lazy" decoding="async" />
    )}
    {children}
    {label && !src && <span className="ph__lbl">{label}</span>}
  </div>
);

/* ── Reveal on scroll ───────────────────────────────────────────────── */
export const Reveal = ({ children, delay = 0, as: Tag = 'div' as ElementType, className = '', ...rest }: {
  children?: ReactNode; delay?: number; as?: ElementType; className?: string; [key: string]: unknown;
}) => {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} data-in={shown ? '1' : '0'}
         style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
};

/* ── Data ───────────────────────────────────────────────────────────── */
export const CATEGORIES = [
  { id: 'tops',    name: 'Tops',          count: '48 pieces',   size: 'lg', variant: 'blush'  as PhVariant, tag: 'Most loved', angle: 130, img: UNSPLASH.catTops,    alt: 'Curated tops on clothing rack' },
  { id: 'dresses', name: 'Dresses',       count: '32 pieces',   size: 'md', variant: 'nude'   as PhVariant, angle: 110, img: UNSPLASH.catDresses, alt: 'Flowing dress editorial' },
  { id: 'vintage', name: 'Vintage Finds', count: 'Drop weekly', size: 'md', variant: 'cocoa'  as PhVariant, tag: 'One of one', angle: 145, img: UNSPLASH.catVintage, alt: 'Vintage thrifted apparel' },
  { id: 'cafe',    name: 'Café Corner',   count: 'Cups & tote', size: 'sm', variant: 'coffee' as PhVariant, angle: 100, img: UNSPLASH.catCafe,    alt: 'Apparel and lifestyle accessories' },
  { id: 'new',     name: 'New Arrivals',  count: 'Just in',     size: 'sm', variant: 'olive'  as PhVariant, angle: 120, img: UNSPLASH.catNew,     alt: 'New arrival fashion look' },
  { id: 'best',    name: 'Best Sellers',  count: 'Re-stocked',  size: 'sm', variant: 'blush'  as PhVariant, angle: 150, img: UNSPLASH.catBest,    alt: 'Best-selling outfit editorial' },
];

export interface Product {
  id: string; name: string; brand: string; price: number; was: number | null;
  tag: string | null; filter: string; v: PhVariant; v2: PhVariant; swatches: string[];
  img: string; img2: string; imgAlt: string; imgAlt2: string;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Strawberry Milk Cardigan', brand: 'Reclaimed · Y2K', price: 48, was: null, tag: 'ONE OF ONE', filter: 'tops',    v: 'blush',  v2: 'nude',  swatches: ['#e8b6b6','#d9c6b6'], img: UNSPLASH.prodCardigan, img2: UNSPLASH.prodAlt1, imgAlt: 'Blush knit cardigan',       imgAlt2: 'Soft knit detail' },
  { id: 'p2', name: 'Latte Slip Dress',         brand: 'Vintage · 90s',   price: 62, was: 84,   tag: 'MARKDOWN',   filter: 'dresses', v: 'nude',   v2: 'cocoa', swatches: ['#d9c6b6','#776355'], img: UNSPLASH.prodDress,    img2: UNSPLASH.prodAlt2, imgAlt: 'Nude slip dress',           imgAlt2: 'Dress on hanger' },
  { id: 'p3', name: 'Mocha Wrap Knit',          brand: 'Thrifted · Wool', price: 54, was: null, tag: 'NEW',        filter: 'tops',    v: 'coffee', v2: 'olive', swatches: ['#876a55','#a4a685'], img: UNSPLASH.prodKnit,     img2: UNSPLASH.prodAlt3, imgAlt: 'Mocha wrap knit top',       imgAlt2: 'Minimal knit styling' },
  { id: 'p4', name: 'Espresso Pleated Skirt',   brand: 'Vintage · Silk',  price: 38, was: null, tag: null,         filter: 'vintage', v: 'cocoa',  v2: 'nude',  swatches: ['#3a2a20','#d9c6b6'], img: UNSPLASH.prodSkirt,    img2: UNSPLASH.prodAlt4, imgAlt: 'Dark pleated skirt',        imgAlt2: 'Vintage skirt flat lay' },
  { id: 'p5', name: 'Cream Puff Cami',          brand: 'Y2K · Reclaimed', price: 28, was: 44,   tag: 'MARKDOWN',   filter: 'tops',    v: 'nude',   v2: 'blush', swatches: ['#e8d9c6','#e8b6b6'], img: UNSPLASH.prodCami,     img2: UNSPLASH.prodAlt5, imgAlt: 'Cream cami top',            imgAlt2: 'Editorial outfit' },
  { id: 'p6', name: 'Matcha Linen Trouser',     brand: 'Vintage · 70s',   price: 58, was: null, tag: 'ONE OF ONE', filter: 'vintage', v: 'olive',  v2: 'nude',  swatches: ['#a4a685','#d9c6b6'], img: UNSPLASH.prodTrouser,  img2: UNSPLASH.prodAlt6, imgAlt: 'Olive linen trousers',      imgAlt2: 'Vintage trouser styling' },
  { id: 'p7', name: 'Honey Bow Blouse',         brand: 'Reclaimed',       price: 42, was: null, tag: 'NEW',        filter: 'tops',    v: 'blush',  v2: 'cocoa', swatches: ['#e8b6b6','#3a2a20'], img: UNSPLASH.prodBlouse,   img2: UNSPLASH.prodAlt7, imgAlt: 'Honey-toned blouse',        imgAlt2: 'Fashion portrait' },
  { id: 'p8', name: 'Caramel Mini Tee',         brand: 'Café x Hey',      price: 24, was: null, tag: null,         filter: 'cafe',    v: 'coffee', v2: 'blush', swatches: ['#876a55','#e8b6b6'], img: UNSPLASH.prodTee,      img2: UNSPLASH.prodAlt8, imgAlt: 'Caramel graphic tee',       imgAlt2: 'Casual tee styling' },
];

export const FILTERS = [
  { id: 'all',     label: 'All Pieces' },
  { id: 'tops',    label: 'Tops' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'cafe',    label: 'Café Corner' },
];

export const WHY = [
  { num: '01', title: 'Hand-curated',      body: 'Every piece is sourced and styled by the Gurlies team — no bulk lots, no algorithms.' },
  { num: '02', title: 'Sip-priced',        body: 'Under-€80 for 80% of the closet. Vintage that fits a barista\'s budget.' },
  { num: '03', title: 'The café upstairs', body: 'Shop the rail, then linger over an oat matcha in our Lisbon flagship.' },
  { num: '04', title: 'A real community',  body: 'Trade-in nights, sample sales, and a 14k-strong group chat moderated by humans.' },
  { num: '05', title: 'Slow-fashion math', body: 'One thrifted dress saves 2,700L of water vs. fast fashion. Receipts on every tag.' },
];

export const TESTIMONIALS = [
  { quote: <>The cardigan I bought has compliments stitched into the seams. The café upstairs is my second living room. — <span className="script">obsessed.</span></>,
    by: 'Maeve · Porto',    meta: 'Verified — 4 orders', v: 'blush' as PhVariant, avatar: UNSPLASH.avatarBlush,  alt: 'Maeve' },
  { quote: <>I came for a thrifted Margiela tee and stayed for a 3-hour matcha. The whole brand feels <span className="script">like a Sunday.</span></>,
    by: 'Noor · Amsterdam', meta: 'Verified — 2 orders', v: 'nude' as PhVariant, avatar: UNSPLASH.avatarNude,   alt: 'Noor' },
  { quote: <>Every piece arrived wrapped in tissue and a hand-written note. The price tag still feels <span className="script">like a typo.</span></>,
    by: 'Leah · Berlin',    meta: 'Verified — 7 orders', v: 'coffee' as PhVariant, avatar: UNSPLASH.avatarCoffee, alt: 'Leah' },
  { quote: <>I joined the Gurlies group chat and made three real friends. Also the dress is <span className="script">unreal.</span></>,
    by: 'Sage · Lisbon',    meta: 'Verified — 3 orders', v: 'olive' as PhVariant, avatar: UNSPLASH.avatarOlive,  alt: 'Sage' },
  { quote: <>Returned a piece, got the refund in 36 hours and a voice note from a real human apologising. <span className="script">Who does that?</span></>,
    by: 'Kira · Stockholm', meta: 'Verified — 5 orders', v: 'blush' as PhVariant, avatar: UNSPLASH.avatarBlush,  alt: 'Kira' },
];

/* ── Header ─────────────────────────────────────────────────────────── */
export function Header({ cartCount, wishCount, onCart, onWish }: {
  cartCount: number; wishCount: number; onCart: () => void; onWish: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const navItems = ['Shop', 'Menu', 'Blog', 'New Arrivals', 'Vintage', 'Café', 'Journal', 'About'];
  return (
    <>
      <div className="hdr__marquee">
        <div className="hdr__marquee-track">
          {Array.from({ length: 2 }).flatMap((_, k) => [
            <span key={`a${k}`}>✦ Free shipping over €80</span>,
            <span key={`b${k}`}><em>—</em></span>,
            <span key={`c${k}`}>New thrift drop every Sunday 10am</span>,
            <span key={`d${k}`}><em>—</em></span>,
            <span key={`e${k}`}>Café open in Lisbon · 8am–7pm</span>,
            <span key={`f${k}`}><em>—</em></span>,
            <span key={`g${k}`}>Trade-in night — first Thursday of the month</span>,
            <span key={`h${k}`}><em>—</em></span>,
          ])}
        </div>
      </div>
      <header className="hdr" data-scrolled={scrolled ? '1' : '0'}>
        <div className="container hdr__bar">
          <a href="#" className="hdr__logo" aria-label="Hey Gurlies! home">
            <img className="hdr__logo-img" src="/heygurlies_logo.png" alt="Hey Gurlies!" />
          </a>
          <nav className="hdr__nav">
            {navItems.map(n => <a key={n} href={`#${n.toLowerCase().replace(/\s/g, '-')}`}>{n}</a>)}
          </nav>
          <div className="hdr__icons">
            <button aria-label="Search"><Icon name="search" /></button>
            <button aria-label="Account"><Icon name="user" /></button>
            <button aria-label="Wishlist" onClick={onWish}>
              <Icon name="heart" />
              {wishCount > 0 && <span className="hdr__cart-dot">{wishCount}</span>}
            </button>
            <button aria-label="Cart" onClick={onCart}>
              <Icon name="bag" />
              {cartCount > 0 && <span className="hdr__cart-dot">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

/* ── Product card ───────────────────────────────────────────────────── */
export function ProductCard({ p, wished, onWish, onAdd }: {
  p: Product; wished: boolean; onWish: (id: string) => void; onAdd: (p: Product) => void;
}) {
  const [added, setAdded] = useState(false);
  const tagCls = p.tag === 'NEW' ? 'prod__tag--new' : p.tag === 'ONE OF ONE' ? 'prod__tag--one' : '';
  const handleAdd = () => {
    onAdd(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };
  return (
    <article className="prod">
      <div className="prod__media">
        <Ph variant={p.v} src={p.img} alt={p.imgAlt} style={{ position: 'absolute', inset: 0 }} />
        <div className="prod__img-alt">
          <Ph variant={p.v2} src={p.img2} alt={p.imgAlt2} style={{ position: 'absolute', inset: 0 }} />
        </div>
        <div className="prod__tags">
          {p.tag && <span className={`prod__tag ${tagCls}`}>{p.tag}</span>}
        </div>
        <button className="prod__wish" data-on={wished ? '1' : '0'}
                aria-label="Toggle wishlist"
                onClick={() => onWish(p.id)}>
          <Icon name="heart" size={16} sw={1.6} />
        </button>
        <button className={`prod__quick${added ? ' added' : ''}`} onClick={handleAdd}>
          <Icon name={added ? 'spark' : 'plus'} size={14} sw={2} />
          {added ? 'Added to bag' : 'Quick add'}
        </button>
      </div>
      <div className="prod__info">
        <div>
          <div className="prod__name">{p.name}</div>
          <div className="prod__brand">{p.brand}</div>
          <div className="prod__swatches">
            {p.swatches.map((c, i) => <i key={i} style={{ background: c }} />)}
          </div>
        </div>
        <div className="prod__price">
          {p.was && <s>€{p.was}</s>}€{p.price}
        </div>
      </div>
    </article>
  );
}

/* ── Blog carousel ──────────────────────────────────────────────────── */
const BLOG_GAP = 16;

export const BLOG_PHOTOS = Array.from({ length: 15 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    id: `pic${n}`,
    src: `/blogs/pic${n}.jpg`,
    alt: `Hey Gurlies café and closet moments — photo ${i + 1}`,
  };
});

export function BlogCarousel() {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const recalc = () => {
      const w = window.innerWidth;
      setPerView(w < 760 ? 1 : w < 1100 ? 2 : 3);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);
  const max = Math.max(0, BLOG_PHOTOS.length - perView);
  const clamp = (n: number) => Math.max(0, Math.min(max, n));
  useEffect(() => { setIdx(i => Math.min(i, max)); }, [max]);
  const slideBasis = `calc((100% - ${(perView - 1) * BLOG_GAP}px) / ${perView})`;
  const offset = `calc(${-idx} * (${slideBasis} + ${BLOG_GAP}px))`;

  return (
    <section className="sec blog" id="blog">
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            Life at<br /><span className="script">Hey Gurlies.</span>
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">Shop · Sip · Stay awhile</span>
            Real moments from the rail, the counter, and the group chats that spill into Sunday.
          </div>
        </Reveal>
        <Reveal className="blog__viewport" delay={80}>
          <div className="blog__track" style={{ transform: `translateX(${offset})` }}>
            {BLOG_PHOTOS.map((photo) => (
              <figure key={photo.id} className="blog__slide" style={{ flexBasis: slideBasis }}>
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </Reveal>
        <div className="blog__nav">
          <span className="blog__count">{idx + 1} / {max + 1}</span>
          <div className="blog__nav-btns">
            <button className="blog__nav-btn" disabled={idx === 0}
                    onClick={() => setIdx(clamp(idx - 1))} aria-label="Previous photos">
              <Icon name="chevL" />
            </button>
            <button className="blog__nav-btn" disabled={idx === max}
                    onClick={() => setIdx(clamp(idx + 1))} aria-label="Next photos">
              <Icon name="chevR" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Testimonial carousel ───────────────────────────────────────────── */
export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const recalc = () => {
      const w = window.innerWidth;
      setPerView(w < 760 ? 1 : w < 1100 ? 2 : 3);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, []);
  const max = Math.max(0, TESTIMONIALS.length - perView);
  const clamp = (n: number) => Math.max(0, Math.min(max, n));
  const offset = `calc(${-idx} * ((100% - ${(perView - 1) * 20}px) / ${perView} + 20px))`;
  return (
    <section className="test" id="journal">
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            Notes from the<br /><span className="script">gurlies</span> club.
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">Real reviews · No incentives</span>
            What the regulars and the first-timers actually said.
          </div>
        </Reveal>
        <Reveal className="test__viewport" delay={100}>
          <div className="test__track" style={{ transform: `translateX(${offset})` }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="test__card">
                <div className="test__stars">★★★★★</div>
                <p className="test__quote">"{t.quote}"</p>
                <div className="test__by">
                  <Ph variant={t.v} src={t.avatar} alt={t.alt} />
                  <div>
                    <div className="test__by-name">{t.by}</div>
                    <div className="test__by-meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="test__nav">
          <div className="test__dots">
            {Array.from({ length: max + 1 }).map((_, i) => (
              <span key={i} className="test__dot" data-on={i === idx ? '1' : '0'} />
            ))}
          </div>
          <div className="test__nav-btns">
            <button className="test__nav-btn" disabled={idx === 0}
                    onClick={() => setIdx(clamp(idx - 1))} aria-label="Previous">
              <Icon name="chevL" />
            </button>
            <button className="test__nav-btn" disabled={idx === max}
                    onClick={() => setIdx(clamp(idx + 1))} aria-label="Next">
              <Icon name="chevR" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Cart drawer ────────────────────────────────────────────────────── */
export interface CartItem {
  id: string; name: string; brand: string; price: number; v: PhVariant; qty: number;
}

export function CartDrawer({ open, onClose, items, onQty, onRemove }: {
  open: boolean; onClose: () => void; items: CartItem[];
  onQty: (id: string, delta: number) => void; onRemove: (id: string) => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 80 ? 0 : 4.5;
  const total = subtotal + shipping;
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  return (
    <>
      <div className="cart-scrim" data-open={open ? '1' : '0'} onClick={onClose} />
      <aside className="cart" data-open={open ? '1' : '0'} aria-hidden={!open}>
        <div className="cart__hd">
          <h3>Your bag <small>({items.length})</small></h3>
          <button className="cart__x" onClick={onClose} aria-label="Close"><Icon name="x" /></button>
        </div>
        <div className="cart__body">
          {items.length === 0 ? (
            <div className="cart__empty">
              <Ph variant="blush" src={UNSPLASH.emptyBag} alt="Empty shopping bag" style={{ width: 80, height: 80, borderRadius: '50%' }} />
              <h4>Empty for now</h4>
              <p>Drop a piece in — it's vintage, so it won't wait.</p>
              <button className="btn btn--blush btn--sm" onClick={onClose}>Keep browsing</button>
            </div>
          ) : items.map(it => (
            <div className="cart__row" key={it.id}>
              <Ph variant={it.v} src={PRODUCTS.find(p => p.id === it.id)?.img ?? UNSPLASH.emptyBag} alt={it.name} />
              <div>
                <div className="cart__row-name">{it.name}</div>
                <div className="cart__row-brand">{it.brand}</div>
                <div className="cart__row-qty">
                  <button onClick={() => onQty(it.id, -1)} aria-label="Decrease">−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => onQty(it.id, 1)} aria-label="Increase">+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
                <div className="cart__row-price">€{it.price * it.qty}</div>
                <button className="cart__rm" onClick={() => onRemove(it.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cart__ft">
            <div className="cart__line"><span>Subtotal</span><span>€{subtotal.toFixed(2)}</span></div>
            <div className="cart__line">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free ♡' : `€${shipping.toFixed(2)}`}</span>
            </div>
            {subtotal < 80 && subtotal > 0 && (
              <div className="cart__line" style={{ color: 'var(--blush-deep)', fontWeight: 600 }}>
                <span>Add €{(80 - subtotal).toFixed(2)} for free shipping</span>
              </div>
            )}
            <div className="cart__line cart__line--total"><span>Total</span><span>€{total.toFixed(2)}</span></div>
            <button className="btn btn--dark">Checkout <Icon name="arrow" size={16} sw={1.8} /></button>
            <small>or pay in 4 with Klarna · Apple Pay · Café credit</small>
          </div>
        )}
      </aside>
    </>
  );
}
