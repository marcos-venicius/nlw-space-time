import jwtDecode from "jwt-decode";
import { cookies } from "next/headers";

interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

export function getUser() {
  const token = cookies().get("auth-token")?.value;

  if (!token) {
    throw new Error("Unauthenticated");
  }

  const user: User = jwtDecode(token);

  return user;
}
