import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = getProductById(id);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) return <Navigate to="/shop" replace />;

  const price = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="product-detail">
      <div className="product-detail__breadcrumb container">
        <Link to="/shop">Collection</Link>
        <span>/</span>
        <span>{product.collection}</span>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-detail__layout container">
        {/* Gallery */}
        <div className="product-detail__gallery">
          <div className="gallery__main">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="gallery__thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`gallery__thumb ${selectedImage === i ? 'gallery__thumb--active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`${product.name} view ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-detail__info">
          <p className="product-detail__collection">{product.collection}</p>
          <h1 className="product-detail__name">{product.name}</h1>
          <p className="product-detail__material">{product.material}</p>
          <p className="product-detail__price">{price}</p>

          <div className="product-detail__divider" />

          <p className="product-detail__description">{product.description}</p>

          {/* Size selector */}
          <div className="product-detail__size-section">
            <div className="product-detail__size-header">
              <p className="product-detail__size-label">Ring Size (EU)</p>
              <a href="#" className="product-detail__size-guide">Size Guide</a>
            </div>
            <div className="product-detail__sizes">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  className={`size-btn ${selectedSize === s ? 'size-btn--active' : ''}`}
                  onClick={() => { setSelectedSize(s); setSizeError(false); }}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="product-detail__size-error">Please select a ring size</p>
            )}
          </div>

          <button
            className={`product-detail__add-btn ${added ? 'product-detail__add-btn--added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? 'Added to Bag' : 'Add to Bag'}
          </button>

          {/* Details */}
          <details className="product-detail__accordion">
            <summary>Product Details</summary>
            <ul>
              {product.details.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </details>

          <details className="product-detail__accordion">
            <summary>Shipping & Returns</summary>
            <p>Complimentary shipping on all orders. Returns accepted within 30 days in original condition.</p>
          </details>
        </div>
      </div>
    </main>
  );
}
