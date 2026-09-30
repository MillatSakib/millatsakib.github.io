import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const cookieName = "portfolio_admin";
function secret() { return process.env.ADMIN_SESSION_SECRET || "change-me-in-env"; }
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("hex"); }
export function createSession() { const value = `admin.${Date.now()}`; return `${value}.${sign(value)}`; }
export function validSession(token?: string) {
  if (!token) return false;
  // The signed value itself contains a dot (`admin.<timestamp>`), so split at
  // the final dot to keep the complete value intact.
  const separator = token.lastIndexOf(".");
  if (separator < 0) return false;
  const value = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!value || !signature) return false;
  const expected = sign(value);
  const timestamp = Number(value.slice(value.lastIndexOf(".") + 1));
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) && Number.isFinite(timestamp) && Date.now() - timestamp < 1000 * 60 * 60 * 12;
}
export async function requireAdmin() { return validSession((await cookies()).get(cookieName)?.value); }
export { cookieName };
