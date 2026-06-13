import { Link } from 'react-router-dom';
import {
  Icon, Ph, Reveal, ProductCard, FreshFindsGrid,
  BOUTIQUE_COLLECTIONS, BOUTIQUE_WHY_SHOP,
  BOUTIQUE_CUSTOMER_PHOTOS, HOME_IMAGES, CAFE_IMAGES, CAFE_CATEGORIES,
} from '../components';
import type { Product } from '../components';

function BoutiqueHero() {
  return (
    <section className="boutique-hero">
      <div className="boutique-hero__bg">
        <img src={HOME_IMAGES.hero} alt="Hey Gurlies boutique fashion" />
      </div>
      <div className="container boutique-hero__inner">
        <Reveal>
          <div className="hero__eyebrow">Hey Gurlies Boutique</div>
          <h1 className="boutique-hero__title">
            Curated Styles,<br />
            <span className="script">Everyday Confidence</span>
          </h1>
          <p className="boutique-hero__sub">
            Discover thoughtfully selected pieces for women and men designed to help you look good,
            feel confident, and express your personal style.
          </p>
          <p className="boutique-hero__sub boutique-hero__sub--2">
            From everyday essentials to statement pieces, Hey Gurlies Boutique offers fashion
            you'll love to wear again and again.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#womens">
              Shop Women's <Icon name="arrow" size={16} sw={1.8} />
            </a>
            <a className="btn btn--ghost" href="#mens">
              Shop Men's
            </a>
          </div>
        </Reveal>
      </div>
      <div className="hero__scroll">scroll · keep going</div>
    </section>
  );
}

