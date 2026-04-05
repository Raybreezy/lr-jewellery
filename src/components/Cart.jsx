import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const formatted = (n) =>
    new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(n);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--visible' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`} aria-label="Shopping bag">
        <div className="cart-drawer__header">
          <h2>Your Bag</h2>
          <button className="cart-drawer__close" onClick={() => setIsOpen(false)} aria-label="Close bag">
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your bag is empty.</p>
            <button className="btn-outline" onClick={() => setIsOpen(false)}>
              <Link to="/shop" onClick={() => setIsOpen(false)}>Explore Rings</Link>
            </button>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={`${item.id}-${item.size}`} className="cart-item">
                  <div className="cart-item__image">
                    <img src={item.images[0]} alt={item.name} />
                  </div>
                  <div className="cart-item__info">
                    <p className="cart-item__collection">{item.collection}</p>
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__meta">Size {item.size}</p>
                    <p className="cart-item__price">{formatted(item.price)}</p>
                    <div className="cart-item__controls">
                      <div className="cart-item__qty">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeItem(item.id, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__subtotal">
                <span>Subtotal</span>
                <span>{formatted(subtotal)}</span>
              </div>
              <p className="cart-drawer__shipping-note">
                Shipping & taxes calculated at checkout
              </p>
              <Link
                to="/checkout"
                className="btn-primary cart-drawer__checkout"
                onClick={() => setIsOpen(false)}
              >
                Proceed to Checkout
              </Link>
              <button
                className="cart-drawer__continue"
                onClick={() => setIsOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
