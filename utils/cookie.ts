import Cookie from "js-cookie";

export function getToken() {
  return Cookie.get("auth-token");
}
export function setToken(token: string) {
  deleteToken();
  Cookie.set("auth-token", token);
}
export function deleteToken() {
  Cookie.remove("auth-token");
}
