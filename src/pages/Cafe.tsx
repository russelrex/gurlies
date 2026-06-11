import { Icon, Reveal, CafeMenu, BlogCarousel } from '../components';

function CafeHero() {
  return (
    <section className="cafe-hero">
      <div className="cafe-hero__bg">
        <img src="/blogs/pic16.jpg" alt="Friends gathered outside Hey Gurlies café" />
      </div>
      <div className="container cafe-hero__inner">
        <Reveal>
          <div className="hero__eyebrow">Hey Gurlies! · The café</div>
          <h1 className="cafe-hero__title">
            Sip, <span className="script">style</span><br />&amp; stay awhile.
          </h1>
          <p className="cafe-hero__sub">
            Oat matcha, slow pours, and a counter where the rail upstairs meets the group chat downstairs.
          </p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#menu">
              View the menu <Icon name="arrow" size={16} sw={1.8} />
            </a>
            <a className="btn btn--ghost" href="#blog">See the moments</a>
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
      <BlogCarousel />
    </>
  );
}
