import { formatDateFr } from "@/lib/format";

type ReservationLike = {
  reference: string;
  fullName: string;
  phone: string;
  reservationDate: string;
  reservationTime: string;
  guests: number;
  note: string | null;
};

export function reservationMessage(reservation: ReservationLike): string {
  return [
    "🔔 Nouvelle réservation — CARTHAGE BEACH",
    `N° ${reservation.reference}`,
    `Client : ${reservation.fullName}`,
    `Téléphone : ${reservation.phone}`,
    `Date : ${formatDateFr(reservation.reservationDate)} à ${reservation.reservationTime}`,
    `Personnes : ${reservation.guests}`,
    reservation.note ? `Note : ${reservation.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Notification externe optionnelle du restaurant (SMS / WhatsApp / e-mail).
 * Branchez simplement une passerelle (Zapier, Make, Twilio, n8n…) via
 * la variable d'environnement RESERVATION_WEBHOOK_URL : aucune autre
 * modification de code n'est nécessaire.
 * L'appel ne doit jamais bloquer ni faire échouer la réservation du client.
 */
export async function notifyRestaurant(reservation: ReservationLike): Promise<void> {
  const webhookUrl = process.env.RESERVATION_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "reservation.created",
        restaurant: "CARTHAGE BEACH",
        message: reservationMessage(reservation),
        reservation,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
  } catch {
    /* une passerelle indisponible ne doit pas perturber le client */
  }
}
