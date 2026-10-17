import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

/* -------------------------------------------------------------------------- */
/*  USERS (admin / staff)                                                      */
/* -------------------------------------------------------------------------- */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull().default("Administrateur"),
  role: text("role").notNull().default("admin"), // admin | staff
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  CATEGORIES  (menuType : food | drink -> ready for more sections later)     */
/* -------------------------------------------------------------------------- */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(), // FR (langue par défaut)
  nameAr: text("name_ar"),
  nameEn: text("name_en"),
  description: text("description"),
  menuType: text("menu_type").notNull().default("food"), // food | drink
  icon: text("icon"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  PRODUCTS                                                                   */
/* -------------------------------------------------------------------------- */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade" }),
  name: text("name").notNull(), // FR
  nameAr: text("name_ar"),
  nameEn: text("name_en"),
  description: text("description"),
  price: numeric("price", { precision: 10, scale: 3 }).notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  needsReview: boolean("needs_review").notNull().default(false), // prix/texte illisible => revue admin
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  RESERVATIONS                                                               */
/* -------------------------------------------------------------------------- */
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  reservationDate: date("reservation_date").notNull(),
  reservationTime: text("reservation_time").notNull(), // "19:30"
  guests: integer("guests").notNull(),
  note: text("note"),
  status: text("status").notNull().default("pending"), // pending|confirmed|refused|completed|cancelled
  source: text("source").notNull().default("web"),
  // null = nouvelle demande jamais vue par le restaurant (sert aux alertes admin)
  seenAt: timestamp("seen_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  RESTAURANT SETTINGS (single row, id = 1)                                   */
/* -------------------------------------------------------------------------- */
export const restaurantSettings = pgTable("restaurant_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("CARTHAGE BEACH"),
  tagline: text("tagline").notNull().default("Restaurant · Bar"),
  phone: text("phone").notNull().default("73 325 102"),
  address: text("address").notNull().default("VJ85+782, Hammam Sousse"),
  city: text("city").notNull().default("Hammam Sousse"),
  mapsUrl: text("maps_url")
    .notNull()
    .default("https://www.google.com/maps/search/?api=1&query=CARTHAGE+BEACH+VJ85%2B782+Hammam+Sousse"),
  openingTime: text("opening_time").notNull().default("11:00"),
  closingTime: text("closing_time").notNull().default("01:00"),
  closedDays: jsonb("closed_days").$type<number[]>().notNull().default([]), // 0 = dimanche
  slots: jsonb("slots").$type<string[]>().notNull().default([]),
  maxCapacityPerSlot: integer("max_capacity_per_slot").notNull().default(60),
  maxGuestsPerReservation: integer("max_guests_per_reservation").notNull().default(15),
  currency: text("currency").notNull().default("DT"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/*  APP META : stocke les flags techniques (ex : version du seed du menu)      */
/*  Prépare aussi l'ajout futur de : commandes, panier, paiement, promos...    */
/* -------------------------------------------------------------------------- */
export const appMeta = pgTable(
  "app_meta",
  {
    id: serial("id").primaryKey(),
    key: text("key").notNull(),
    value: text("value"),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique("app_meta_key_unique").on(table.key)],
);

/* -------------------------------------------------------------------------- */
/*  MENU SCANS : statistiques du QR Code Menu (table scannée, source)          */
/* -------------------------------------------------------------------------- */
export const menuScans = pgTable("menu_scans", {
  id: serial("id").primaryKey(),
  tableLabel: text("table_label"),
  source: text("source").notNull().default("qr"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MenuScan = typeof menuScans.$inferSelect;
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Reservation = typeof reservations.$inferSelect;
export type RestaurantSettings = typeof restaurantSettings.$inferSelect;
