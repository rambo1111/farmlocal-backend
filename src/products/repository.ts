import { db } from "../config/mysql";

interface ProductQuery {
  limit: number;
  cursor?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  category?: string;
}

export async function fetchitems(q: ProductQuery) {
  const {
    limit,
    cursor,
    sort = "id",
    order = "asc",
    search,
    category,
  } = q;

  let sql = "SELECT * FROM products WHERE 1=1";
  const params: any[] = [];

  if (cursor) {
    sql += " AND id > ?";
    params.push(cursor);
  }

  if (search) {
    sql += " AND name LIKE ?";
    params.push(`%${search}%`);
  }

  if (category) {
    sql += " AND category = ?";
    params.push(category);
  }

const allowedSort = ["id", "basic_price", "created_at"];  const safeSort = allowedSort.includes(sort) ? sort : "id";

sql += ` ORDER BY ${safeSort} ${order === "desc" ? "DESC" : "ASC"}`;  sql += " LIMIT ?";
  params.push(limit);

  const [rows] = await db.query(sql, params);
  return rows as any[];
}