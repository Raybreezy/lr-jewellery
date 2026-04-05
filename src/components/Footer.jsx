import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <p className="footer__logo">L&R Jewellery</p>
          <p className="footer__tagline">Crafted for the extraordinary</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Collection</h4>
            <Link to="/shop">All Rings</Link>
            <Link to="/shop?collection=Eternal">Eternal</Link>
            <Link to="/shop?collection=Jardin">Jardin</Link>
            <Link to="/shop?collection=Lumière">Lumière</Link>
            <Link to="/shop?collection=Moderne">Moderne</Link>
          </div>
          <div className="footer__col">
            <h4>Atelier</h4>
            <Link to="/about">Our Story</Link>
            <a href="#">Craftsmanship</a>
            <a href="#">Bespoke</a>
          </div>
          <div className="footer__col">
            <h4>Service</h4>
            <a href="#">Sizing Guide</a>
            <a href="#">Shipping & Returns</a>
            <a href="#">Care Instructions</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} L&R Jewellery. All rights reserved.</p>
        <div className="footer__legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
