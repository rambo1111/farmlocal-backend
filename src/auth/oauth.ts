// import axios from "axios";
// import { redis } from "../config/redis";

// const TOKEN_KEY = "oauth:access_token";
// const LOCK_KEY = "oauth:lock";

// const LOCK_TTL_SECONDS = 5;
// const TOKEN_REFRESH_BUFFER = 60;
// const OAUTH_TIMEOUT_MS = 3000;

// interface TokenResponse {
//   access_token: string;
//   expires_in: number;
// }

// export async function getAccessToken(): Promise<string> {
//   const cached = await redis.get(TOKEN_KEY);
//   if (cached) return cached;

//   const lockAcquired = await redis.set(LOCK_KEY, "1", {
//     NX: true,
//     EX: LOCK_TTL_SECONDS,
//   });

//   if (!lockAcquired) {
//     await new Promise((r) => setTimeout(r, 300));
//     const retry = await redis.get(TOKEN_KEY);
//     if (retry) return retry;
//   }

//   try {
//     const res = await axios.post<TokenResponse>(
//       process.env.OAUTH_TOKEN_URL!,
//       {
//         grant_type: "client_credentials",
//         client_id: process.env.OAUTH_CLIENT_ID,
//         client_secret: process.env.OAUTH_CLIENT_SECRET,
//       },
//       { timeout: OAUTH_TIMEOUT_MS }
//     );

//     const { access_token, expires_in } = res.data;

//     await redis.set(TOKEN_KEY, access_token, {
//       EX: expires_in - TOKEN_REFRESH_BUFFER,
//     });

//     return access_token;
//   } finally {
//     await redis.del(LOCK_KEY);
//   }
// }

import axios from "axios";
import { redis } from "../config/redis";

const TOKEN_KEY = "oauth:access_token";
const LOCK_KEY = "oauth:lock";

const LOCK_TTL_SECONDS = 5;
const TOKEN_REFRESH_BUFFER = 60;
const OAUTH_TIMEOUT_MS = 3000;

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export async function getAccessToken(): Promise<string> {
  const cached = await redis.get(TOKEN_KEY);
  // Fix: Convert buffer to string if it exists
  if (cached) return cached.toString();

  const lockAcquired = await redis.set(LOCK_KEY, "1", {
    NX: true,
    EX: LOCK_TTL_SECONDS,
  });

  if (!lockAcquired) {
    await new Promise((r) => setTimeout(r, 300));
    const retry = await redis.get(TOKEN_KEY);
    // Fix: Convert buffer to string if it exists
    if (retry) return retry.toString();
  }

  try {
    constPX = await axios.post<TokenResponse>(
      process.env.OAUTH_TOKEN_URL!,
      {
        grant_type: "client_credentials",
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
      },
      { timeout: OAUTH_TIMEOUT_MS }
    );

    const { access_token, expires_in } = res.data;

    await redis.set(TOKEN_KEY, access_token, {
      EX: expires_in - TOKEN_REFRESH_BUFFER,
    });

    return access_token;
  } finally {
    await redis.del(LOCK_KEY);
  }
}
