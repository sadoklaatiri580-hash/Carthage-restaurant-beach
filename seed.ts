import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appMeta, categories, products, restaurantSettings, users } from "@/db/schema";
import { DEFAULT_SLOTS, MENU_SEED } from "@/db/menu-data";
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD, hashPassword } from "@/lib/auth";

/**
 * Seed idempotent et NON destructif :
 * - n'écrase jamais un produit / une catégorie déjà présents,
 * - ajoute uniquement ce qui manque (ex : la carte food ajoutée après les boissons),
 * - ne supprime jamais rien.
 */
const MENU_SEED_VERSION = "2-food-and-drinks";

let seedPromise: Promise<void> | null = null;

async function runSeed(): Promise<void> {
  /* -------------------------- compte administrateur ------------------------ */
  const existingAdmin = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, DEFAULT_ADMIN_EMAIL))
    .limit(1);

  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      email: DEFAULT_ADMIN_EMAIL,
      passwordHash: hashPassword(DEFAULT_ADMIN_PASSWORD),
      name: "Administrateur CARTHAGE BEACH",
      role: "admin",
    });
  }

  /* --------------------------- paramètres resto ---------------------------- */
  const existingSettings = await db.select({ id: restaurantSettings.id }).from(restaurantSettings).limit(1);
  if (existingSettings.length === 0) {
    await db.insert(restaurantSettings).values({
      name: "CARTHAGE BEACH",
      tagline: "Restaurant · Bar",
      phone: "73 325 102",
      address: "VJ85+782, Hammam Sousse",
      city: "Hammam Sousse",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=CARTHAGE+BEACH+VJ85%2B782+Hammam+Sousse",
      openingTime: "11:00",
      closingTime: "01:00",
      closedDays: [],
      slots: DEFAULT_SLOTS,
      maxCapacityPerSlot: 60,
      maxGuestsPerReservation: 15,
      currency: "DT",
    });
  }

  /* ------------------------------- la carte -------------------------------- */
  // La carte n'est (re)semée que si la version du seed a changé : les ajouts,
  // modifications et suppressions faites par l'administrateur sont préservés.
  const [meta] = await db
    .select()
    .from(appMeta)
    .where(eq(appMeta.key, "menu_seed_version"))
    .limit(1);

  if (meta?.value === MENU_SEED_VERSION) {
    return;
  }

  let categoryOrder = 0;
  for (const seedCategory of MENU_SEED) {
    categoryOrder += 1;

    const found = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, seedCategory.slug))
      .limit(1);

    let categoryId: number;
    if (found.length > 0) {
      categoryId = found[0].id;
    } else {
      const inserted = await db
        .insert(categories)
        .values({
          slug: seedCategory.slug,
          name: seedCategory.name,
          nameAr: seedCategory.nameAr,
          nameEn: seedCategory.nameEn,
          description: seedCategory.description,
          menuType: seedCategory.menuType,
          icon: seedCategory.icon,
          sortOrder: categoryOrder,
        })
        .returning({ id: categories.id });
      categoryId = inserted[0].id;
    }

    const existingProducts = await db
      .select({ name: products.name })
      .from(products)
      .where(eq(products.categoryId, categoryId));
    const existingNames = new Set(existingProducts.map((p) => p.name.trim().toLowerCase()));

    const toInsert = seedCategory.products
      .map((product, index) => ({ product, index }))
      .filter(({ product }) => !existingNames.has(product.name.trim().toLowerCase()))
      .map(({ product, index }) => ({
        categoryId,
        name: product.name,
        nameAr: product.nameAr,
        nameEn: product.nameEn,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        isFeatured: product.isFeatured ?? false,
        needsReview: product.needsReview ?? false,
        sortOrder: index + 1,
      }));

    if (toInsert.length > 0) {
      await db.insert(products).values(toInsert);
    }
  }

  await db
    .insert(appMeta)
    .values({ key: "menu_seed_version", value: MENU_SEED_VERSION })
    .onConflictDoUpdate({
      target: appMeta.key,
      set: { value: MENU_SEED_VERSION, updatedAt: new Date() },
    });
}

export async function ensureSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = runSeed().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  await seedPromise;
}
