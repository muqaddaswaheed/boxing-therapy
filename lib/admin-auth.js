/**
 * Admin guard for API routes.
 * Accepts either the session cookie (browser, set at login) or an
 * `x-admin-secret` header (handy for scripts / testing). Both compare to
 * ADMIN_SECRET.
 */
export const ADMIN_COOKIE = "bt_admin";

export function isAdmin(request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const cookie = request.cookies?.get?.(ADMIN_COOKIE)?.value;
  if (cookie && cookie === secret) return true;
  const header = request.headers.get("x-admin-secret");
  return header === secret;
}
