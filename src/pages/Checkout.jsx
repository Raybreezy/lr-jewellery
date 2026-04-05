import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const { items, subtotal } = useCart();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/shop', { replace: true });
      return;
    }
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: subtotal * 100, // pence
        currency: 'gbp',
        items: items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity, size: i.size })),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError('Unable to initialise checkout. Please try again.');
      })
      .catch(() => setError('A network error occurred. Please try again.'));
  }, []);

  if (error) {
    return (
      <main className="checkout checkout--error">
        <p>{error}</p>
        <Link to="/shop" className="btn-outline">Return to Shop</Link>
      </main>
    );
  }

  if (!clientSecret) {
    return (
      <main className="checkout checkout--loading">
        <div className="checkout__spinner" />
        <p>Preparing your checkout…</p>
      </main>
    );
  }

  const appearance = {
    theme: 'flat',
    variables: {
      fontFamily: '"DM Sans", system-ui, sans-serif',
      colorBackground: '#FAF9F6',
      colorText: '#2A2A2A',
      colorTextPlaceholder: '#8A8A8A',
      borderRadius: '0px',
      colorPrimary: '#B8973A',
    },
    rules: {
      '.Input': {
        border: '1px solid #D6D6D6',
        boxShadow: 'none',
        padding: '14px 16px',
      },
      '.Input:focus': {
        border: '1px solid #2A2A2A',
        boxShadow: 'none',
        outline: '0',
      },
      '.Label': {
        fontSize: '0.68rem',
        fontWeight: '500',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '8px',
      },
    },
  };

  return (
    <main className="checkout">
      <div className="checkout__inner container">
        <div className="checkout__left">
          <Link to="/shop" className="checkout__back">← Continue Shopping</Link>
          <div className="checkout__brand">L&R Jewellery</div>
          <h1>Checkout</h1>

          <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
            <CheckoutForm subtotal={subtotal} />
          </Elements>
        </div>

        <div className="checkout__right">
          <h2>Order Summary</h2>
          <ul className="checkout__order-items">
            {items.map((item) => {
              const price = new Intl.NumberFormat('en-GB', {
                style: 'currency', currency: 'GBP', minimumFractionDigits: 0,
              }).format(item.price * item.quantity);
              return (
                <li key={`${item.id}-${item.size}`} className="checkout__order-item">
                  <div className="checkout__item-image">
                    <img src={item.images[0]} alt={item.name} />
                    <span className="checkout__item-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout__item-details">
                    <p className="checkout__item-name">{item.name}</p>
                    <p className="checkout__item-meta">Size {item.size}</p>
                  </div>
                  <p className="checkout__item-price">{price}</p>
                </li>
              );
            })}
          </ul>
          <div className="checkout__totals">
            <div className="checkout__total-row">
              <span>Subtotal</span>
              <span>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(subtotal)}</span>
            </div>
            <div className="checkout__total-row">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="checkout__total-row checkout__total-row--grand">
              <span>Total</span>
              <span>{new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 0 }).format(subtotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CheckoutForm({ subtotal }) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setStripeError(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setStripeError(error.message);
      setSubmitting(false);
    } else {
      clearCart();
      navigate('/order-confirmation');
    }
  };

  const formattedTotal = new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP', minimumFractionDigits: 0,
  }).format(subtotal);

  return (
    <form onSubmit={handleSubmit} className="checkout__form">
      <PaymentElement />
      {stripeError && <p className="checkout__stripe-error">{stripeError}</p>}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="checkout__submit btn-primary"
      >
        {submitting ? 'Processing…' : `Pay ${formattedTotal}`}
      </button>
      <p className="checkout__secure-note">
        <LockIcon /> Secured by Stripe. Your payment data is encrypted.
      </p>
    </form>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
