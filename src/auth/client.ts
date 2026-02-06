import axios from "axios";
import { getAccessToken } from "./oauth";

export async function externalapicall() {
  const token = await getAccessToken();

  const res = await axios.get(
    "https://api.publicapis.org/entries",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 3000,
    }
  );

  return res.data;
}