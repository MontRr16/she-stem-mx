export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function tokenize(value: string): string[] {
  return normalizeText(value).split(/[^a-z0-9]+/).filter(Boolean);
}
