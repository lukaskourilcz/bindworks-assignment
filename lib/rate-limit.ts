const requests = new Map<string, { count: number; resetTime: number }>();

export function rateLimit(
  key: string,
  limit: number = 30,
  windowMs: number = 60 * 1000,
): { success: boolean } {
  const now = Date.now();
  const entry = requests.get(key);

  if (!entry || now > entry.resetTime) {
    requests.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }

  if (entry.count >= limit) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}
