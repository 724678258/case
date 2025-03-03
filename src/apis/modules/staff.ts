import { request } from "@/utils";

//获取员工列表
export function getListAPI(data) {
  return request({
    url: `/admin/employee/page?page=${data.page}&pageSize=${data.pageSize}&name=${data.name}`,
    method: "GET",
  });
}
//新增员工
export function addStaffAPI(data) {
  return request({
    url: "/admin/employee",
    method: "POST",
    data,
  });
}
//修改员工状态
export function modifyStateAPI(status, id) {
  return request({
    url: `/admin/employee/status/${status}?id=${id}`,
    method: "POST",
  });
}
//查询员工详情
export function queryEmployeeDetailsAPI(id) {
  return request({
    url: `/admin/employee/${id}`,
    method: "GET",
  });
}
//修改员工详情
export function modifyEmployeeDetailsAPI(data) {
  return request({
    url: "/admin/employee",
    method: "PUT",
    data,
  });
}
