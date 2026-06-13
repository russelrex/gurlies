import { Link } from 'react-router-dom';
import { Icon, Reveal, ABOUT_IMAGES, ABOUT_SOFT_OPENING_PHOTOS } from '../components';

function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero__bg">
        <img src={ABOUT_IMAGES.hero} alt="Hey Gurlies boutique and café community" />
      </div>
      <div className="container about-hero__inner">
        <Reveal>
          <div className="hero__eyebrow">Hey Gurlies!</div>
          <h1 className="about-hero__title">
            About<br /><span className="script">Hey Gurlies.</span>
          </h1>
          <p className="about-hero__sub">Welcome to Hey Gurlies! 🤍</p>
        </Reveal>
      </div>
      <div className="hero__scroll">scroll · keep going</div>
    </section>
  );
}

function Pillars() {
  return (
    <div className="about-pillars">
      <span>☕ Sip.</span>
      <span>👗 Style.</span>
      <span>🤍 Stay Awhile.</span>
    </div>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />

      <section className="sec about-story">
        <div className="container about-story__inner">
          <Reveal>
            <p className="about-lead">
              Hey Gurlies is a boutique café located in Pangantucan, Bukidnon, created with a
              simple vision: to bring together style, coffee, and community in one cozy space.
            </p>
            <p className="about-text">
              What started as a dream has grown into a place where people can discover affordable
              fashion, enjoy a good cup of coffee, and spend meaningful moments with friends and
              family.
            </p>
            <p className="about-text">
              Our boutique offers carefully selected clothing and accessories for women and men,
              while our café serves coffee, refreshers, fruit blends, and sweet treats made to
              brighten your day.
            </p>
            <p className="about-text">
              More than a store or a café, Hey Gurlies is a space where everyone is welcome —
              whether you're shopping for your next favorite outfit, meeting a friend over coffee,
              or simply looking for a place to relax and stay awhile.
            </p>
            <p className="about-text">
              Thank you for being part of our journey. We look forward to serving you and growing
              with our community.
            </p>
            <Pillars />
          </Reveal>
          <Reveal className="about-story__img" delay={80}>
            <img src={ABOUT_IMAGES.story} alt="Hey Gurlies community at the boutique café" loading="lazy" />
          </Reveal>
        </div>
      </section>

      <section className="sec about-recap" style={{ background: 'var(--cream-2)' }}>
        <div className="container about-recap__inner">
          <Reveal>
            <span className="about-recap__badge">🤍 Soft Opening Recap 🤍</span>
            <p className="about-lead">What started as a simple dream became a day we'll never forget.</p>
            <p className="about-text">
              Our hearts are full seeing familiar faces, new friends, and so much support during
              our soft opening. From the coffee, to the clothes, to the conversations shared around
              our tables — thank you for being part of our beginning.
            </p>
            <p className="about-text">
              We're still growing, still improving, and still adding finishing touches, but we're
              grateful to officially welcome you to Hey Gurlies.
            </p>
            <p className="about-text">
              Thank you for every visit, every purchase, every photo, and every kind word. 
            </p>
            <p className="about-text">
              Here's to many more cups of coffee, new outfits, and beautiful memories together.
            </p>
            {/* <Pillars /> */}
            <p className="about-location">📍 Decolores Village, Pangantucan, Bukidnon</p>
            <p className="about-hashtag">#SipStyleStayAwhileAtHeyGurlies</p>
          </Reveal>
        </div>
      </section>

      <section className="sec about-opening" id="soft-opening-photos">
        <div className="container">
          <Reveal className="sec__head">
            <h2 className="sec__title">Soft Opening<br /><span className="script">Pictures.</span></h2>
            <div className="sec__intro">
              <span className="eyebrow">Real moments</span>
              Snapshots from our opening day — coffee, fashion, and the community that made it special.
            </div>
          </Reveal>
          <Reveal className="about-opening__grid">
            {ABOUT_SOFT_OPENING_PHOTOS.map((photo) => (
              <figure key={photo.id} className="about-opening__item">
                <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec about-note">
        <div className="container about-note__inner">
          <Reveal>
            <h2 className="sec__title">
              Still smiling from our<br /><span className="script">soft opening.</span> 🤍
            </h2>
            <p className="about-text">
              We honestly didn't know what to expect, but seeing so many of you stop by, support
              local, enjoy a coffee, and shop with us made the day extra special.
            </p>
            <p className="about-text">
              Thank you for being part of the beginning of Hey Gurlies. We're excited for what's
              ahead and can't wait to welcome you back.
            </p>
            <p className="about-emoji-line">☕👗🤍</p>
            <p className="about-hashtag">#SipStyleStayAwhileAtHeyGurlies</p>
            <div className="hero__ctas about-note__ctas">
              <Link className="btn btn--primary" to="/boutique">
                Shop the Boutique <Icon name="arrow" size={16} sw={1.8} />
              </Link>
              <Link className="btn btn--dark" to="/cafe">
                Visit the Café
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
