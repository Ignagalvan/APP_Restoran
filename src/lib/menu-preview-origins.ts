// Exact origins only: no wildcard subdomains, tokens or URL query credentials.
export function menuPreviewOrigins(value: string | undefined, development: boolean) {
  const values = value?.split(',').map(item => item.trim()).filter(Boolean) ?? [];
  if (development) values.push('http://localhost:3001', 'http://127.0.0.1:3001');
  return [...new Set(values.map(value => {
    try { const url = new URL(value); return ['https:', ...(development ? ['http:'] : [])].includes(url.protocol) && !url.username && !url.password ? url.origin : null; } catch { return null; }
  }).filter((value): value is string => value !== null))];
}
