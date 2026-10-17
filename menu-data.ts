/**
 * CARTHAGE BEACH — Carte officielle.
 * Source : photos du menu fournies par le restaurant (carte des boissons + carte restaurant).
 * Les noms et les prix sont repris exactement tels qu'ils apparaissent sur la carte.
 * Aucun produit ni prix n'a été inventé.
 */

export type SeedProduct = {
  name: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  price: string; // en DT
  imageUrl?: string;
  isFeatured?: boolean;
  needsReview?: boolean;
};

export type SeedCategory = {
  slug: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  description?: string;
  menuType: "food" | "drink";
  icon: string;
  products: SeedProduct[];
};

export const MENU_SEED: SeedCategory[] = [
  /* ------------------------------------------------------------------ */
  /*  RESTAURANT — Hot Plats / Les Entrées Chaudes                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "entrees-chaudes",
    name: "Entrées Chaudes",
    nameAr: "المفتحات الساخنة",
    nameEn: "Hot Plats",
    description: "Briks, ojjas et spécialités chaudes de la maison.",
    menuType: "food",
    icon: "🔥",
    products: [
      {
        name: "Brick au Thon",
        nameAr: "بريك بالتن",
        nameEn: "Brick with tuna",
        description: "Brick croustillante au thon.",
        price: "10.000",
        imageUrl: "/images/brick-thon.jpg",
        isFeatured: true,
      },
      {
        name: "Brick aux Fruits de Mer",
        nameAr: "بريك بغلال البحر",
        nameEn: "Brick with seafood",
        description: "Brick croustillante aux fruits de mer.",
        price: "12.000",
        imageUrl: "/images/brick-thon.jpg",
      },
      {
        name: "Brick aux Chevrettes",
        nameAr: "بريك بالقمبري",
        nameEn: "Brick with shrimps",
        description: "Brick croustillante aux chevrettes.",
        price: "12.000",
        imageUrl: "/images/brick-thon.jpg",
      },
      {
        name: "Ojja Merguez",
        nameAr: "عجة مرقاز",
        nameEn: "Ojja with sausage",
        description: "Ojja tunisienne à la merguez.",
        price: "27.000",
        imageUrl: "/images/ojja-merguez.jpg",
        isFeatured: true,
      },
      {
        name: "Ojja aux Fruits de Mer",
        nameAr: "عجة بغلال البحر",
        nameEn: "Ojja with seafood",
        description: "Ojja tunisienne aux fruits de mer.",
        price: "32.000",
        imageUrl: "/images/ojja-merguez.jpg",
      },
      {
        name: "Ojja aux Chevrettes",
        nameAr: "عجة قمبري",
        nameEn: "Ojja with shrimps",
        description: "Ojja tunisienne aux chevrettes.",
        price: "38.000",
        imageUrl: "/images/ojja-merguez.jpg",
      },
      {
        name: "Seiche Grillée Sautée",
        nameAr: "شوباي مشوي",
        nameEn: "Grilled cuttlefish",
        price: "37.000",
        imageUrl: "/images/seiche-grillee.jpg",
      },
      {
        name: "Poulpe Grillé",
        nameAr: "قرنيط مشوي",
        nameEn: "Grilled octopus",
        price: "40.000",
        imageUrl: "/images/poulpe-grille.jpg",
        isFeatured: true,
      },
      {
        name: "Kamounia Poulpe",
        nameAr: "كمونية قرنيط",
        nameEn: "Kamounia octopus",
        price: "42.000",
        imageUrl: "/images/poulpe-grille.jpg",
      },
      {
        name: "Chevrettes à l'ail",
        nameAr: "قمبري بالثوم",
        nameEn: "Shrimps with garlic",
        price: "38.000",
        imageUrl: "/images/chevrettes-grillees.jpg",
      },
      {
        name: "Chevrettes Panées",
        nameAr: "قمبري مخبوز",
        nameEn: "Breaded shrimps",
        price: "38.000",
        imageUrl: "/images/chevrettes-grillees.jpg",
      },
      {
        name: "Chevrettes Grillées",
        nameAr: "قمبري مشوي",
        nameEn: "Grilled shrimps",
        price: "36.000",
        imageUrl: "/images/chevrettes-grillees.jpg",
        isFeatured: true,
      },
      {
        name: "Kamounia Seiche",
        nameAr: "كمونية شوباي",
        nameEn: "Cuttlefish kamounia",
        price: "39.000",
        imageUrl: "/images/seiche-grillee.jpg",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  CARTE DES BOISSONS — Vins Rosé, Rouge, Blanc                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "vins-rose-rouge-blanc",
    name: "Vins Rosé, Rouge, Blanc",
    nameAr: "نبيذ وردي، أحمر، أبيض",
    nameEn: "Rosé, Red & White Wines",
    description: "Sélection de vins tunisiens — bouteille.",
    menuType: "drink",
    icon: "🍷",
    products: [
      { name: "Château Mornag", price: "34.000", imageUrl: "/images/vins.jpg", isFeatured: true },
      { name: "Ugni Blanc", price: "34.000" },
      { name: "Magon", price: "38.000" },
      { name: "1/2 Magon", price: "24.000" },
      { name: "Gris", price: "34.000" },
      { name: "Magon Rouge", price: "40.000", imageUrl: "/images/vins.jpg" },
      { name: "1/2 Jour et Nuits", price: "30.000" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  CARTE DES BOISSONS — Vin de Luxe                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "vin-de-luxe",
    name: "Vin de Luxe",
    nameAr: "نبيذ فاخر",
    nameEn: "Luxury Wines",
    description: "Nos grandes bouteilles de prestige.",
    menuType: "drink",
    icon: "🥂",
    products: [
      { name: "Magon Signature", price: "46.000", imageUrl: "/images/vins.jpg", isFeatured: true },
      { name: "Crazy", price: "80.000" },
      { name: "Magnifique", price: "52.000" },
      { name: "Chardonnay Blanc", price: "46.000" },
      { name: "Desir", price: "47.000" },
      { name: "Jour et Nuit", price: "50.000" },
      { name: "Vieux Magon", price: "55.000" },
      { name: "1/2 Magon Signature", price: "33.000" },
    ],
  },
];

export const DEFAULT_SLOTS = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];
