import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

/* ── Café photos (local) ────────────────────────────────────────────── */
export const CAFE_IMAGES = {
  hero:       '/blogs/pic16.jpg',
  coffee:     '/home/home_coffee.png',
  refreshers: '/home/home_refreshers.png',
  sweets:     '/home/home_sweet_treats.png',
  interior:   '/blogs/pic09.jpg',
  ourSpace:   '/cafe/cafe03.jpg',
  loyaltyCard: '/cafe/Loyalty card.png',
  counter:    '/blogs/pic06.jpg',
  latte:      '/blogs/pic05.jpg',
} as const;

export const HOME_IMAGES = {
  hero:         '/home/home01.png',
  womens:       '/home/home_girl01.png',
  accessories:  '/home/home_acc01.png',
} as const;

export const ABOUT_IMAGES = {
  hero: '/about/about.png',
  story: '/about/about_05.jpg',
} as const;

export const ABOUT_SOFT_OPENING_PHOTOS = [
  'IMG_1328', 'IMG_1332', 'IMG_1382', 'IMG_1383', 'IMG_1387', 'IMG_1391',
  'IMG_1407', 'IMG_1412', 'IMG_1418', 'IMG_1429', 'IMG_1432', 'IMG_1435',
  'IMG_1444', 'IMG_1447', 'IMG_1483', 'IMG_1484',
].map((name, i) => ({
  id: name,
  src: `/about/soft/${name}.jpg`,
  alt: `Hey Gurlies soft opening — photo ${i + 1}`,
}));

export const BOUTIQUE_FRESH_FINDS = [
  { id: 'ff1', src: '/home/home01.png',       alt: 'Model in yellow floral halter dress' },
  { id: 'ff2', src: '/home/home_girl03.png',  alt: 'Model in white lily print top and denim' },
  { id: 'ff3', src: '/home/home_girl02.png',  alt: 'Model in black floral maxi dress with slit' },
  { id: 'ff4', src: '/home/home_girl01.png',  alt: 'Model in pink rose print maxi dress' },
] as const;

