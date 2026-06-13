import {
  Icon, Ph, Reveal, CafeMenu,
  CAFE_IMAGES, CAFE_FEATURED, CAFE_GALLERY, CAFE_PROMOTION, CAFE_PROMOTIONS,
} from '../components';

function CafeHero() {
  return (
    <section className="cafe-hero">
      <div className="cafe-hero__bg">
        <img src={CAFE_IMAGES.hero} alt="Iced drinks lined up at Hey Gurlies café counter" />
      </div>
      <div className="container cafe-hero__inner">
        <Reveal>
          <div className="hero__eyebrow">Hey Gurlies Café</div>
          <h1 className="cafe-hero__title">
            Coffee, Sweet Treats,<br />
            <span className="script">&amp; Cozy Moments</span>
          </h1>
          <p className="cafe-hero__sub">
            A place to slow down, catch up, and stay awhile.
          </p>
          <p className="cafe-hero__sub cafe-hero__sub--2">
            Whether you're meeting friends, taking a break, or treating yourself,
            Hey Gurlies Café offers handcrafted drinks, sweet treats, and a cozy
            atmosphere in the heart of Pangantucan.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#menu">
              View Menu <Icon name="arrow" size={16} sw={1.8} />
            </a>
            <a className="btn btn--ghost" href="#visit-us">Visit Us</a>
          </div>
        </Reveal>
      </div>
      <div className="hero__scroll">scroll · keep going</div>
    </section>
  );
}

export default function Cafe() {
  return (
    <>
      <CafeHero />

      <CafeMenu />

      {/* Featured Categories */}
      <section className="sec" id="categories" style={{ background: 'var(--cream-2)' }}>
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Featured<br /><span className="script">Categories.</span></h2>
          </Reveal>
          <div className="cafe-collections">
            {CAFE_FEATURED.map((cat, i) => (
              <Reveal key={cat.id} className="cafe-col" delay={i * 80} id={cat.id}>
                <div className="cafe-col__media">
                  <Ph variant="coffee" src={cat.img} alt={cat.alt} style={{ position: 'absolute', inset: 0 }} />
                </div>
                <div className="cafe-col__body">
                  {/* <span className="cafe-col__emoji">{cat.emoji}</span> */}
                  <h3 className="cafe-col__title">{cat.title}</h3>
                  <p className="cafe-col__desc">{cat.desc}</p>
                  <a className="sec__link" href={`#menu-${cat.id}`}>
                    Menu Items <Icon name="arrow" size={14} sw={1.8} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Space */}
      <section className="sec cafe-space" style={{ background: 'var(--cream-2)' }}>
        <div className="container cafe-space__inner">
          <Reveal>
            <span className="eyebrow">Our Space</span>
            <h2 className="sec__title" style={{ marginTop: 16 }}>
              Sip, Style &amp;<br /><span className="script">Stay Awhile.</span>
            </h2>
            <p className="cafe-space__lead">More than a café.</p>
            <p className="cafe-space__text">
              Hey Gurlies Café was created as a cozy space where people can gather, relax,
              work, and create meaningful moments together.
            </p>
            <p className="cafe-space__text">
              Whether you're visiting after shopping, catching up with friends, or simply
              enjoying a quiet coffee break, we're happy to have you here.
            </p>
          </Reveal>
          <Reveal className="cafe-space__img" delay={80}>
            <Ph variant="coffee" src={CAFE_IMAGES.ourSpace} alt="Hey Gurlies café interior" style={{ position: 'absolute', inset: 0 }} />
          </Reveal>
        </div>
      </section>

      {/* Café Gallery */}
      <section className="sec" id="gallery">
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Café<br /><span className="script">Gallery.</span></h2>
            <div className="sec__intro">
              <span className="eyebrow">Real moments</span>
              Coffee, treats, and the cozy corners that make Hey Gurlies feel like home.
            </div>
          </Reveal>
          <Reveal className="cafe-gallery">
            {CAFE_GALLERY.map((photo) => (
              <figure key={photo.id} className="cafe-gallery__item">
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Seasonal Promotions */}
      <section className="sec cafe-promo" id="promotions">
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Current<br /><span className="script">Promotions.</span></h2>
            <div className="sec__intro">
              <span className="eyebrow">Father's Day / Seasonal</span>
              Active offers and limited-time specials at the café.
            </div>
          </Reveal>
          <Reveal className="cafe-promo__card" delay={60}>
            <h3 className="cafe-promo__title">{CAFE_PROMOTION.title}</h3>
            <p className="cafe-promo__text">{CAFE_PROMOTION.intro}</p>
            <p className="cafe-promo__text">{CAFE_PROMOTION.invite}</p>
            <p className="cafe-promo__offer">{CAFE_PROMOTION.offer}</p>
            <ul className="cafe-promo__details">
              {CAFE_PROMOTION.details.map(d => <li key={d.text}>{d.text}</li>)}
            </ul>
            <p className="cafe-promo__text">{CAFE_PROMOTION.closing}</p>
            <p className="cafe-promo__signoff">{CAFE_PROMOTION.signoff}</p>
          </Reveal>
          <Reveal className="cafe-promo__grid" delay={80}>
            {CAFE_PROMOTIONS.map((promo) => (
              <figure key={promo.id} className="cafe-promo__item">
                <img src={promo.src} alt={promo.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Loyalty Rewards */}
      <section className="sec cafe-loyalty" style={{ background: 'var(--cocoa)', color: 'var(--cream)' }}>
        <div className="container cafe-loyalty__inner">
          <Reveal>
            <span className="eyebrow" style={{ color: 'color-mix(in oklch, var(--cream) 65%, transparent)' }}>
              Loyalty Rewards
            </span>
            <h2 className="sec__title" style={{ color: 'var(--cream)', marginTop: 16 }}>
              Sip &amp; Style<br /><span className="script">Rewards.</span>
            </h2>
            <p className="cafe-loyalty__text">
              Collect 9 stamps and enjoy a <strong>FREE coffee</strong>.
            </p>
            <p className="cafe-loyalty__sub">
              Ask our staff for your loyalty card.
            </p>
            <div className="cafe-loyalty__card">
              <img
                src={CAFE_IMAGES.loyaltyCard}
                alt="Hey Gurlies loyalty card — collect 9 stamps and enjoy a free coffee"
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
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
              <p>Monday – Sunday<br />9:00 AM – 7:00 PM</p>
            </div>
            <div className="boutique-visit__block">
              <span className="boutique-visit__label">Contact</span>
              <ul className="boutique-visit__contact">
                <li><a href="https://www.facebook.com/profile.php?id=61590077894581" target="_blank" rel="noopener noreferrer">Facebook Messenger</a></li>
                {/* <li><a href="#">Instagram</a></li>
                <li><a href="tel:">Phone Number</a></li> */}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="sec cafe-final">
        <div className="container cafe-final__inner">
          <Reveal>
            <h2 className="sec__title">
              Ready for your<br /><span className="script">next coffee break?</span>
            </h2>
            <p className="cafe-final__sub">
              Come visit Hey Gurlies Café and discover your new favorite spot.
            </p>
            <div className="cafe-final__tags">
              <span>☕ Coffee</span>
              <span>🍰 Sweet Treats</span>
              <span>🤍 Cozy Moments</span>
            </div>
            <p className="cafe-final__pillars">Sip, Style &amp; Stay Awhile.</p>
            <div className="hero__ctas" style={{ justifyContent: 'center' }}>
              <a className="btn btn--primary" href="#menu">View Menu</a>
              <a className="btn btn--ghost" href="#visit-us">Visit Us</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
