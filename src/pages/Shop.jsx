import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, collections } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Shop.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A–Z' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCollection = searchParams.get('collection') ?? 'all';
  const [activeCollection, setActiveCollection] = useState(initialCollection);
  const [sort, setSort] = useState('default');

  const filtered = useMemo(() => {
    let list = activeCollection === 'all'
      ? [...products]
      : products.filter((p) => p.collection === activeCollection);

    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [activeCollection, sort]);

  const handleCollection = (id) => {
    setActiveCollection(id);
    setSearchParams(id !== 'all' ? { collection: id } : {});
  };

  return (
    <main className="shop">
      <div className="shop__hero">
        <h1>The Collection</h1>
        <p>Rings of enduring beauty, handcrafted in Paris.</p>
      </div>

      <div className="shop__body container">
        {/* Filter bar */}
        <div className="shop__toolbar">
          <div className="shop__filters">
            {collections.map((c) => (
              <button
                key={c.id}
                className={`shop__filter-btn ${activeCollection === c.id ? 'shop__filter-btn--active' : ''}`}
                onClick={() => handleCollection(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="shop__sort">
            <label htmlFor="sort-select">Sort</label>
            <select
              id="sort-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Count */}
        <p className="shop__count">{filtered.length} ring{filtered.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        <div className="shop__grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </main>
  );
}
