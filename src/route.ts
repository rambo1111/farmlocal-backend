import type { Express } from "express";
import { fetchproducts } from "./products/controller";
import { fetchpublicapi } from "./external/publicApi";
import { supplierWebhook } from "./webhooks/supplier";
import { limit } from "./middlewares/rateLimit";

export function Routes(app: Express) {
  app.get("/", (_, res) => {
    res.json({ status: "ok" });
  });

  app.get("/products", fetchproducts);
  app.post("/webhooks/supplier", supplierWebhook);
  app.get("/products", limit, fetchproducts);

  app.get("/external-api", async (_, res) => {
    try {
      const data = await fetchpublicapi();
      res.json(data);
    } catch (err) {
      res.status(502).json({
        error: "Failed to fetch data from external service",
      });
    }
  });
}
