export const products = [
  {
    id: 'ring-001',
    name: 'Lumière Solitaire',
    collection: 'Eternal',
    price: 4800,
    material: '18k White Gold, 1.2ct Diamond',
    description:
      'A timeless solitaire of breathtaking clarity. Set in cool 18k white gold with a hand-selected round brilliant diamond, the Lumière captures light from every angle — an enduring symbol of devotion.',
    details: [
      'Centre stone: 1.2ct round brilliant diamond (VVS2, E colour)',
      'Setting: four-claw 18k white gold',
      'Band width: 1.8mm',
      'Hallmarked and certified',
    ],
    sizes: ['46', '48', '50', '52', '54', '56', '58'],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
      'https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=800&q=80',
    ],
    featured: true,
    badge: null,
  },
  {
    id: 'ring-002',
    name: 'Pavé Éternity Band',
    collection: 'Eternal',
    price: 3200,
    material: '18k Yellow Gold, Diamond Pavé',
    description:
      'A continuous circle of hand-set pavé diamonds in warm 18k yellow gold. Wearable alone or stacked, the Éternity Band is as versatile as it is beautiful.',
    details: [
      'Total carat weight: 0.85ct',
      'Setting: micro-pavé 18k yellow gold',
      'Band width: 2.5mm',
      'Full eternity design',
    ],
    sizes: ['46', '48', '50', '52', '54', '56', '58'],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
    ],
    featured: true,
    badge: 'Bestseller',
  },
  {
    id: 'ring-003',
    name: 'Floral Alhambra',
    collection: 'Jardin',
    price: 5600,
    material: '18k Rose Gold, Mother of Pearl',
    description:
      'Inspired by the lucky clover, four blossoms of mother of pearl are set in a soft 18k rose gold frame. A garden of fortune to wear every day.',
    details: [
      'Four clover motifs in mother of pearl',
      'Frame: 18k rose gold',
      'Stone: natural white mother of pearl',
      'Timeless talisman design',
    ],
    sizes: ['48', '50', '52', '54', '56'],
    images: [
      'https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80',
    ],
    featured: true,
    badge: 'New',
  },
  {
    id: 'ring-004',
    name: 'Baguette Stack',
    collection: 'Moderne',
    price: 2600,
    material: '18k White Gold, Baguette Diamonds',
    description:
      'A sleek row of step-cut baguette diamonds channel-set in 18k white gold. Architectural precision meets quiet glamour.',
    details: [
      'Five baguette diamonds, total 0.60ct',
      'Channel setting in 18k white gold',
      'Band width: 3mm',
      'Stackable profile',
    ],
    sizes: ['46', '48', '50', '52', '54', '56', '58'],
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=800&q=80',
    ],
    featured: false,
    badge: null,
  },
  {
    id: 'ring-005',
    name: 'Sapphire Halo',
    collection: 'Lumière',
    price: 6400,
    material: '18k White Gold, Blue Sapphire & Diamonds',
    description:
      'A cushion-cut Ceylon sapphire of deep cornflower blue, haloed by brilliant-cut diamonds. A statement of royal refinement.',
    details: [
      'Centre stone: 1.8ct cushion-cut Ceylon sapphire',
      'Halo: 0.40ct brilliant diamond surround',
      'Setting: 18k white gold',
      'GIA-certified sapphire',
    ],
    sizes: ['48', '50', '52', '54', '56'],
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    ],
    featured: false,
    badge: 'Limited',
  },
  {
    id: 'ring-007',
    name: 'Moissanite Wedding Band',
    collection: 'Eternal',
    price: 149,
    material: 'S925 Sterling Silver, 18K Gold Plated, Moissanite',
    description:
      'A brilliant moissanite wedding band crafted in S925 sterling silver with an 18k gold plating. Lab-created moissanite stones deliver the fire and brilliance of diamond at an accessible price — a modern symbol of lasting commitment.',
    details: [
      'Stone: lab-created moissanite (diamond alternative)',
      'Base metal: S925 sterling silver',
      'Plating: 18k gold',
      'Hypoallergenic',
    ],
    sizes: ['46', '48', '50', '52', '54', '56', '58'],
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
    ],
    featured: false,
    badge: 'New',
  },
  {
    id: 'ring-006',
    name: 'Rose Cut Signet',
    collection: 'Moderne',
    price: 1900,
    material: '18k Yellow Gold',
    description:
      'A refined take on the classic signet. The domed rose-cut surface catches light with quiet drama — an heirloom for the modern wearer.',
    details: [
      'Solid 18k yellow gold',
      'Rose-cut domed face: 12mm × 10mm',
      'Comfort-fit band',
      'Engravable interior',
    ],
    sizes: ['46', '48', '50', '52', '54', '56', '58', '60'],
    images: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
    ],
    featured: false,
    badge: null,
  },
];

export const collections = [
  { id: 'all', label: 'All Rings' },
  { id: 'Eternal', label: 'Eternal' },
  { id: 'Jardin', label: 'Jardin' },
  { id: 'Lumière', label: 'Lumière' },
  { id: 'Moderne', label: 'Moderne' },
];

export function getProductById(id) {
  return products.find((p) => p.id === id) ?? null;
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}
