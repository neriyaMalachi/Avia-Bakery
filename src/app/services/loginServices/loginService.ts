import axios from "axios";

export async function LoginService(password: string, email: string) {
  const data = await axios.post("/api/login", { password, email });
  console.log(data);

  //   const token = await data;
  return data;
}
