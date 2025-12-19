import express from "express";
import { checkWebsiteStatus } from "../services/website.js";
import { checkDomainExpiry } from "../services/domain.js";
import { checkDNSRecords } from "../services/dns.js";
import { checkSSLStatus } from "../services/ssl.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { tool, args } = req.body;

  try {
    let result;

    switch (tool) {
      case "check_website_status":
        result = await checkWebsiteStatus(args.url);
        break;

      case "check_domain_expiry":
        result = await checkDomainExpiry(args.domain);
        break;

      case "check_dns_records":
        result = await checkDNSRecords(args.domain);
        break;

      case "check_ssl_status":
        result = await checkSSLStatus(args.domain);
        break;

      default:
        return res.status(400).json({ error: "Unknown tool" });
    }

    res.json(result);
  } catch (e) {
    res.status(500).json({ error: "Tool execution failed" });
  }
});

export default router;

