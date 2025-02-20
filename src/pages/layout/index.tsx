import { Button, Dropdown, Layout, Menu, MenuProps, Space } from "antd";
import React, { useState } from "react";
import LogoBig from "@/assets/img/logo.png";
import logoMini from "@/assets/img/logo-2.png";
import { useLocation, useNavigate } from "react-router-dom";

import "./index.less";
import { Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;

const HouTaiLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();
  // 菜单点击事件（点击切换页面）
  const handleMenuClick = (e: any) => {
    navigator(e.key);
  };
  // 当前选中的菜单项
  const selectedKeys = [location.pathname];

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <a target="_blank">修改密码</a>,
    },
    {
      key: "2",
      label: <a target="_blank">退出登录</a>,
    },
  ];
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* logo设置 */}
        <div className="logo">
          <div className="sidebar-logo">
            {collapsed ? (
              <img src={logoMini} style={{ width: "36px", height: "36px" }} />
            ) : (
              <img src={LogoBig} style={{ width: "120px", height: "36px" }} />
            )}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={[location.pathname]}
          inlineCollapsed={collapsed}
          onClick={handleMenuClick}
          items={[
            {
              key: "/foodmanagement",
              icon: <i className="ri-service-bell-fill iconSize"></i>,
              label: "菜品管理",
            },
            {
              key: "/classificationmanagement",
              icon: <i className="ri-stack-fill iconSize"></i>,
              label: "分类管理",
            },
            {
              key: "/staffmanagement",
              icon: <i className="ri-user-5-fill iconSize"></i>,
              label: "员工管理",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#ffc100",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "20px",
          }}
        >
          <Button
            type="text"
            icon={
              collapsed ? (
                <i className="ri-indent-increase"></i>
              ) : (
                <i className="ri-indent-decrease"></i>
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "20px",
              width: 64,
              height: 64,
            }}
          />
          <div className="header-right">
            <div className="business-status">
              <i
                className="ri-time-fill"
                style={{ marginRight: "4px", fontSize: "20px" }}
              ></i>
              营业状态设置
            </div>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <div className="personnel-menu">
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <p style={{ color: "#333" }}>管理员</p>
                  </Space>
                </a>
                <i className="ri-arrow-down-s-fill icon-state"></i>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "20px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};
export default HouTaiLayout;
