import { Link } from 'react-router-dom';
import { getFeatured } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
  const featured = getFeatured();

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__media">
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&q=85"
            alt="Fine jewellery"
          />
          <div className="hero__overlay" />
        </div>
        <div className="hero__content">
          <p className="hero__eyebrow">New Collection</p>
          <h1 className="hero__headline">Wear What<br />You Love</h1>
          <p className="hero__sub">
            Rare stones. Masterful hands. Enduring beauty.
          </p>
          <Link to="/shop" className="btn-primary">Explore Rings</Link>
        </div>
      </section>

      {/* Brand strip */}
      <section className="brand-strip">
        <div className="container">
          <div className="brand-strip__items">
            {['Handcrafted in Paris', 'Certified Gemstones', 'Complimentary Engraving', '30-Day Returns'].map((t) => (
              <div key={t} className="brand-strip__item">
                <span className="brand-strip__dot" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured rings */}
      <section className="featured-section container">
        <div className="section-header">
          <p className="section-eyebrow">The Collection</p>
          <h2>Featured Rings</h2>
          <div className="divider" />
        </div>
        <div className="product-grid">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="featured-section__cta">
          <Link to="/shop" className="btn-outline">View All Rings</Link>
        </div>
      </section>

      {/* Craft editorial */}
      <section className="editorial">
        <div className="editorial__image">
          <img
            src="https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=900&q=85"
            alt="Jewellery craftsmanship"
          />
        </div>
        <div className="editorial__content">
          <p className="section-eyebrow">Our Atelier</p>
          <h2>The Art of the Exceptional</h2>
          <div className="divider" style={{ margin: '20px 0' }} />
          <p>
            Every piece begins with a single idea: beauty that endures. Our master
            jewellers work by hand in Paris, selecting only the finest certified
            stones and precious metals to create rings that are worn across lifetimes.
          </p>
          <Link to="/about" className="btn-outline" style={{ marginTop: '32px' }}>
            Discover the Atelier
          </Link>
        </div>
      </section>

      {/* Testimonial */}
      <section className="testimonial">
        <div className="container">
          <div className="divider" />
          <blockquote className="testimonial__quote">
            "The most beautiful ring I have ever seen. It arrived in the most exquisite
            packaging — I knew immediately this was something truly special."
          </blockquote>
          <p className="testimonial__author">— Isabelle M., Paris</p>
        </div>
      </section>
    </main>
  );
}
