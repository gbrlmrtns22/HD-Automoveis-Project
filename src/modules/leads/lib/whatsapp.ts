export function normalizeWhatsapp(value: string) {
  const digits = value.replace(/\D/g, '');
  const withCountry = digits.startsWith('55') ? digits : `55${digits}`;
  return `+${withCountry}`;
}
