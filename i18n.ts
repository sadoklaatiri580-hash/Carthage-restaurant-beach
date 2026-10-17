export const LOCALES = ["fr", "ar", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "FR",
  ar: "ع",
  en: "EN",
};

export const LOCALE_DIR: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  ar: "rtl",
  en: "ltr",
};

type Dict = {
  nav: { home: string; menu: string; book: string; contact: string };
  common: {
    call: string;
    directions: string;
    viewMenu: string;
    bookTable: string;
    phone: string;
    address: string;
    hours: string;
    currency: string;
    loading: string;
    back: string;
    admin: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    intro: string;
    highlightsTitle: string;
    specialtiesTitle: string;
    specialtiesSubtitle: string;
    infoTitle: string;
    everyday: string;
    ctaTitle: string;
    ctaText: string;
    seaview: string;
    seaviewText: string;
    terrace: string;
    terraceText: string;
    bar: string;
    barText: string;
  };
  menu: {
    title: string;
    subtitle: string;
    food: string;
    drinks: string;
    all: string;
    empty: string;
    search: string;
    noResult: string;
    featured: string;
    items: string;
    table: string;
    qrWelcome: string;
  };
  reservation: {
    title: string;
    subtitle: string;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: string;
    note: string;
    notePlaceholder: string;
    submit: string;
    sending: string;
    successTitle: string;
    successText: string;
    reference: string;
    newReservation: string;
    closedDay: string;
    full: string;
    available: string;
    remaining: string;
    selectDate: string;
    person: string;
    persons: string;
    pending: string;
  };
  contact: {
    title: string;
    subtitle: string;
    openingHours: string;
    everyday: string;
    findUs: string;
    budget: string;
  };
};

const fr: Dict = {
  nav: { home: "Accueil", menu: "Menu", book: "Réserver", contact: "Contact" },
  common: {
    call: "Appeler",
    directions: "Itinéraire",
    viewMenu: "Voir le Menu",
    bookTable: "Réserver une table",
    phone: "Téléphone",
    address: "Adresse",
    hours: "Horaires",
    currency: "DT",
    loading: "Chargement…",
    back: "Retour",
    admin: "Espace restaurant",
  },
  home: {
    badge: "Hammam Sousse · Tunisie",
    title: "CARTHAGE BEACH",
    subtitle: "Restaurant · Bar",
    intro:
      "Au bord de la mer à Hammam Sousse, CARTHAGE BEACH vous accueille dans une ambiance méditerranéenne chaleureuse : poissons et fruits de mer, spécialités tunisiennes et belle carte des vins, à savourer en terrasse.",
    highlightsTitle: "L'expérience CARTHAGE BEACH",
    specialtiesTitle: "Nos spécialités",
    specialtiesSubtitle: "Un aperçu de la carte",
    infoTitle: "Informations pratiques",
    everyday: "Tous les jours",
    ctaTitle: "Envie de nous rejoindre ?",
    ctaText: "Réservez votre table en moins d'une minute, directement depuis votre téléphone.",
    seaview: "Vue sur mer",
    seaviewText: "Un cadre balnéaire au cœur de Hammam Sousse.",
    terrace: "Terrasse",
    terraceText: "Dispose d'une terrasse pour vos soirées d'été.",
    bar: "Bar & Vins",
    barText: "Carte des boissons et sélection de vins tunisiens.",
  },
  menu: {
    title: "Notre Carte",
    subtitle: "Cuisine de la mer & carte des boissons",
    food: "Plats",
    drinks: "Boissons",
    all: "Tout",
    empty: "Carte en cours de mise à jour.",
    search: "Rechercher un plat, un vin…",
    noResult: "Aucun résultat.",
    featured: "Suggestion",
    items: "article(s)",
    table: "Table",
    qrWelcome: "Bienvenue chez CARTHAGE BEACH — bonne dégustation !",
  },
  reservation: {
    title: "Réserver une table",
    subtitle: "Remplissez le formulaire, nous confirmons votre table rapidement.",
    name: "Nom et prénom",
    phone: "Numéro de téléphone",
    date: "Date",
    time: "Heure",
    guests: "Nombre de personnes",
    note: "Commentaire / demande spéciale",
    notePlaceholder: "Table en terrasse, anniversaire, allergies…",
    submit: "Envoyer la réservation",
    sending: "Envoi en cours…",
    successTitle: "Votre réservation a été envoyée avec succès.",
    successText: "Notre équipe vous contactera pour confirmer votre table.",
    reference: "Numéro de réservation",
    newReservation: "Faire une autre réservation",
    closedDay: "Le restaurant est fermé à cette date.",
    full: "Complet",
    available: "Créneaux disponibles",
    remaining: "places restantes",
    selectDate: "Choisissez une date pour voir les créneaux.",
    person: "personne",
    persons: "personnes",
    pending: "En attente de confirmation",
  },
  contact: {
    title: "Contact & Localisation",
    subtitle: "CARTHAGE BEACH — Hammam Sousse",
    openingHours: "Horaires d'ouverture",
    everyday: "Tous les jours",
    findUs: "Nous trouver",
    budget: "30–40 DT par personne",
  },
};

