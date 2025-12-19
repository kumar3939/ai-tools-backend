import dns from "dns/promises";

export async function checkDNSRecords(domain) {
  const records = {};

  try { records.A = await dns.resolve4(domain); } catch {}
  try { records.MX = await dns.resolveMx(domain); } catch {}
  try { records.NS = await dns.resolveNs(domain); } catch {}

  return { domain, records };
}