export function ProductSection({ id, title, script, eyebrow, intro, products, ctaLabel, ctaTo, wishlist, onWish, onAdd }: {
  id: string; title: string; script?: string; eyebrow: string; intro: string;
  products: Product[]; ctaLabel: string; ctaTo: string;
  wishlist: Set<string>; onWish: (id: string) => void; onAdd: (p: Product) => void;
}) {
  return (
    <section className="sec" id={id}>
      <div className="container">
        <Reveal className="sec__head">
          <h2 className="sec__title">
            {title}{script && <> <span className="script">{script}</span></>}
          </h2>
          <div className="sec__intro">
            <span className="eyebrow">{eyebrow}</span>
            {intro}
          </div>
        </Reveal>
        <Reveal className="products">
          {products.map(p => (
            <ProductCard key={p.id} p={p} wished={wishlist.has(p.id)} onWish={onWish} onAdd={onAdd} />
          ))}
        </Reveal>
        <Reveal delay={80}>
          <div className="boutique-sec__cta">
            <a className="sec__link" href={ctaTo}>{ctaLabel} <Icon name="arrow" size={14} sw={1.8} /></a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Boutique() {
  return (
    <>
      <BoutiqueHero />

      {/* Shop by Collection */}
      <section className="sec" id="collections" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Shop by<br /><span className="script">Collection.</span></h2>
          </Reveal>
          <div className="boutique-collections">
            {BOUTIQUE_COLLECTIONS.map((col, i) => (
              <Reveal key={col.id} className="boutique-col" delay={i * 80} id={col.id === 'womens' ? 'womens' : col.id === 'menswear' ? 'mens' : 'accessories'}>
                <div className="boutique-col__media">
                  <Ph variant="blush" src={col.img} alt={col.alt} style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className="boutique-col__body">
                  <span className="boutique-col__emoji">{col.emoji}</span>
                  <h3 className="boutique-col__title">{col.title}</h3>
                  <p className="boutique-col__desc">{col.desc}</p>
                  <div className="boutique-col__cats">
                    <span className="boutique-col__cats-label">Featured Categories</span>
                    <ul>
                      {col.categories.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                  <a className="sec__link" href={`#${col.id === 'menswear' ? 'mens' : col.id}`}>
                    Shop {col.title} <Icon name="arrow" size={14} sw={1.8} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" id="new-arrivals">
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">
              Fresh Finds<br /><span className="script">This Month</span>
            </h2>
            <div className="sec__intro">
              <span className="eyebrow">New Arrivals</span>
              Discover the latest additions to our collection.
            </div>
          </Reveal>
          <Reveal>
            <FreshFindsGrid />
          </Reveal>
          <Reveal delay={80}>
            <div className="boutique-sec__cta">
              <a className="sec__link" href="#new-arrivals">
                View All New Arrivals <Icon name="arrow" size={14} sw={1.8} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <ProductSection
        id="best-sellers"
        title="Most Loved"
        script="by Our Customers"
        eyebrow="Best Sellers"
        intro="The pieces our regulars reach for again and again."
        products={BEST_SELLERS.length ? BEST_SELLERS : BOUTIQUE_PRODUCTS.slice(0, 4)}
        ctaLabel="Shop Best Sellers"
        ctaTo="#best-sellers"
        wishlist={wishlist} onWish={onWish} onAdd={onAdd}
      /> */}

      {/* Why Shop */}
      <section className="sec" id="why-shop">
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Why Shop at<br /><span className="script">Hey Gurlies?</span></h2>
          </Reveal>
          <Reveal className="why">
            {BOUTIQUE_WHY_SHOP.map((w, i) => (
              <div key={w.title} className="why__card">
                <div className="why__num">
                  {String(i + 1).padStart(2, '0')} / {String(BOUTIQUE_WHY_SHOP.length).padStart(2, '0')}
                </div>
                <div className="why__body">{w.body}</div>
                <div className="why__title">{w.title}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="sec boutique-exp" style={{ background: 'var(--cream-2)' }}>
        <div className="container boutique-exp__inner">
          <Reveal>
            <span className="eyebrow">The Hey Gurlies Experience</span>
            <h2 className="sec__title" style={{ marginTop: 16 }}>
              Style Meets<br /><span className="script">Community.</span>
            </h2>
            <p className="boutique-exp__text">
              At Hey Gurlies, we believe shopping should feel personal. Whether you're searching
              for a new favorite outfit, a gift, or simply browsing, we want every visit to feel
              welcoming, inspiring, and fun.
            </p>
            <p className="boutique-exp__text">
              And when you're ready for a break, our café is always nearby.
            </p>
            <div className="boutique-exp__pillars">
              <span>☕ Sip.</span>
              <span>👗 Style.</span>
              <span>🤍 Stay Awhile.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Customer Favorites */}
      <section className="sec" id="customer-favorites">
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Customer<br /><span className="script">Favorites.</span></h2>
            <div className="sec__intro">
              <span className="eyebrow">Top picks &amp; real moments</span>
              Snapshots from the boutique and real moments with our community.
            </div>
          </Reveal>
          <Reveal className="boutique-fav-photos">
            {BOUTIQUE_CUSTOMER_PHOTOS.map((photo, i) => (
              <div key={i} className="boutique-fav-photo">
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Visit Café */}
      <section className="sec boutique-cafe-cta" style={{ background: 'var(--cocoa)', color: 'var(--cream)' }}>
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title" style={{ color: 'var(--cream)' }}>
              Need a Coffee<br /><span className="script">Break?</span>
            </h2>
            <div className="sec__intro" style={{ color: 'color-mix(in oklch, var(--cream) 75%, transparent)' }}>
              <span className="eyebrow">Visit Our Café</span>
              After shopping, stop by Hey Gurlies Café for coffee, refreshers, and sweet treats.
            </div>
          </Reveal>
          <Reveal className="boutique-cafe-chips">
            {CAFE_CATEGORIES.map(c => (
              <span key={c.id} className="boutique-cafe-chip">{c.name}</span>
            ))}
          </Reveal>
          <Reveal delay={80}>
            <div className="boutique-sec__cta">
              <Link className="btn btn--blush" to="/cafe">
                Visit the Café <Icon name="arrow" size={16} sw={1.8} />
              </Link>
            </div>
          </Reveal>
          <div className="boutique-cafe-cta__img">
            <Ph variant="coffee" src={CAFE_IMAGES.interior} alt="Hey Gurlies café" style={{ position: 'absolute', inset: 0 }} />
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="sec" id="visit-us">
        <div className="container boutique-visit">
          <Reveal className="boutique-visit__card">
            <h3>Visit Us</h3>
            <div className="boutique-visit__block">
              <span className="boutique-visit__label">Location</span>
              <p>📍 Decolores Village<br />Pangantucan, Bukidnon</p>
            </div>
            <div className="boutique-visit__block">
              <span className="boutique-visit__label">Hours</span>
              <p>Monday – Sunday<br />8:00 AM – 8:00 PM</p>
            </div>
            <div className="boutique-visit__block">
              <span className="boutique-visit__label">Contact</span>
              <ul className="boutique-visit__contact">
                <li><a href="https://www.facebook.com/profile.php?id=61590077894581" target="_blank" rel="noopener noreferrer">Facebook Messenger</a></li>
                {/* <li><a href="#">Instagram</a></li> */}
                {/* <li><a href="tel:">Phone Number</a></li> */}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="sec boutique-final">
        <div className="container boutique-final__inner">
          <Reveal>
            <h2 className="sec__title">
              Ready to find your<br /><span className="script">next favorite outfit?</span>
            </h2>
            <p className="boutique-final__sub">
              Browse our latest collections and discover styles you'll love.
            </p>
            <div className="boutique-final__tags">
              <span>👗 Women's Fashion</span>
              <span>👔 Men's Clothing</span>
              <span>✨ Accessories</span>
            </div>
            <div className="hero__ctas boutique-final__ctas">
              <a className="btn btn--primary" href="#womens">Shop Women's</a>
              <a className="btn btn--dark" href="#mens">Shop Men's</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