const ar: Dict = {
  nav: { home: "الرئيسية", menu: "القائمة", book: "حجز", contact: "اتصال" },
  common: {
    call: "اتصل",
    directions: "الاتجاهات",
    viewMenu: "عرض القائمة",
    bookTable: "احجز طاولة",
    phone: "الهاتف",
    address: "العنوان",
    hours: "أوقات العمل",
    currency: "د.ت",
    loading: "جارٍ التحميل…",
    back: "رجوع",
    admin: "فضاء المطعم",
  },
  home: {
    badge: "حمام سوسة · تونس",
    title: "CARTHAGE BEACH",
    subtitle: "مطعم · بار",
    intro:
      "على شاطئ حمام سوسة، يرحب بكم مطعم CARTHAGE BEACH في أجواء متوسطية دافئة: أسماك وغلال البحر، أطباق تونسية وقائمة نبيذ مميزة.",
    highlightsTitle: "تجربة CARTHAGE BEACH",
    specialtiesTitle: "أطباقنا المميزة",
    specialtiesSubtitle: "لمحة عن القائمة",
    infoTitle: "معلومات عملية",
    everyday: "كل الأيام",
    ctaTitle: "هل ترغب في زيارتنا؟",
    ctaText: "احجز طاولتك في أقل من دقيقة من هاتفك.",
    seaview: "إطلالة على البحر",
    seaviewText: "إطار شاطئي في قلب حمام سوسة.",
    terrace: "تيراس",
    terraceText: "تيراس مفتوح لسهراتكم الصيفية.",
    bar: "بار ونبيذ",
    barText: "قائمة مشروبات ومجموعة نبيذ تونسي.",
  },
  menu: {
    title: "قائمتنا",
    subtitle: "مأكولات بحرية وقائمة المشروبات",
    food: "الأطباق",
    drinks: "المشروبات",
    all: "الكل",
    empty: "القائمة قيد التحديث.",
    search: "ابحث عن طبق أو نبيذ…",
    noResult: "لا توجد نتائج.",
    featured: "اقتراح",
    items: "منتج",
    table: "طاولة",
    qrWelcome: "مرحبًا بكم في CARTHAGE BEACH — بالصحة والهناء!",
  },
  reservation: {
    title: "احجز طاولة",
    subtitle: "املأ الاستمارة وسنؤكد حجزك سريعًا.",
    name: "الاسم واللقب",
    phone: "رقم الهاتف",
    date: "التاريخ",
    time: "الساعة",
    guests: "عدد الأشخاص",
    note: "ملاحظة / طلب خاص",
    notePlaceholder: "طاولة في التيراس، عيد ميلاد، حساسية…",
    submit: "إرسال الحجز",
    sending: "جارٍ الإرسال…",
    successTitle: "تم إرسال حجزك بنجاح.",
    successText: "سيتصل بك فريقنا لتأكيد الطاولة.",
    reference: "رقم الحجز",
    newReservation: "حجز آخر",
    closedDay: "المطعم مغلق في هذا التاريخ.",
    full: "مكتمل",
    available: "الأوقات المتاحة",
    remaining: "أماكن متبقية",
    selectDate: "اختر تاريخًا لعرض الأوقات.",
    person: "شخص",
    persons: "أشخاص",
    pending: "في انتظار التأكيد",
  },
  contact: {
    title: "اتصال و الموقع",
    subtitle: "CARTHAGE BEACH — حمام سوسة",
    openingHours: "أوقات العمل",
    everyday: "كل الأيام",
    findUs: "موقعنا",
    budget: "30–40 د.ت للشخص",
  },
};

