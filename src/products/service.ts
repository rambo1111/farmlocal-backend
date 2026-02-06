import { fetchitems } from "./repository";
import { redis } from "../config/redis";

interface ProductQuery {
  limit: number;
  cursor?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  category?: string;
}

export async function loadProducts(
  limit: number,
  cursor?: number
) {
  const cacheKey = `products:limit:${limit}:cursor:${cursor ?? 0}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  const products = await fetchitems({ limit, cursor });

  const nextCursor =
    products.length > 0 ? products[products.length - 1].id : null;

  const response = {
    items: products,
    next_cursor: nextCursor,
  };

  await redis.set(cacheKey, JSON.stringify(response), {
    EX: 60,
  });

  return response;
}
