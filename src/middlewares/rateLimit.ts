import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis";

export async function limit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const key = `rate:${req.ip}`;
  const limit = 100;

  const count = await redis.incr(key);

  if (count === 1) {
    await redis.expire(key, 60); 
  }

  if (count > limit) {
    return res.status(429).json({ error: "Too many requests" });
  }

  next();
}