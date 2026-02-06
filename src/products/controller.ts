import { Request, Response } from "express";
import { loadProducts } from "./service";

export async function fetchproducts(req: Request, res: Response) {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;

  const sort = req.query.sort as string | undefined;
  const order = req.query.order as "asc" | "desc" | undefined;
  const search = req.query.search as string | undefined;
  const category = req.query.category as string | undefined;

  const data = await loadProducts({
    limit,
    cursor,
    sort,
    order,
    search,
    category,
  });

  res.json(data);
}