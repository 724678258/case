//封装高阶组件
//核心逻辑：有token就放行，没有token就跳转到登录页面
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

function AuthRoute({ children }: any) {
  const token = getToken();
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default AuthRoute;
