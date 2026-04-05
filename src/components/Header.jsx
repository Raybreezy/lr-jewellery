import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { itemCount, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner container">
        <button
          className="header__menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <NavLink to="/shop" onClick={() => setMenuOpen(false)}>Collection</NavLink>
          <NavLink to="/about" onClick={() => setMenuOpen(false)}>Atelier</NavLink>
        </nav>

        <Link to="/" className="header__logo">
          L&R Jewellery
        </Link>

        <div className="header__actions">
          <button
            className="header__cart-btn"
            onClick={() => setIsOpen(true)}
            aria-label={`Open cart, ${itemCount} items`}
          >
            <CartIcon />
            {itemCount > 0 && <span className="header__cart-count">{itemCount}</span>}
          </button>
        </div>
      </div>

      {menuOpen && <div className="header__overlay" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}
