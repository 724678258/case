import { login } from "@/apis/modules/user";
import { createSlice } from "@reduxjs/toolkit";
import { getToken, setToken as _setToken } from "@/utils";

const userStore = createSlice({
  name: "user",
  //数据状态
  initialState: {
    token: getToken() || "",
  },
  // 同步修改方法
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

// 解构出actionCreater
const { setToken } = userStore.actions;
// 获取reducer函数
const userReducer = userStore.reducer;

// 定义一个fetchLogin函数，用于发送登录请求
const fetchLogin = (loginForm: any) => {
  // 返回一个异步函数，用于发送异步请求
  return async (dispatch: any) => {
    //1.发送异步请求
    const res = await login(loginForm);
    //2.提交同步action进行token的存入
    dispatch(setToken(res.data.token));
  };
};

export { fetchLogin };

export default userReducer;