const en: Dict = {
  nav: { home: "Home", menu: "Menu", book: "Book", contact: "Contact" },
  common: {
    call: "Call",
    directions: "Directions",
    viewMenu: "View the Menu",
    bookTable: "Book a table",
    phone: "Phone",
    address: "Address",
    hours: "Opening hours",
    currency: "DT",
    loading: "Loading…",
    back: "Back",
    admin: "Restaurant area",
  },
  home: {
    badge: "Hammam Sousse · Tunisia",
    title: "CARTHAGE BEACH",
    subtitle: "Restaurant · Bar",
    intro:
      "By the sea in Hammam Sousse, CARTHAGE BEACH welcomes you in a warm Mediterranean atmosphere: fish and seafood, Tunisian specialities and a fine wine list, served on the terrace.",
    highlightsTitle: "The CARTHAGE BEACH experience",
    specialtiesTitle: "Our specialities",
    specialtiesSubtitle: "A taste of the menu",
    infoTitle: "Useful information",
    everyday: "Every day",
    ctaTitle: "Want to join us?",
    ctaText: "Book your table in less than a minute, straight from your phone.",
    seaview: "Sea view",
    seaviewText: "A seaside setting in the heart of Hammam Sousse.",
    terrace: "Terrace",
    terraceText: "An open terrace for your summer evenings.",
    bar: "Bar & Wines",
    barText: "Drinks list and a selection of Tunisian wines.",
  },
  menu: {
    title: "Our Menu",
    subtitle: "Seafood cuisine & drinks list",
    food: "Food",
    drinks: "Drinks",
    all: "All",
    empty: "Menu is being updated.",
    search: "Search a dish, a wine…",
    noResult: "No result.",
    featured: "Chef's pick",
    items: "item(s)",
    table: "Table",
    qrWelcome: "Welcome to CARTHAGE BEACH — enjoy your meal!",
  },
  reservation: {
    title: "Book a table",
    subtitle: "Fill in the form, we will confirm your table shortly.",
    name: "Full name",
    phone: "Phone number",
    date: "Date",
    time: "Time",
    guests: "Number of guests",
    note: "Comment / special request",
    notePlaceholder: "Terrace table, birthday, allergies…",
    submit: "Send reservation",
    sending: "Sending…",
    successTitle: "Your reservation has been sent successfully.",
    successText: "Our team will contact you to confirm your table.",
    reference: "Reservation number",
    newReservation: "Make another reservation",
    closedDay: "The restaurant is closed on this date.",
    full: "Full",
    available: "Available time slots",
    remaining: "seats left",
    selectDate: "Pick a date to see the time slots.",
    person: "guest",
    persons: "guests",
    pending: "Awaiting confirmation",
  },
  contact: {
    title: "Contact & Location",
    subtitle: "CARTHAGE BEACH — Hammam Sousse",
    openingHours: "Opening hours",
    everyday: "Every day",
    findUs: "Find us",
    budget: "30–40 DT per person",
  },
};

export const DICTIONARIES: Record<Locale, Dict> = { fr, ar, en };

export function getDictionary(locale: Locale): Dict {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

/** Choisit la traduction disponible pour un contenu issu de la base. */
export function localizedField(
  locale: Locale,
  base: string,
  ar?: string | null,
  en?: string | null,
): string {
  if (locale === "ar" && ar) return ar;
  if (locale === "en" && en) return en;
  return base;
}
