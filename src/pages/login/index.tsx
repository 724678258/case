import { Button, Form, Input } from "antd";
import loginImg from "@/assets/img/login.png";
import loginLogo from "@/assets/img/logo.png";
import "./index.less";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    await dispatch<any>(fetchLogin(values));
    navigate("/");
  };
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_container_left">
          <img src={loginImg} style={{ width: "100%" }} />
        </div>
        <div className="login_container_right">
          <img src={loginLogo} style={{ width: "200px" }} />
          <Form
            className="login_form"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入有效账号" }]}
            >
              <Input
                size="large"
                prefix={<i className="ri-user-3-line"></i>}
                placeholder="请输入账号"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入正确密码" }]}
            >
              <Input.Password
                size="large"
                prefix={<i className="ri-lock-line"></i>}
                placeholder="请输入密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="login_btn"
                type="primary"
                block
                shape="round"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
