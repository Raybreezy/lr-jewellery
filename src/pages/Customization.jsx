import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Customization.css';

const FINGERS = [
  { id: 'pinky',  label: 'Pinky',  x: 8,   y: 72,  w: 24, h: 78,  rx: 12 },
  { id: 'ring',   label: 'Ring',   x: 37,  y: 44,  w: 26, h: 106, rx: 13 },
  { id: 'middle', label: 'Middle', x: 68,  y: 22,  w: 28, h: 128, rx: 14 },
  { id: 'index',  label: 'Index',  x: 101, y: 46,  w: 26, h: 104, rx: 13 },
  { id: 'thumb',  label: 'Thumb',  x: 130, y: 82,  w: 26, h: 68,  rx: 13 },
];

const MATERIALS = [
  { id: 'gold',     label: 'Gold',     desc: 'Timeless warmth' },
  { id: 'platinum', label: 'Platinum', desc: 'Rare & enduring' },
  { id: 'silver',   label: 'Silver',   desc: 'Modern elegance' },
];

const GEMSTONES = [
  { id: 'none',     label: 'No Stone',  desc: 'Clean & minimal',      price: 0 },
  { id: 'diamond',  label: 'Diamond',   desc: '0.5ct round brilliant', price: 800 },
  { id: 'sapphire', label: 'Sapphire',  desc: '1ct Ceylon blue',       price: 450 },
  { id: 'ruby',     label: 'Ruby',      desc: '0.8ct pigeon blood',    price: 600 },
];

const KARATS_BY_MATERIAL = {
  gold: [
    { id: '10k',   label: '10K',    desc: '41.7% pure gold', price: 600 },
    { id: '14k',   label: '14K',    desc: '58.3% pure gold', price: 850 },
    { id: '18k',   label: '18K',    desc: '75% pure gold',   price: 1200 },
  ],
  platinum: [{ id: '950pt', label: '950 Pt', desc: '95% platinum',  price: 1600 }],
  silver:   [{ id: '925',   label: '925',    desc: 'Sterling silver', price: 280 }],
};

