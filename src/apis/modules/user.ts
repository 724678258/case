import { request } from "@/utils";

export function login(loginForm: any) {
  return request({
    url: "/admin/employee/login",
    method: "POST",
    data: loginForm,
  });
}
