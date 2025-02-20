//封装和token相关的操作  存 取 删
function setToken(token: string) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
}

function removeToken() {
  localStorage.removeItem("token");
}
export { setToken, getToken, removeToken };