export default function Customization() {
  const navigate = useNavigate();
  const { addItem, setIsOpen } = useCart();

  const [selectedHand, setSelectedHand] = useState(null);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [material, setMaterial] = useState(null);
  const [gemstone, setGemstone] = useState(null);
  const [karat, setKarat] = useState(null);

  const handleFingerSelect = (hand, fingerId) => {
    setSelectedHand(hand);
    setSelectedFinger(fingerId);
  };

  const handleMaterialSelect = (matId) => {
    setMaterial(matId);
    const karats = KARATS_BY_MATERIAL[matId];
    setKarat(karats.length === 1 ? karats[0].id : null);
  };

  const availableKarats = material ? KARATS_BY_MATERIAL[material] : [];
  const isComplete = selectedHand && selectedFinger && material && gemstone !== null && karat;

  const karatData   = availableKarats.find(k => k.id === karat);
  const gemstoneData = GEMSTONES.find(g => g.id === gemstone);
  const fingerData  = FINGERS.find(f => f.id === selectedFinger);
  const materialData = MATERIALS.find(m => m.id === material);

  const totalPrice = isComplete ? karatData.price + gemstoneData.price : 0;

  const handleCheckout = () => {
    const fingerLabel = `${fingerData.label} finger, ${selectedHand === 'left' ? 'Left' : 'Right'} hand`;
    const customItem = {
      id: `custom-${Date.now()}`,
      name: `Bespoke ${materialData.label} Ring`,
      material: `${karatData.label} ${materialData.label}${gemstone !== 'none' ? `, ${gemstoneData.label}` : ''}`,
      price: totalPrice,
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'],
      collection: 'Bespoke',
    };
    addItem(customItem, fingerLabel);
    setIsOpen(false);
    navigate('/checkout');
  };

  const steps = [
    { done: !!(selectedHand && selectedFinger), label: 'Finger' },
    { done: !!material, label: 'Material' },
    { done: gemstone !== null, label: 'Gemstone' },
    { done: !!karat, label: 'Karat' },
  ];
  const completedSteps = steps.filter(s => s.done).length;

  return (
    <main className="customization">
      <div className="customization__hero">
        <p className="customization__eyebrow">Bespoke Atelier</p>
        <h1 className="customization__title">Design Your Ring</h1>
        <p className="customization__subtitle">
          Choose a finger, select your materials, and receive an instant quote.
        </p>
        <div className="customization__progress">
          {steps.map((s, i) => (
            <div key={i} className={`progress-step ${s.done ? 'progress-step--done' : ''}`}>
              <div className="progress-step__dot" />
              <span className="progress-step__label">{s.label}</span>
            </div>
          ))}
          <div
            className="progress-step__track"
            style={{ '--progress': `${(completedSteps / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="customization__body container">
        {/* ── Hands ── */}
        <section className="customization__hands-section">
          <p className="customization__hands-prompt">
            Tap a finger to place your ring
          </p>
          <div className="customization__hands-row">
            <div className="customization__hand-wrap">
              <span className="hand-name">Left Hand</span>
              <HandSVG
                hand="left"
                selectedHand={selectedHand}
                selectedFinger={selectedFinger}
                onSelect={handleFingerSelect}
              />
            </div>
            <div className="customization__hand-wrap">
              <span className="hand-name">Right Hand</span>
              <HandSVG
                hand="right"
                selectedHand={selectedHand}
                selectedFinger={selectedFinger}
                onSelect={handleFingerSelect}
              />
            </div>
          </div>
          {selectedHand && selectedFinger && (
            <p className="customization__finger-note">
              <span className="finger-note__dot" />
              {fingerData.label} finger &mdash; {selectedHand === 'left' ? 'Left' : 'Right'} hand
            </p>
          )}
        </section>

        {/* ── Options ── */}
        <aside className="customization__options">
          <OptionGroup title="Material">
            <div className="option-group__grid option-group__grid--3">
              {MATERIALS.map(m => (
                <OptionTile
                  key={m.id}
                  label={m.label}
                  desc={m.desc}
                  selected={material === m.id}
                  onClick={() => handleMaterialSelect(m.id)}
                />
              ))}
            </div>
          </OptionGroup>

          <OptionGroup title="Gemstone">
            <div className="option-group__grid option-group__grid--4">
              {GEMSTONES.map(g => (
                <OptionTile
                  key={g.id}
                  label={g.label}
                  desc={g.desc}
                  price={g.price > 0 ? `+£${g.price.toLocaleString()}` : null}
                  selected={gemstone === g.id}
                  onClick={() => setGemstone(g.id)}
                />
              ))}
            </div>
          </OptionGroup>

          <OptionGroup title="Karat">
            {material ? (
              <div className={`option-group__grid option-group__grid--${availableKarats.length}`}>
                {availableKarats.map(k => (
                  <OptionTile
                    key={k.id}
                    label={k.label}
                    desc={k.desc}
                    price={`£${k.price.toLocaleString()}`}
                    selected={karat === k.id}
                    onClick={() => setKarat(k.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="option-group__hint">Select a material to see karat options</p>
            )}
          </OptionGroup>

          {/* ── Quote ── */}
          {isComplete && (
            <div className="customization__quote">
              <div className="quote__top">
                <div className="quote__label-row">
                  <span className="quote__eyebrow">Your Estimate</span>
                  <span className="quote__badge">Bespoke</span>
                </div>
                <div className="quote__price">
                  £{totalPrice.toLocaleString()}
                </div>
              </div>
              <ul className="quote__breakdown">
                <li>
                  <span>Ring</span>
                  <span>{karatData.label} {materialData.label} — £{karatData.price.toLocaleString()}</span>
                </li>
                {gemstone !== 'none' && (
                  <li>
                    <span>{gemstoneData.label}</span>
                    <span>+£{gemstoneData.price.toLocaleString()}</span>
                  </li>
                )}
                <li>
                  <span>Placement</span>
                  <span>{fingerData.label} finger, {selectedHand === 'left' ? 'Left' : 'Right'} hand</span>
                </li>
              </ul>
              <p className="quote__note">
                Includes bespoke sizing, hallmarking &amp; certification. Crafted in 6–8 weeks.
              </p>
              <button className="customization__checkout-btn btn-primary" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          )}

          {!isComplete && (
            <p className="customization__incomplete-hint">
              Complete all selections above to receive your quote.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}

/* ── Sub-components ── */

function HandSVG({ hand, selectedHand, selectedFinger, onSelect }) {
  const isRight = hand === 'right';
  const W = 168;
  const H = 240;
  const isActiveHand = selectedHand === hand;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="hand-svg" role="img" aria-label={`${isRight ? 'Right' : 'Left'} hand`}>
      <g transform={isRight ? `translate(${W},0) scale(-1,1)` : ''}>
        {/* Palm */}
        <rect x={6} y={142} width={156} height={92} rx={22} className="hand-palm" />
        {/* Knuckle line */}
        <line x1={12} y1={148} x2={156} y2={148} stroke="var(--hand-stroke)" strokeWidth={0.8} opacity={0.4} />
        {/* Fingers */}
        {FINGERS.map(f => {
          const active = isActiveHand && selectedFinger === f.id;
          const cx = f.x + f.w / 2;
          const cy = f.y + f.h * 0.63;
          const r  = f.w * 0.46;
          return (
            <g
              key={f.id}
              className={`finger-group ${active ? 'finger-group--active' : ''}`}
              onClick={() => onSelect(hand, f.id)}
              role="button"
              aria-label={f.label}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onSelect(hand, f.id)}
            >
              <rect
                x={f.x} y={f.y} width={f.w} height={f.h} rx={f.rx}
                className={`hand-finger ${active ? 'hand-finger--selected' : ''}`}
              />
              {/* Ring band indicator */}
              {active && (
                <>
                  <rect
                    x={f.x} y={cy - r * 0.55} width={f.w} height={r * 1.1}
                    className="ring-band"
                  />
                  <circle cx={cx} cy={cy} r={r} fill="none" className="ring-circle" strokeWidth={3} />
                </>
              )}
              {/* Knuckle crease */}
              <line
                x1={f.x + 3} y1={f.y + f.h * 0.45}
                x2={f.x + f.w - 3} y2={f.y + f.h * 0.45}
                stroke="var(--hand-stroke)" strokeWidth={0.8} opacity={0.35}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function OptionGroup({ title, children }) {
  return (
    <div className="option-group">
      <h3 className="option-group__title">{title}</h3>
      {children}
    </div>
  );
}

function OptionTile({ label, desc, price, selected, onClick }) {
  return (
    <button
      className={`option-tile ${selected ? 'option-tile--selected' : ''}`}
      onClick={onClick}
    >
      {selected && <span className="option-tile__check" aria-hidden="true">✓</span>}
      <span className="option-tile__label">{label}</span>
      <span className="option-tile__desc">{desc}</span>
      {price && <span className="option-tile__price">{price}</span>}
    </button>
  );
}
