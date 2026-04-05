import { useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Customization.css';

/* ─── Data ──────────────────────────────────────────────────────────── */

const FINGERS = [
  { id: 'pinky',  label: 'Pinky',  x: 8,   y: 72,  w: 24, h: 78,  rx: 12 },
  { id: 'ring',   label: 'Ring',   x: 37,  y: 44,  w: 26, h: 106, rx: 13 },
  { id: 'middle', label: 'Middle', x: 68,  y: 22,  w: 28, h: 128, rx: 14 },
  { id: 'index',  label: 'Index',  x: 101, y: 46,  w: 26, h: 104, rx: 13 },
  { id: 'thumb',  label: 'Thumb',  x: 130, y: 82,  w: 26, h: 68,  rx: 13 },
];

const BANDS = [
  { id: 'gold',       label: 'Gold',       desc: 'Classic warmth',       swatch: '#C9A84C', price: 700  },
  { id: 'rose-gold',  label: 'Rose Gold',  desc: 'Romantic blush tone',  swatch: '#C27B5A', price: 720  },
  { id: 'white-gold', label: 'White Gold', desc: 'Sleek & contemporary', swatch: '#D8D8D8', price: 750  },
  { id: 'platinum',   label: 'Platinum',   desc: 'Rare & enduring',      swatch: '#B8B8CC', price: 1400 },
  { id: 'silver',     label: 'Silver',     desc: 'Modern elegance',      swatch: '#C0C0C0', price: 280  },
];

const GEMSTONES = [
  { id: 'none',       label: 'No Stone',   desc: 'Clean & minimal',      swatch: null,      price: 0   },
  { id: 'diamond',    label: 'Diamond',    desc: '0.5ct brilliant cut',  swatch: '#B8E4F9', price: 850 },
  { id: 'sapphire',   label: 'Sapphire',   desc: '1ct Ceylon blue',      swatch: '#1A4FC4', price: 480 },
  { id: 'ruby',       label: 'Ruby',       desc: '0.8ct pigeon blood',   swatch: '#CC1818', price: 620 },
  { id: 'aquamarine', label: 'Aquamarine', desc: '1.2ct sea blue-green', swatch: '#20C8D8', price: 380 },
  { id: 'emerald',    label: 'Emerald',    desc: '0.7ct Colombian',      swatch: '#186840', price: 720 },
  { id: 'topaz',      label: 'Topaz',      desc: '1ct golden amber',     swatch: '#E09020', price: 320 },
];

const RING_STYLES = [
  { id: 'solitaire',   label: 'Solitaire',  desc: 'Single stone, timeless',      price: 0   },
  { id: 'halo',        label: 'Halo',        desc: 'Centre stone with surround',  price: 250 },
  { id: 'three-stone', label: 'Three Stone', desc: 'Past, present & future',      price: 350 },
  { id: 'pave',        label: 'Pavé',         desc: 'Stone-set band throughout',   price: 300 },
  { id: 'vintage',     label: 'Vintage',      desc: 'Ornate, heirloom-inspired',   price: 400 },
];

const SIZES = [46, 48, 50, 52, 54, 56, 58, 60, 62, 64];

const SIZE_GUIDE_DATA = [
  { eu: 46, uk: 'H½', us: '4',   diam: '14.6' },
  { eu: 48, uk: 'J½', us: '4¾',  diam: '15.3' },
  { eu: 50, uk: 'K½', us: '5¼',  diam: '15.9' },
  { eu: 52, uk: 'M',  us: '6',   diam: '16.6' },
  { eu: 54, uk: 'N½', us: '7',   diam: '17.2' },
  { eu: 56, uk: 'P',  us: '7¾',  diam: '17.8' },
  { eu: 58, uk: 'Q½', us: '8½',  diam: '18.5' },
  { eu: 60, uk: 'S',  us: '9½',  diam: '19.1' },
  { eu: 62, uk: 'T½', us: '10',  diam: '19.7' },
  { eu: 64, uk: 'V',  us: '11',  diam: '20.4' },
];

const METAL_VIS = {
  'gold':       { light: '#F0D870', mid: '#C9A84C', dark: '#9A7820' },
  'rose-gold':  { light: '#ECBCA0', mid: '#C27B5A', dark: '#9A5438' },
  'white-gold': { light: '#F8F8F8', mid: '#D8D8D8', dark: '#A8A8A8' },
  'platinum':   { light: '#E8E8F4', mid: '#B8B8CC', dark: '#8080A0' },
  'silver':     { light: '#ECECEC', mid: '#C0C0C0', dark: '#888888' },
};

const GEM_VIS = {
  'diamond':    { main: '#C8EEFF', dark: '#70B8E0', glow: 'rgba(160,210,255,0.5)' },
  'sapphire':   { main: '#2255CC', dark: '#10207A', glow: 'rgba(40,90,210,0.5)'  },
  'ruby':       { main: '#DD1818', dark: '#880808', glow: 'rgba(210,30,30,0.5)'  },
  'aquamarine': { main: '#20D0E0', dark: '#109090', glow: 'rgba(30,200,220,0.5)' },
  'emerald':    { main: '#1A7848', dark: '#0A3828', glow: 'rgba(30,120,70,0.5)'  },
  'topaz':      { main: '#E89818', dark: '#885008', glow: 'rgba(220,150,30,0.5)' },
};

const STEP_LABELS = ['Finger', 'Band', 'Gemstone', 'Style', 'Size'];

/* ─── Main Component ────────────────────────────────────────────────── */

export default function Customization() {
  const navigate = useNavigate();
  const { addItem, setIsOpen } = useCart();
  const fileInputRef = useRef(null);

  const [step,          setStep]          = useState(1);
  const [selectedHand,  setSelectedHand]  = useState(null);
  const [selectedFinger,setSelectedFinger]= useState(null);
  const [band,          setBand]          = useState(null);
  const [gemstone,      setGemstone]      = useState(null);
  const [ringStyle,     setRingStyle]     = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fingerSize,    setFingerSize]    = useState(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const bandData   = BANDS.find(b => b.id === band);
  const gemData    = GEMSTONES.find(g => g.id === gemstone);
  const styleData  = RING_STYLES.find(s => s.id === ringStyle);
  const fingerData = FINGERS.find(f => f.id === selectedFinger);
  const metalVis   = METAL_VIS[band] || null;
  const gemVis     = (gemstone && gemstone !== 'none') ? GEM_VIS[gemstone] : null;

  const stepValid = [
    !!(selectedHand && selectedFinger),
    !!band,
    gemstone !== null,
    !!(ringStyle || uploadedImage),
    !!fingerSize,
  ];
  const allDone = stepValid.every(Boolean);

  const stylePrice = uploadedImage ? 500 : (styleData?.price ?? 0);
  const totalPrice = allDone
    ? (bandData?.price ?? 0) + (gemData?.price ?? 0) + stylePrice
    : 0;

  const handleFingerSelect = (hand, finger) => {
    setSelectedHand(hand);
    setSelectedFinger(finger);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedImage(URL.createObjectURL(file));
    setRingStyle(null);
  };

  const goNext = () => {
    if (!stepValid[step - 1]) return;
    setStep(s => (s === 5 ? 6 : s + 1));
  };
  const goBack = () => setStep(s => Math.max(s - 1, 1));

  const handleCheckout = () => {
    const fingerLabel = `${fingerData.label} finger, ${selectedHand === 'left' ? 'Left' : 'Right'} hand`;
    addItem({
      id: `bespoke-${Date.now()}`,
      name: `Bespoke ${bandData.label} Ring`,
      material: `${bandData.label}${gemstone !== 'none' ? `, ${gemData.label}` : ''}`,
      price: totalPrice,
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'],
      collection: 'Bespoke',
    }, fingerLabel);
    setIsOpen(false);
    navigate('/checkout');
  };

  /* ── Render ─────────────────────────────────────────────────────── */
  return (
    <main className="cust">

      {/* Hero */}
      <div className="cust__hero">
        <p className="cust__eyebrow">Bespoke Atelier</p>
        <h1 className="cust__title">Design Your Ring</h1>
        <p className="cust__subtitle">
          Craft a ring that is entirely your own — from metal to gemstone, style to fit.
        </p>
      </div>

      {/* Stepper */}
      {step < 6 && (
        <div className="cust__stepper-wrap">
          <div className="cust__stepper container">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const active = step === n;
              const done = stepValid[i];
              const canJump = n < step || stepValid.slice(0, n - 1).every(Boolean);
              return (
                <Fragment key={n}>
                  <button
                    className={`cust-step ${active ? 'cust-step--active' : ''} ${done && !active ? 'cust-step--done' : ''}`}
                    onClick={() => canJump && setStep(n)}
                    disabled={!canJump}
                  >
                    <span className="cust-step__bubble">{done && !active ? '✓' : n}</span>
                    <span className="cust-step__label">{label}</span>
                  </button>
                  {i < 4 && (
                    <div className={`cust-step__connector ${stepValid[i] ? 'cust-step__connector--done' : ''}`} />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Wizard body (steps 1–5) ── */}
      {step < 6 && (
        <div className="cust__body container">

          {/* Left: live preview */}
          <aside className="cust__preview">
            <p className="cust__preview-label">Live Preview</p>
            <div className="cust__hands-row">
              {['left', 'right'].map(hand => (
                <div className="cust__hand-wrap" key={hand}>
                  <span className="cust__hand-name">{hand === 'left' ? 'Left' : 'Right'}</span>
                  <HandSVG
                    hand={hand}
                    selectedHand={selectedHand}
                    selectedFinger={selectedFinger}
                    metalVis={metalVis}
                    gemVis={gemVis}
                    onSelect={handleFingerSelect}
                  />
                </div>
              ))}
            </div>

            {selectedFinger && (
              <p className="cust__sel-note">
                <span className="sel-dot" />
                {fingerData.label} · {selectedHand === 'left' ? 'Left' : 'Right'}
                {fingerSize ? ` · EU ${fingerSize}` : ''}
              </p>
            )}

            {band && (
              <div className="cust__mini-chips">
                <span className="mini-chip" style={{ '--c': bandData.swatch }}>{bandData.label}</span>
                {gemstone && gemstone !== 'none' && (
                  <span className="mini-chip" style={{ '--c': gemData.swatch }}>{gemData.label}</span>
                )}
                {(ringStyle || uploadedImage) && (
                  <span className="mini-chip" style={{ '--c': 'var(--color-grey)' }}>
                    {uploadedImage ? 'Custom' : styleData.label}
                  </span>
                )}
              </div>
            )}
          </aside>

          {/* Right: step content */}
          <div className="cust__wizard">

            {/* Step 1 — Finger */}
            {step === 1 && (
              <StepPanel num="01" title="Choose Your Finger" desc="Select a hand and finger from the preview on the left.">
                {!selectedFinger ? (
                  <div className="step-hint-box">
                    <span className="step-hint-arrow">←</span>
                    <p>Click any finger on the hand preview to get started.</p>
                  </div>
                ) : (
                  <div className="step-chip">
                    <span className="step-chip__dot" />
                    <div>
                      <p className="step-chip__main">{fingerData.label} Finger</p>
                      <p className="step-chip__sub">{selectedHand === 'left' ? 'Left' : 'Right'} Hand</p>
                    </div>
                  </div>
                )}
              </StepPanel>
            )}

            {/* Step 2 — Band */}
            {step === 2 && (
              <StepPanel num="02" title="Band Style" desc="Choose the metal that best reflects your taste.">
                <div className="band-grid">
                  {BANDS.map(b => (
                    <button
                      key={b.id}
                      className={`band-tile ${band === b.id ? 'band-tile--on' : ''}`}
                      onClick={() => setBand(b.id)}
                    >
                      <span className="band-tile__swatch" style={{ background: b.swatch }} />
                      <span className="band-tile__name">{b.label}</span>
                      <span className="band-tile__desc">{b.desc}</span>
                      <span className="band-tile__price">£{b.price.toLocaleString()}</span>
                      {band === b.id && <span className="tile-check">✓</span>}
                    </button>
                  ))}
                </div>
              </StepPanel>
            )}

            {/* Step 3 — Gemstone */}
            {step === 3 && (
              <StepPanel num="03" title="Gemstone" desc="Add a centrepiece gemstone, or keep the band clean.">
                <div className="gem-grid">
                  {GEMSTONES.map(g => (
                    <button
                      key={g.id}
                      className={`gem-tile ${gemstone === g.id ? 'gem-tile--on' : ''}`}
                      onClick={() => setGemstone(g.id)}
                    >
                      <span
                        className="gem-tile__stone"
                        style={g.swatch
                          ? { background: `radial-gradient(ellipse at 35% 28%, rgba(255,255,255,0.6), ${g.swatch} 70%)` }
                          : { background: 'var(--color-cream)', border: '1px dashed var(--color-grey-light)' }
                        }
                      />
                      <span className="gem-tile__name">{g.label}</span>
                      <span className="gem-tile__desc">{g.desc}</span>
                      {g.price > 0 && <span className="gem-tile__price">+£{g.price.toLocaleString()}</span>}
                      {gemstone === g.id && <span className="tile-check">✓</span>}
                    </button>
                  ))}
                </div>
              </StepPanel>
            )}

            {/* Step 4 — Style */}
            {step === 4 && (
              <StepPanel num="04" title="Ring Style" desc="Pick a setting or upload a reference image for a fully custom design.">
                <div className="style-grid">
                  {RING_STYLES.map(s => (
                    <button
                      key={s.id}
                      className={`style-tile ${ringStyle === s.id && !uploadedImage ? 'style-tile--on' : ''}`}
                      onClick={() => { setRingStyle(s.id); setUploadedImage(null); }}
                    >
                      <StyleIcon id={s.id} />
                      <span className="style-tile__name">{s.label}</span>
                      <span className="style-tile__desc">{s.desc}</span>
                      {s.price > 0 && <span className="style-tile__price">+£{s.price}</span>}
                      {ringStyle === s.id && !uploadedImage && <span className="tile-check">✓</span>}
                    </button>
                  ))}
                </div>

                <div className="upload-divider"><span>or upload your own design</span></div>

                <div
                  className={`upload-zone ${uploadedImage ? 'upload-zone--filled' : ''}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {uploadedImage ? (
                    <div className="upload-preview">
                      <img src={uploadedImage} alt="Your design reference" />
                      <div className="upload-preview__info">
                        <p className="upload-preview__title">Custom design uploaded</p>
                        <p className="upload-preview__note">+£500 fully bespoke service</p>
                        <button
                          className="upload-preview__remove"
                          onClick={e => { e.stopPropagation(); setUploadedImage(null); }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <UploadIcon />
                      <p className="upload-zone__title">Upload Design Reference</p>
                      <p className="upload-zone__hint">JPG, PNG or PDF · Max 10MB</p>
                      <p className="upload-zone__price">+£500 fully bespoke</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                </div>
              </StepPanel>
            )}

            {/* Step 5 — Size */}
            {step === 5 && (
              <StepPanel num="05" title="Finger Size" desc="Select your ring size in EU measurement.">
                <div className="size-grid">
                  {SIZES.map(sz => (
                    <button
                      key={sz}
                      className={`size-btn ${fingerSize === sz ? 'size-btn--on' : ''}`}
                      onClick={() => setFingerSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <button className="size-guide-link" onClick={() => setSizeGuideOpen(true)}>
                  <RulerIcon /> Ring Size Guide — How to measure your finger
                </button>
              </StepPanel>
            )}

            {/* Navigation */}
            <div className="cust__nav">
              {step > 1 && (
                <button className="cust__nav-back" onClick={goBack}>← Back</button>
              )}
              <button
                className={`cust__nav-next btn-primary ${!stepValid[step - 1] ? 'btn-dim' : ''}`}
                onClick={goNext}
                disabled={!stepValid[step - 1]}
              >
                {step === 5 ? 'Get My Quote →' : 'Continue →'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Quote + 3D Preview (step 6) ── */}
      {step === 6 && (
        <div className="cust__reveal container">
          <div className="reveal__header">
            <p className="reveal__eyebrow">Your Creation</p>
            <h2 className="reveal__title">Your Bespoke Ring</h2>
            <p className="reveal__sub">Here is how your ring will look, crafted to your exact specifications.</p>
          </div>

          <div className="reveal__grid">
            {/* Ring visuals */}
            <div className="reveal__visuals">
              <p className="visual-section-label">On Your Finger</p>
              <div className="visual-finger-wrap">
                <RingOnFingerSVG metalVis={metalVis} gemVis={gemVis} gemstone={gemstone} />
              </div>
              <p className="visual-section-label">3D Ring Preview</p>
              <div className="visual-ring-wrap">
                <StandaloneRingSVG metalVis={metalVis} gemVis={gemVis} gemstone={gemstone} />
              </div>
            </div>

            {/* Quote card */}
            <div className="reveal__quote">
              <p className="quote__eyebrow">Your Bespoke Quote</p>
              <div className="quote__price">£{totalPrice.toLocaleString()}</div>

              <ul className="quote__breakdown">
                <li>
                  <span>Band</span>
                  <span>{bandData.label} — £{bandData.price.toLocaleString()}</span>
                </li>
                {gemstone !== 'none' && (
                  <li>
                    <span>Gemstone</span>
                    <span>{gemData.label} — +£{gemData.price.toLocaleString()}</span>
                  </li>
                )}
                <li>
                  <span>Style</span>
                  <span>
                    {uploadedImage
                      ? 'Custom Design — +£500'
                      : styleData.price > 0
                        ? `${styleData.label} — +£${styleData.price}`
                        : `${styleData.label} — Included`}
                  </span>
                </li>
                <li>
                  <span>Finger</span>
                  <span>{fingerData.label} · {selectedHand === 'left' ? 'Left' : 'Right'} hand</span>
                </li>
                <li>
                  <span>Ring Size</span>
                  <span>EU {fingerSize}</span>
                </li>
              </ul>

              <div className="quote__perks">
                <p>✓ Hallmarked &amp; certified</p>
                <p>✓ Complimentary engraving</p>
                <p>✓ Complimentary resizing (once)</p>
                <p>✓ Delivered in 6–8 weeks</p>
              </div>

              <button className="quote__checkout btn-primary" onClick={handleCheckout}>
                Confirm &amp; Proceed to Checkout
              </button>
              <button className="quote__edit" onClick={() => setStep(1)}>
                ← Edit Your Design
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size guide modal */}
      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} />}
    </main>
  );
}

/* ─── Step Panel Wrapper ─────────────────────────────────────────────── */

function StepPanel({ num, title, desc, children }) {
  return (
    <div className="step-panel">
      <div className="step-panel__header">
        <span className="step-panel__num">{num}</span>
        <div>
          <h2 className="step-panel__title">{title}</h2>
          <p className="step-panel__desc">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── Hand SVG ───────────────────────────────────────────────────────── */

function HandSVG({ hand, selectedHand, selectedFinger, metalVis, gemVis, onSelect }) {
  const isRight = hand === 'right';
  const W = 168;
  const isActive = selectedHand === hand;

  return (
    <svg
      viewBox={`0 0 ${W} 240`}
      className="hand-svg"
      role="img"
      aria-label={`${isRight ? 'Right' : 'Left'} hand`}
    >
      <g transform={isRight ? `translate(${W},0) scale(-1,1)` : ''}>
        {/* Palm */}
        <rect x={6} y={142} width={156} height={92} rx={22} className="hand-palm" />
        <line x1={12} y1={150} x2={156} y2={150} stroke="var(--hand-stroke)" strokeWidth={0.8} opacity={0.3} />

        {/* Fingers */}
        {FINGERS.map(f => {
          const sel = isActive && selectedFinger === f.id;
          const cx = f.x + f.w / 2;
          const bandY = f.y + f.h * 0.56;
          const bandH = f.w * 0.44;

          return (
            <g
              key={f.id}
              className={`fgrp ${sel ? 'fgrp--sel' : ''}`}
              onClick={() => onSelect(hand, f.id)}
              role="button"
              tabIndex={0}
              aria-label={`${f.label} finger`}
              onKeyDown={e => e.key === 'Enter' && onSelect(hand, f.id)}
            >
              <rect
                x={f.x} y={f.y} width={f.w} height={f.h} rx={f.rx}
                className={`hfinger ${sel ? 'hfinger--sel' : ''}`}
              />
              {/* Knuckle crease */}
              <line
                x1={f.x + 3} y1={f.y + f.h * 0.44}
                x2={f.x + f.w - 3} y2={f.y + f.h * 0.44}
                stroke="var(--hand-stroke)" strokeWidth={0.8} opacity={0.28}
              />

              {/* Ring on finger: with metal color */}
              {sel && metalVis && (
                <>
                  <rect
                    x={f.x - 3} y={bandY - bandH / 2}
                    width={f.w + 6} height={bandH}
                    rx={3}
                    fill={metalVis.mid}
                    stroke={metalVis.dark}
                    strokeWidth={0.8}
                  />
                  <rect
                    x={f.x} y={bandY - bandH / 2 + 2}
                    width={f.w} height={bandH * 0.35}
                    rx={1}
                    fill={metalVis.light}
                    opacity={0.55}
                  />
                  {gemVis && (
                    <>
                      <polygon
                        points={`${cx},${bandY - bandH / 2 - 14} ${cx - 8},${bandY - bandH / 2 - 2} ${cx + 8},${bandY - bandH / 2 - 2}`}
                        fill={gemVis.main}
                        stroke={gemVis.dark}
                        strokeWidth={0.6}
                      />
                      <polygon
                        points={`${cx},${bandY - bandH / 2 - 14} ${cx - 8},${bandY - bandH / 2 - 2} ${cx},${bandY - bandH / 2 - 8}`}
                        fill="rgba(255,255,255,0.35)"
                      />
                    </>
                  )}
                </>
              )}

              {/* Ring placeholder (no metal chosen yet) */}
              {sel && !metalVis && (
                <circle
                  cx={cx} cy={bandY}
                  r={f.w * 0.48}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth={3}
                  strokeDasharray="3 2"
                />
              )}
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ─── Ring on Finger SVG (quote view) ───────────────────────────────── */

function RingOnFingerSVG({ metalVis, gemVis, gemstone }) {
  if (!metalVis) return null;
  const { light, mid, dark } = metalVis;

  return (
    <svg viewBox="0 0 160 320" className="ring-finger-svg" aria-label="Ring on finger">
      {/* Fingernail */}
      <path d="M 67 52 Q 67 22 80 22 Q 93 22 93 52" fill="#EFE0C8" stroke="#D8C0A0" strokeWidth="1" />
      <path d="M 71 54 Q 71 30 80 30 Q 89 30 89 54" fill="rgba(255,255,255,0.18)" />

      {/* Finger body */}
      <path
        d="M 60 55 L 60 295 Q 60 315 80 315 Q 100 315 100 295 L 100 55 Q 100 28 80 28 Q 60 28 60 55 Z"
        fill="#F0E0C8" stroke="#D4B898" strokeWidth="1"
      />
      {/* Shading sides */}
      <rect x={60} y={55} width={6} height={240} fill="rgba(0,0,0,0.06)" />
      <rect x={94} y={55} width={6} height={240} fill="rgba(0,0,0,0.06)" />

      {/* Knuckle creases */}
      <path d="M 63 168 Q 80 171 97 168" fill="none" stroke="#D4B898" strokeWidth="1" opacity="0.45" />
      <path d="M 63 222 Q 80 225 97 222" fill="none" stroke="#D4B898" strokeWidth="1" opacity="0.45" />

      {/* Ring shadow on finger */}
      <ellipse cx="80" cy="136" rx="23" ry="5" fill="rgba(0,0,0,0.1)" />

      {/* Ring: left wrap */}
      <path d="M 54 124 L 54 144 Q 54 148 58 148 L 60 148 L 60 124 Z" fill={dark} opacity="0.75" />
      {/* Ring: right wrap */}
      <path d="M 100 124 L 102 124 Q 106 124 106 128 L 106 144 Q 106 148 102 148 L 100 148 Z" fill={dark} opacity="0.75" />
      {/* Ring band face */}
      <rect x={54} y={124} width={52} height={22} fill={mid} />
      {/* Ring bottom edge shadow */}
      <rect x={54} y={143} width={52} height={3} fill={dark} opacity={0.4} />
      {/* Ring highlight */}
      <rect x={57} y={126} width={24} height={6} rx={2} fill={light} opacity={0.6} />
      <rect x={57} y={125} width={46} height={2} rx={1} fill="rgba(255,255,255,0.28)" />

      {/* Gemstone */}
      {gemVis && gemstone !== 'none' && (
        <>
          {/* Prongs */}
          <rect x={75} y={100} width={4} height={18} rx={2} fill={mid} />
          <rect x={81} y={100} width={4} height={18} rx={2} fill={mid} />
          {/* Gem body */}
          <polygon points="80,76 65,102 80,110 95,102" fill={gemVis.main} />
          <polygon points="80,76 65,102 80,94"          fill="rgba(255,255,255,0.38)" />
          <polygon points="80,76 95,102 80,94"          fill={gemVis.main} opacity={0.72} />
          <polygon points="80,110 65,102 80,105 95,102" fill={gemVis.dark} opacity={0.55} />
          {/* Sparkle */}
          <polygon points="72,82 68,93 74,88" fill="rgba(255,255,255,0.5)" />
          {/* Glow */}
          <ellipse cx="80" cy="92" rx="13" ry="10" fill={gemVis.glow} opacity={0.35} />
        </>
      )}
    </svg>
  );
}

/* ─── Standalone Ring SVG (3D perspective view) ─────────────────────── */

function StandaloneRingSVG({ metalVis, gemVis, gemstone }) {
  if (!metalVis) return null;
  const { light, mid, dark } = metalVis;
  const BG = '#FAF9F6';

  return (
    <svg viewBox="0 0 240 185" className="standalone-ring-svg" aria-label="3D ring preview">
      {/* Drop shadow */}
      <ellipse cx="120" cy="168" rx="74" ry="10" fill="rgba(0,0,0,0.08)" />

      {/* Bottom arc (back of ring, partially visible) */}
      <path d="M 44 108 A 76 28 0 0 0 196 108" fill={dark} opacity="0.65" />

      {/* Band side walls */}
      <path d="M 44 84 L 44 108 A 76 28 0 0 0 196 108 L 196 84 A 76 28 0 0 1 44 84 Z" fill={mid} />

      {/* Inner wall */}
      <path d="M 70 89 A 50 18 0 0 1 170 89 L 170 107 A 50 18 0 0 0 70 107 Z" fill={BG} opacity="0.88" />

      {/* Top face ellipse */}
      <ellipse cx="120" cy="84" rx="76" ry="28" fill={light} stroke={dark} strokeWidth="0.8" />

      {/* Inner hole */}
      <ellipse cx="120" cy="84" rx="50" ry="18" fill={BG} />

      {/* Inner depth shadow */}
      <ellipse cx="120" cy="90" rx="50" ry="18" fill="rgba(0,0,0,0.06)" />

      {/* Ring shine */}
      <ellipse
        cx="88" cy="80" rx="20" ry="7"
        fill="rgba(255,255,255,0.35)"
        transform="rotate(-18 88 80)"
      />

      {/* Gemstone */}
      {gemVis && gemstone !== 'none' && (
        <>
          {/* Prongs */}
          <rect x="113" y="46" width="4" height="22" rx="2" fill={mid} />
          <rect x="123" y="46" width="4" height="22" rx="2" fill={mid} />
          {/* Gem body */}
          <polygon points="120,22 104,50 120,58 136,50" fill={gemVis.main} />
          <polygon points="120,22 104,50 120,42"        fill="rgba(255,255,255,0.38)" />
          <polygon points="120,22 136,50 120,42"        fill={gemVis.main} opacity={0.72} />
          <polygon points="120,58 104,50 120,52 136,50" fill={gemVis.dark} opacity={0.55} />
          {/* Sparkle */}
          <polygon points="110,30 106,42 112,37" fill="rgba(255,255,255,0.5)" />
          {/* Glow */}
          <ellipse cx="120" cy="38" rx="15" ry="11" fill={gemVis.glow} opacity={0.38} />
        </>
      )}
    </svg>
  );
}

/* ─── Style Icon ─────────────────────────────────────────────────────── */

function StyleIcon({ id }) {
  const s = { width: 36, height: 36, viewBox: '0 0 40 40', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8 };
  if (id === 'solitaire') return (
    <svg {...s} className="style-icon">
      <circle cx="20" cy="22" r="13" />
      <polygon points="20,6 14,18 20,22 26,18" fill="currentColor" stroke="none" />
    </svg>
  );
  if (id === 'halo') return (
    <svg {...s} className="style-icon">
      <circle cx="20" cy="22" r="13" />
      <circle cx="20" cy="16" r="4" fill="currentColor" stroke="none" />
      <circle cx="20" cy="16" r="7" strokeDasharray="2 1.5" />
    </svg>
  );
  if (id === 'three-stone') return (
    <svg {...s} className="style-icon">
      <circle cx="20" cy="22" r="13" />
      <polygon points="20,7 17,16 20,18 23,16"  fill="currentColor" stroke="none" />
      <polygon points="12,12 10,19 13,20 15,19" fill="currentColor" stroke="none" opacity="0.6" />
      <polygon points="28,12 25,19 27,20 30,19" fill="currentColor" stroke="none" opacity="0.6" />
    </svg>
  );
  if (id === 'pave') return (
    <svg {...s} className="style-icon">
      <circle cx="20" cy="22" r="13" />
      {[0,40,80,120,160,200,240,280,320].map(a => (
        <circle
          key={a}
          cx={20 + 10.5 * Math.cos(a * Math.PI / 180)}
          cy={22 + 10.5 * Math.sin(a * Math.PI / 180)}
          r="1.8" fill="currentColor" stroke="none" opacity="0.7"
        />
      ))}
    </svg>
  );
  if (id === 'vintage') return (
    <svg {...s} className="style-icon">
      <circle cx="20" cy="22" r="13" />
      <polygon points="20,8 17,15 20,17 23,15" fill="currentColor" stroke="none" />
      <path d="M 13 15 Q 9 22 13 29" strokeWidth="1.4" />
      <path d="M 27 15 Q 31 22 27 29" strokeWidth="1.4" />
      <circle cx="13" cy="15" r="2" fill="currentColor" stroke="none" />
      <circle cx="27" cy="15" r="2" fill="currentColor" stroke="none" />
      <circle cx="13" cy="29" r="2" fill="currentColor" stroke="none" />
      <circle cx="27" cy="29" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
  return null;
}

/* ─── Size Guide Modal ───────────────────────────────────────────────── */

function SizeGuideModal({ onClose }) {
  return (
    <div className="sg-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Ring Size Guide">
      <div className="sg-panel" onClick={e => e.stopPropagation()}>
        <div className="sg-header">
          <h3 className="sg-title">Ring Size Guide</h3>
          <button className="sg-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="sg-body">
          <div className="sg-how">
            <h4>How to measure your finger</h4>
            <ol>
              <li>Wrap a thin strip of paper snugly around your finger.</li>
              <li>Mark where the paper overlaps to form a complete circle.</li>
              <li>Measure the length in millimetres — this is your circumference.</li>
              <li>Divide by 3.14 to get your diameter, then find your size below.</li>
            </ol>
            <p className="sg-tip">Measure at the end of the day when fingers are at their largest. Between sizes? Order the larger size.</p>
          </div>
          <table className="sg-table">
            <thead>
              <tr><th>EU</th><th>UK</th><th>US</th><th>Diameter (mm)</th></tr>
            </thead>
            <tbody>
              {SIZE_GUIDE_DATA.map(r => (
                <tr key={r.eu}>
                  <td>{r.eu}</td><td>{r.uk}</td><td>{r.us}</td><td>{r.diam}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sg-note">
            All bespoke rings can be resized once, free of charge, within 12 months of delivery.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Icons ──────────────────────────────────────────────────────────── */

function UploadIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function RulerIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="10" rx="1" />
      <line x1="6"  y1="7"  x2="6"  y2="11" />
      <line x1="10" y1="7"  x2="10" y2="17" />
      <line x1="14" y1="7"  x2="14" y2="11" />
      <line x1="18" y1="7"  x2="18" y2="11" />
    </svg>
  );
}
