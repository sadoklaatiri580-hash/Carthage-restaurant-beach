import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { ensureSeeded } from "@/db/seed";
import { categories, products, reservations, restaurantSettings } from "@/db/schema";
import type { Category, Product, RestaurantSettings } from "@/db/schema";

export type MenuProduct = Pick<
  Product,
  | "id"
  | "name"
  | "nameAr"
  | "nameEn"
  | "description"
  | "price"
  | "imageUrl"
  | "isActive"
  | "isFeatured"
  | "needsReview"
  | "sortOrder"
  | "categoryId"
>;

export type MenuCategory = Pick<
  Category,
  "id" | "slug" | "name" | "nameAr" | "nameEn" | "description" | "menuType" | "icon" | "isActive" | "sortOrder"
> & { products: MenuProduct[] };

export async function getSettings(): Promise<RestaurantSettings> {
  await ensureSeeded();
  const rows = await db.select().from(restaurantSettings).orderBy(asc(restaurantSettings.id)).limit(1);
  return rows[0];
}

export async function getMenu(onlyActive = true): Promise<MenuCategory[]> {
  await ensureSeeded();

  const cats = await db
    .select()
    .from(categories)
    .where(onlyActive ? eq(categories.isActive, true) : undefined)
    .orderBy(asc(categories.sortOrder), asc(categories.id));

  const prods = await db
    .select()
    .from(products)
    .where(onlyActive ? eq(products.isActive, true) : undefined)
    .orderBy(asc(products.sortOrder), asc(products.id));

  return cats.map((category) => ({
    ...category,
    products: prods.filter((product) => product.categoryId === category.id),
  }));
}

export async function getFeaturedProducts(limit = 6) {
  await ensureSeeded();
  return db
    .select({
      id: products.id,
      name: products.name,
      nameAr: products.nameAr,
      nameEn: products.nameEn,
      description: products.description,
      price: products.price,
      imageUrl: products.imageUrl,
      categoryName: categories.name,
      menuType: categories.menuType,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.isActive, true), eq(products.isFeatured, true), eq(categories.isActive, true)))
    .orderBy(asc(products.sortOrder), asc(products.id))
    .limit(limit);
}

export type SlotAvailability = {
  time: string;
  remaining: number;
  capacity: number;
  isFull: boolean;
};

export async function getAvailability(dateIso: string): Promise<{
  closed: boolean;
  slots: SlotAvailability[];
  maxGuestsPerReservation: number;
}> {
  const settings = await getSettings();
  const [y, m, d] = dateIso.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const closedDays = settings.closedDays ?? [];

  if (closedDays.includes(weekday)) {
    return { closed: true, slots: [], maxGuestsPerReservation: settings.maxGuestsPerReservation };
  }

  const booked = await db
    .select({
      time: reservations.reservationTime,
      total: sql<number>`coalesce(sum(${reservations.guests}), 0)::int`,
    })
    .from(reservations)
    .where(
      and(
        eq(reservations.reservationDate, dateIso),
        sql`${reservations.status} in ('pending','confirmed')`,
      ),
    )
    .groupBy(reservations.reservationTime);

  const bookedMap = new Map(booked.map((row) => [row.time, Number(row.total)]));
  const capacity = settings.maxCapacityPerSlot;

  const slots = (settings.slots ?? []).map((time) => {
    const used = bookedMap.get(time) ?? 0;
    const remaining = Math.max(capacity - used, 0);
    return { time, remaining, capacity, isFull: remaining <= 0 };
  });

  return { closed: false, slots, maxGuestsPerReservation: settings.maxGuestsPerReservation };
}
