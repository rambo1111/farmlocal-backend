import dotenv from "dotenv";
dotenv.config();

console.log("MYSQL_URL =", process.env.MYSQL_URL);

export const env = {
  mysqlUrl: process.env.MYSQL_URL || "",
};