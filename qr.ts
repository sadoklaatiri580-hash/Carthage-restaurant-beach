import QRCode from "qrcode";

/** Génère un QR Code au format SVG (aux couleurs CARTHAGE BEACH). */
export async function qrSvg(text: string, size = 240): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    width: size,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#07192cff", light: "#ffffffff" },
  });
}

/** Construit le lien public du menu (avec table facultative). */
export function buildMenuUrl(baseUrl: string, table?: number | string): string {
  const url = new URL("/menu", baseUrl);
  url.searchParams.set("src", "qr");
  if (table !== undefined && table !== "") {
    url.searchParams.set("table", String(table));
  }
  return url.toString();
}
