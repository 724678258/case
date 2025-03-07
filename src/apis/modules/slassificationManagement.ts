import { request } from "@/utils";

// 获取分类列表
export function getClassificationListAPI(data) {
  return request({
    url: `/admin/category/page?page=${data.page}&pageSize=${data.pageSize}&type=${data.type}&name=${data.name}`,
    method: "GET",
  });
}

// 修改分类状态
export function editClassificationTypeAPI(data) {
  return request({
    url: `/admin/category/status/${data.status}?id=${data.id}`,
    method: "POST",
  });
}
// 删除分类状态
export function deleteClassificationTypeAPI(data) {
  return request({
    url: `/admin/category?id=${data.id}`,
    method: "DELETE",
  });
}
// 新增分类
export function addClassificationTypeAPI(data) {
  return request({
    url: `/admin/category`,
    method: "POST",
    data,
  });
}
// 修改分类
export function modifyClassificationAPI(data) {
  return request({
    url: `/admin/category`,
    method: "PUT",
    data,
  });
}
