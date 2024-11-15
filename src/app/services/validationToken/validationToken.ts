/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export async function validationToken(): Promise<string> {
  //   const token = await data;
  const token = await axios.post("/api/validation_token");
  return token.data.token;
}
