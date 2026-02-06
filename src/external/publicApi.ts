import axios from "axios";

const API_URL = "https://api.publicapis.org/entries";

export async function fetchpublicapi() {
  const MAX_RETRIES = 3;
  let attempt = 0;

  while (attempt < MAX_RETRIES) {
    try {
      const res = await axios.get(API_URL, {
        timeout: 3000, 
      });
      return res.data;
    } catch (err) {
      attempt++;

      if (attempt === MAX_RETRIES) {
        throw new Error("External API failed after retries");
      }

      await new Promise((r) => setTimeout(r, attempt * 500));
    }
  }
}