/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";

export default async function validationToken(): Promise<string> {
  //   const token = await data;
  const token = await axios.post("/api/validation_token");
  console.log("token: ",token);
  
  return token.data;
}
