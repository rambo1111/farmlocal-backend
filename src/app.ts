import express from "express";
import { Routes } from "./route";
import { connectRedis } from "./config/redis";

const app = express();

 connectRedis();

Routes(app);

// app.listen(3000, () => {
//   console.log("Server running");
// });
// module.exports = { app };
export { app };
