import { Request, Response } from "express";
import { redis } from "../config/redis";

export async function supplierWebhook(req: Request, res: Response) {
  const idempotencyKey = req.headers["idempotency-key"];

  if (!idempotencyKey || typeof idempotencyKey !== "string") {
    return res.status(400).json({ error: "Missing Idempotency-Key" });
  }

  const alreadyProcessed = await redis.get(idempotencyKey);

  if (alreadyProcessed) {
    return res.status(200).json({ status: "duplicate_ignored" });
  }

  await new Promise((r) => setTimeout(r, 200));

  await redis.set(idempotencyKey, "processed", {
    EX: 60 * 60, // 1 hour
  });

  res.json({ status: "processed" });
}