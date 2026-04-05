import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const formattedPrice = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link to={`/shop/${product.id}`} className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card__img product-card__img--primary"
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            className="product-card__img product-card__img--secondary"
            loading="lazy"
          />
        )}
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}
      </div>
      <div className="product-card__info">
        <p className="product-card__collection">{product.collection}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__material">{product.material}</p>
        <p className="product-card__price">{formattedPrice}</p>
      </div>
    </Link>
  );
}
