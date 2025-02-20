//组合redux子模块+导出store实例

import userReducer from "./modules/user";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default Store;
