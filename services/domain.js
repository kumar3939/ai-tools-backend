import whois from "whois-json";

export async function checkDomainExpiry(domain) {
  const data = await whois(domain);

  return {
    domain,
    registrar: data.registrar || null,
    expiry_date:
      data.registryExpiryDate ||
      data.expirationDate ||
      null
  };
}