export function FreshFindsGrid() {
  return (
    <div className="fresh-finds__grid">
      {BOUTIQUE_FRESH_FINDS.map((item) => (
        <figure key={item.id} className="fresh-finds__item">
          <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}

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
type CategoryItem = {
  id: string; name: string; count: string; size: 'lg' | 'md' | 'sm';
  variant: PhVariant; img: string; alt: string; tag?: string;
};

export type { CategoryItem };

export const BOUTIQUE_CATEGORIES: CategoryItem[] = [
  { id: 'womens',      name: "Women's Clothing", count: 'Tops, dresses & more', size: 'lg', variant: 'blush', tag: 'Most loved', img: HOME_IMAGES.womens, alt: 'Model wearing a floral maxi dress' },
  { id: 'menswear',    name: "Men's Clothing",   count: 'Curated picks',        size: 'md', variant: 'olive', img: UNSPLASH.catNew,     alt: 'Men\'s clothing' },
  { id: 'accessories', name: 'Accessories',      count: 'Bags & more',          size: 'md', variant: 'cocoa', img: HOME_IMAGES.accessories, alt: 'Gold and pearl jewelry on silk' },
];

export const CAFE_CATEGORIES: CategoryItem[] = [
  { id: 'coffee',     name: '☕ Coffee',       count: 'Hot & iced pours',   size: 'md', variant: 'coffee', img: CAFE_IMAGES.coffee,     alt: 'Latte with latte art and roasted coffee beans' },
  { id: 'refreshers', name: '🥤 Refreshers',   count: 'Fruit sodas & more', size: 'md', variant: 'nude',   img: CAFE_IMAGES.refreshers, alt: 'Iced green refresher with fresh apples' },
  { id: 'sweets',     name: '🍰 Sweet Treats', count: 'Bites & pastries',   size: 'md', variant: 'blush',  img: CAFE_IMAGES.sweets,     alt: 'Chocolate loaf cake with frosting' },
];

export const CAFE_FEATURED = [
  {
    id: 'coffee',
    title: 'Coffee',
    desc: 'Freshly brewed favorites made to fuel your day.',
    img: CAFE_IMAGES.coffee,
    alt: 'Latte with latte art and roasted coffee beans',
  },
  {
    id: 'refreshers',
    title: 'Refreshers',
    desc: 'Light, refreshing drinks perfect for warm afternoons.',
    img: CAFE_IMAGES.refreshers,
    alt: 'Iced green refresher with fresh apples',
  },
  {
    id: 'sweets',
    title: 'Sweet Treats',
    desc: 'Freshly prepared desserts and café favorites.',
    img: CAFE_IMAGES.sweets,
    alt: 'Chocolate loaf cake with frosting',
  },
] as const;

export const CAFE_GALLERY = Array.from({ length: 16 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0');
  return {
    id: `pic${n}`,
    src: `/blogs/pic${n}.jpg`,
    alt: `Hey Gurlies café and boutique moments — photo ${i + 1}`,
  };
});

/** @deprecated use CAFE_CATEGORIES */
export const CAFE_FAVORITES = CAFE_CATEGORIES;

/** @deprecated use BOUTIQUE_CATEGORIES */
export const CATEGORIES = [...BOUTIQUE_CATEGORIES, ...CAFE_CATEGORIES];

export interface Product {
  id: string; name: string; brand: string; price: number; was: number | null;
  tag: string | null; filter: string; v: PhVariant; v2: PhVariant; swatches: string[];
  img: string; img2: string; imgAlt: string; imgAlt2: string;
}

export const BOUTIQUE_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Strawberry Milk Cardigan', brand: 'Reclaimed · Y2K', price: 48, was: null, tag: 'ONE OF ONE', filter: 'womens',    v: 'blush',  v2: 'nude',  swatches: ['#e8b6b6','#d9c6b6'], img: UNSPLASH.prodCardigan, img2: UNSPLASH.prodAlt1, imgAlt: 'Blush knit cardigan',  imgAlt2: 'Soft knit detail' },
  { id: 'p2', name: 'Latte Slip Dress',         brand: 'Vintage · 90s',   price: 62, was: 84,   tag: 'MARKDOWN',   filter: 'womens',    v: 'nude',   v2: 'cocoa', swatches: ['#d9c6b6','#776355'], img: UNSPLASH.prodDress,    img2: UNSPLASH.prodAlt2, imgAlt: 'Nude slip dress',      imgAlt2: 'Dress on hanger' },
  { id: 'p3', name: 'Mocha Wrap Knit',          brand: 'Thrifted · Wool', price: 54, was: null, tag: 'NEW',        filter: 'menswear',  v: 'coffee', v2: 'olive', swatches: ['#876a55','#a4a685'], img: UNSPLASH.prodKnit,     img2: UNSPLASH.prodAlt3, imgAlt: 'Mocha wrap knit top',  imgAlt2: 'Minimal knit styling' },
  { id: 'p4', name: 'Espresso Pleated Skirt',   brand: 'Vintage · Silk',  price: 38, was: null, tag: null,         filter: 'womens',    v: 'cocoa',  v2: 'nude',  swatches: ['#3a2a20','#d9c6b6'], img: UNSPLASH.prodSkirt,    img2: UNSPLASH.prodAlt4, imgAlt: 'Dark pleated skirt',   imgAlt2: 'Vintage skirt flat lay' },
  { id: 'p5', name: 'Cream Puff Cami',          brand: 'Y2K · Reclaimed', price: 28, was: 44,   tag: 'MARKDOWN',   filter: 'womens',    v: 'nude',   v2: 'blush', swatches: ['#e8d9c6','#e8b6b6'], img: UNSPLASH.prodCami,     img2: UNSPLASH.prodAlt5, imgAlt: 'Cream cami top',       imgAlt2: 'Editorial outfit' },
  { id: 'p6', name: 'Matcha Linen Trouser',     brand: 'Vintage · 70s',   price: 58, was: null, tag: 'ONE OF ONE', filter: 'womens',    v: 'olive',  v2: 'nude',  swatches: ['#a4a685','#d9c6b6'], img: UNSPLASH.prodTrouser,  img2: UNSPLASH.prodAlt6, imgAlt: 'Olive linen trousers', imgAlt2: 'Vintage trouser styling' },
  { id: 'p7', name: 'Honey Bow Blouse',         brand: 'Reclaimed',       price: 42, was: null, tag: 'NEW',        filter: 'womens',    v: 'blush',  v2: 'cocoa', swatches: ['#e8b6b6','#3a2a20'], img: UNSPLASH.prodBlouse,   img2: UNSPLASH.prodAlt7, imgAlt: 'Honey-toned blouse',   imgAlt2: 'Fashion portrait' },
  { id: 'p8', name: 'Woven Tote Bag',           brand: 'Hey Gurlies',     price: 32, was: null, tag: 'NEW',        filter: 'accessories', v: 'nude', v2: 'blush', swatches: ['#d9c6b6','#e8b6b6'], img: UNSPLASH.catVintage,   img2: UNSPLASH.prodAlt8, imgAlt: 'Woven tote bag',       imgAlt2: 'Accessory flat lay' },
];

/** Boutique-only — café items live on the Café page / menu */
export const PRODUCTS = BOUTIQUE_PRODUCTS;

/* ── Boutique page data ─────────────────────────────────────────────── */
export const BOUTIQUE_COLLECTIONS = [
  {
    id: 'womens',
    title: "Women's Clothing",
    desc: 'Trendy, stylish, and versatile pieces curated for every occasion.',
    categories: ['Tops', 'Dresses', 'Bottoms', 'Outerwear', 'Accessories'],
    img: HOME_IMAGES.womens,
    alt: 'Model wearing a floral maxi dress',
  },
  {
    id: 'menswear',
    title: "Men's Clothing",
    desc: 'Classic essentials and modern styles designed for comfort and confidence.',
    categories: ['Shirts', 'Polos', 'T-Shirts', 'Jackets', 'Pants'],
    img: UNSPLASH.catNew,
    alt: "Men's clothing collection",
  },
  {
    id: 'accessories',
    title: 'Accessories',
    desc: 'The finishing touches that complete every outfit.',
    categories: ['Bags', 'Jewelry', 'Hair Accessories', 'Caps', 'Fashion Accessories'],
    img: HOME_IMAGES.accessories,
    alt: 'Gold and pearl jewelry on silk',
  },
] as const;

export const BOUTIQUE_WHY_SHOP = [
  { title: 'Carefully Curated',    body: 'Every piece is selected with quality, style, and affordability in mind.' },
  { title: 'Unique Finds',         body: "Discover pieces you won't find everywhere." },
  { title: 'Affordable Fashion',   body: 'Look your best without breaking the budget.' },
  { title: 'Community-Focused',    body: "More than a boutique, we're a place where people connect and feel welcome." },
  { title: 'Sip & Style',          body: 'Shop curated fashion, then unwind at our café — all under one cozy roof.' },
] as const;

export const BOUTIQUE_CUSTOMER_PHOTOS = [
  { src: '/blogs/pic13.jpg', alt: 'Customer styling at Hey Gurlies' },
  { src: '/blogs/pic12.jpg', alt: 'Boutique shopping moment' },
  { src: '/blogs/pic07.jpg', alt: 'Fashion accessories display' },
  { src: '/blogs/pic14.jpg', alt: 'Happy customer at Hey Gurlies' },
] as const;

export const BOUTIQUE_FILTERS = [
  { id: 'all',         label: 'All Pieces' },
  { id: 'womens',      label: "Women's Clothing" },
  { id: 'menswear',    label: "Men's Clothing" },
  { id: 'accessories', label: 'Accessories' },
];

export const FILTERS = BOUTIQUE_FILTERS;

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

/* ── Nav ────────────────────────────────────────────────────────────── */
export const NAV_ITEMS = [
  { label: 'Home',     to: '/' },
  { label: 'Boutique', to: '/boutique' },
  { label: 'Café',     to: '/cafe' },
  { label: 'About',    to: '/about' },
  { label: 'Contact',  to: '/', hash: 'contact' },
] as const;

/* ── Header ─────────────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const location = useLocation();
  const navItems = NAV_ITEMS;
  const navTo = (item: typeof NAV_ITEMS[number]) =>
    'hash' in item && item.hash
      ? { pathname: item.to, hash: `#${item.hash}` }
      : item.to;
  const isActive = (item: typeof NAV_ITEMS[number]) => {
    if (item.to === '/cafe') return location.pathname === '/cafe';
    if (item.to === '/boutique') return location.pathname === '/boutique';
    if (item.to === '/about') return location.pathname === '/about';
    if (item.label === 'Home') return location.pathname === '/' && !location.hash;
    if (location.pathname !== '/') return false;
    if ('hash' in item && item.hash) return location.hash === `#${item.hash}`;
    return false;
  };
  const marqueeText = 'Sunday–Thursday: 10 AM–8 PM · Friday–Saturday: 10 AM–9:30 PM | Decolores Village, Poblacion, Pangantucan, Bukidnon';
  return (
    <>
      <div className="hdr__marquee">
        <div className="hdr__marquee-track">
          {Array.from({ length: 4 }).map((_, k) => (
            <span key={k}>{marqueeText}<em> — </em></span>
          ))}
        </div>
      </div>
      <header className="hdr" data-scrolled={scrolled ? '1' : '0'}>
        <div className="container hdr__bar">
          <Link to="/" className="hdr__logo" aria-label="Hey Gurlies! home">
            <img className="hdr__logo-img" src="/heygurlies_logo.png" alt="Hey Gurlies!" />
          </Link>
          <nav className="hdr__nav">
            {navItems.map(n => (
              <Link key={n.label} to={navTo(n)} className="hdr__nav-link" data-active={isActive(n) ? '1' : '0'}>
                {n.label}
              </Link>
            ))}
          </nav>
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

/* ── Café menu ──────────────────────────────────────────────────────── */
export const CAFE_MENUS = [
  {
    id: 'coffee',
    label: 'Coffee Favorites',
    src: '/cafe/menus/Coffe Favorites.png',
    alt: 'Hey Gurlies coffee favorites menu — hot and iced coffee drinks',
  },
  {
    id: 'matcha',
    label: 'Matcha & Tea',
    src: '/cafe/menus/Matcha & Tea (1).png',
    alt: 'Hey Gurlies matcha favorites menu — classic and flavored matcha lattes',
  },
  {
    id: 'refreshers',
    label: 'House Specials',
    src: '/cafe/menus/House specials.png',
    alt: 'Hey Gurlies house specials — sparkling and signature series',
  },
  {
    id: 'frappes',
    label: 'Fruit Blends & Frappes',
    src: '/cafe/menus/Frappes.png',
    alt: 'Hey Gurlies fruit blends and frappes menu',
  },
  {
    id: 'cocktails',
    label: 'HG Cocktails',
    src: '/cafe/menus/Cocktails.png',
    alt: 'Hey Gurlies HG cocktails menu — house specials',
  },
  {
    id: 'sweets',
    label: 'Sweet Treats',
    src: '/cafe/menus/Sweet Treats.png',
    alt: 'Hey Gurlies sweet treats menu — cakes, waffles, brownies, and cookies',
  },
  {
    id: 'bites',
    label: 'Crave Bites',
    src: '/cafe/menus/Crave Bites.png',
    alt: 'Hey Gurlies crave bites menu — fries, fruggets, and siomai',
  },
  {
    id: 'noodles',
    label: 'Noodle Series',
    src: '/cafe/menus/Noodle Series.png',
    alt: 'Hey Gurlies noodle series menu — ramen and add-ons',
  },
  {
    id: 'rice',
    label: 'Rice Meals',
    src: '/cafe/menus/Rice Meals.png',
    alt: 'Hey Gurlies rice meals menu — adobo, inasal, fillet, and sisig',
  },
];

export function CafeMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const hasLightbox = activeIndex !== null;

  useEffect(() => {
    if (!hasLightbox) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowRight') {
        setActiveIndex((idx) => (idx === null ? null : (idx + 1) % CAFE_MENUS.length));
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((idx) => (idx === null ? null : (idx - 1 + CAFE_MENUS.length) % CAFE_MENUS.length));
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hasLightbox]);

  const showPrev = () => {
    setActiveIndex((idx) => (idx === null ? null : (idx - 1 + CAFE_MENUS.length) % CAFE_MENUS.length));
  };
  const showNext = () => {
    setActiveIndex((idx) => (idx === null ? null : (idx + 1) % CAFE_MENUS.length));
  };

  return (
    <section className="sec menu" id="menu">
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            Our<br /><span className="script">Menus.</span>
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">Hey Gurlies! · Sip, style &amp; stay awhile</span>
            Coffee, matcha, cocktails, sweet treats, noodles, rice meals, and more — all priced for lingering.
          </div>
        </Reveal>
        <div className="menu__grid">
          {CAFE_MENUS.map((item, i) => (
            <Reveal key={item.id} className="menu__item" delay={i * 60} id={`menu-${item.id}`}>
              <span className="menu__label">{item.label}</span>
              <div className="menu__frame">
                <button
                  className="menu__open"
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-label={`Open ${item.label} menu image in fullscreen`}
                >
                  <img
                    className="menu__img"
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        {hasLightbox && activeIndex !== null && (
          <div
            className="menu-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${CAFE_MENUS[activeIndex].label} menu image viewer`}
            onClick={() => setActiveIndex(null)}
          >
            <button
              type="button"
              className="menu-lightbox__close"
              onClick={() => setActiveIndex(null)}
              aria-label="Close fullscreen menu viewer"
            >
              <Icon name="x" size={20} />
            </button>
            <button
              type="button"
              className="menu-lightbox__nav menu-lightbox__nav--prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Show previous menu image"
            >
              <Icon name="chevL" size={24} />
            </button>
            <figure
              className="menu-lightbox__figure"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="menu-lightbox__img"
                src={CAFE_MENUS[activeIndex].src}
                alt={CAFE_MENUS[activeIndex].alt}
              />
              <figcaption className="menu-lightbox__caption">
                {CAFE_MENUS[activeIndex].label} · {activeIndex + 1} / {CAFE_MENUS.length}
              </figcaption>
            </figure>
            <button
              type="button"
              className="menu-lightbox__nav menu-lightbox__nav--next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Show next menu image"
            >
              <Icon name="chevR" size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
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
