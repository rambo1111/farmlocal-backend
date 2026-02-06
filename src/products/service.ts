// import { fetchitems } from "./repository";
// import { redis } from "../config/redis";

// interface ProductQuery {
//   limit: number;
//   cursor?: number;
//   sort?: string;
//   order?: "asc" | "desc";
//   search?: string;
//   category?: string;
// }

// export async function loadProducts(
//   limit: number,
//   cursor?: number
// ) {
//   const cacheKey = `products:limit:${limit}:cursor:${cursor ?? 0}`;

//   const cached = await redis.get(cacheKey);
//   if (cached) {
//     return JSON.parse(cached);
//   }

//   const products = await fetchitems({ limit, cursor });

//   const nextCursor =
//     products.length > 0 ? products[products.length - 1].id : null;

//   const response = {
//     items: products,
//     next_cursor: nextCursor,
//   };

//   await redis.set(cacheKey, JSON.stringify(response), {
//     EX: 60,
//   });

//   return response;
// }

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

// FIX: Change arguments to accept the full query object
export async function loadProducts(query: ProductQuery) {
  const { limit, cursor, search, category, sort, order } = query;

  // FIX: Include search/category in cache key so filtered results don't mix with normal ones
  const cacheKey = `products:limit:${limit}:cursor:${cursor ?? 0}:search:${search || ""}:cat:${category || ""}:sort:${sort || ""}`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }

  // FIX: Pass the full query object to the repository
  const products = await fetchitems(query);

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


