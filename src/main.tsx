import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { ConfigProvider, App as AntApp } from "antd";
import App from "./App";
import zhCN from "antd/locale/zh_CN";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: "#ffc200",
        },
      }}
    >
      <AntApp style={{ height: "100%" }}>
        <App />
      </AntApp>
    </ConfigProvider>
  </StrictMode>
);
