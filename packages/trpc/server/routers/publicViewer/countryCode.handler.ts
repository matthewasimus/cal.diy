import type { CreateInnerContextOptions } from "../../createContext";

type CountryCodeOptions = {
  ctx: CreateInnerContextOptions;
};

// Fork: we sit behind Cloudflare, not Vercel, so read cf-ipcountry first.
// Falls back to Australia when no country header is present.
export const countryCodeHandler = async ({ ctx }: CountryCodeOptions) => {
  const { req } = ctx;

  const raw: string | string[] =
    req?.headers?.["cf-ipcountry"] ?? req?.headers?.["x-vercel-ip-country"] ?? "";
  const code = (Array.isArray(raw) ? raw[0] : raw) || "";
  // Cloudflare uses XX (unknown) and T1 (Tor) for non-countries
  const countryCode = !code || code === "XX" || code === "T1" ? "AU" : code;
  return { countryCode };
};

export default countryCodeHandler;
