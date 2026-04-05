import { Link } from 'react-router-dom';
import './OrderConfirmation.css';

export default function OrderConfirmation() {
  return (
    <main className="order-confirmation">
      <div className="order-confirmation__inner container">
        <div className="order-confirmation__icon">
          <CheckIcon />
        </div>
        <p className="order-confirmation__eyebrow">Thank you</p>
        <h1>Your order is confirmed</h1>
        <div className="divider" style={{ margin: '24px auto' }} />
        <p className="order-confirmation__message">
          We have received your order and a confirmation has been sent to your email.
          Your piece will be carefully packaged and dispatched within 3–5 business days.
        </p>
        <div className="order-confirmation__actions">
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
        <p className="order-confirmation__service">
          Questions? Contact us at{' '}
          <a href="mailto:hello@lrjewellery.com">hello@lrjewellery.com</a>
        </p>
      </div>
    </main>
  );
}

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="8 12 11 15 16 9" />
    </svg>
  );
}
