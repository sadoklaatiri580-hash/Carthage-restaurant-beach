export function formatPrice(value: string | number): string {
  const amount = typeof value === "number" ? value : Number.parseFloat(value);
  if (Number.isNaN(amount)) return "—";
  return amount.toFixed(3);
}

export function formatPriceWithCurrency(value: string | number, currency = "DT"): string {
  const price = formatPrice(value);
  return price === "—" ? price : `${price} ${currency}`;
}

const FR_DAYS = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const FR_MONTHS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** "2026-02-14" -> "Samedi 14 février 2026" (sans décalage de fuseau) */
export function formatDateFr(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(Date.UTC(y, m - 1, d));
  return `${FR_DAYS[date.getUTCDay()]} ${d} ${FR_MONTHS[m - 1]} ${y}`;
}

export function todayIso(): string {
  const now = new Date();
  const tz = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return tz.toISOString().slice(0, 10);
}

export function addDaysIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function weekdayOf(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function generateReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 5; i += 1) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `CB-${suffix}`;
}

export const STATUS_LABELS: Record<string, string> = {
  pending: "En attente",
  confirmed: "Confirmée",
  refused: "Refusée",
  completed: "Terminée",
  cancelled: "Annulée",
};

export const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 ring-amber-200",
  confirmed: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  refused: "bg-rose-100 text-rose-800 ring-rose-200",
  completed: "bg-sky-100 text-sky-800 ring-sky-200",
  cancelled: "bg-slate-200 text-slate-700 ring-slate-300",
};
