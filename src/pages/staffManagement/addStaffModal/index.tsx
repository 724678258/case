import { App, Button, Form, Input, Radio, Space } from "antd";
import "./index.less";
import { addStaffAPI, modifyEmployeeDetailsAPI } from "@/apis/modules/staff";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
const AddStaffPage = () => {
  const { message } = App.useApp();
  const navigator = useNavigate();
  const [form] = Form.useForm();
  const saveMode = useRef("1");
  const location = useLocation();
  const isNew = !location.state?.data;

  // 表单提交
  const addStaffBnt = async (formValues) => {
    await (isNew
      ? addStaffAPI(formValues)
      : modifyEmployeeDetailsAPI(formValues));
    message.success("添加成功");
    if (saveMode.current === "1") {
      navigator(-1);
    } else {
      form.resetFields(); // 重置表单
    }
  };
  const onFinish = (values: any) => {
    addStaffBnt(values);
  };
  const handleSaveAndAdd = () => {
    saveMode.current = "2";
    form.submit(); // 提交表单
  };
  const handleSave = () => {
    saveMode.current = "1";
    form.submit(); // 提交表单
  };
  return (
    <div className="add-staff-page">
      <div className="add-staff-page__header">
        <Button
          onClick={() => navigator(-1)}
          style={{
            fontSize: 16,
            padding: "10px 0px",
          }}
          color="default"
          variant="link"
          icon={<i className="ri-arrow-left-line arrow-left-icon"></i>}
        >
          返回
        </Button>
        <span style={{ color: "#ddd", fontSize: 16, padding: "0px 10px" }}>
          丨
        </span>
        <span style={{ fontSize: 16, fontWeight: 700 }}>
          {location.state?.data ? "修改员工" : "添加员工"}
        </span>
      </div>
      <div className="add-staff-page__body">
        <Form
          initialValues={location.state?.data}
          layout="vertical"
          style={{ width: "600px" }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            label="员工姓名"
            name="name"
            rules={[{ required: true, message: "请输入员工姓名" }]}
          >
            <Input placeholder="请输入员工姓名" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "请输入正确的手机号" },
            ]}
          >
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="性别" name="sex">
            <Radio.Group
              defaultValue={0}
              options={[
                { value: "0", label: "男" },
                { value: "1", label: "女" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name="idNumber"
            rules={[
              { required: true, message: "请输入身份证号" },
              {
                pattern:
                  /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}(\d|X)$/,
                message: "请输入正确的身份证号",
              },
            ]}
          >
            <Input placeholder="请输入身份证号" />
          </Form.Item>

          <Form.Item>
            <div className="add-staff-page__footer">
              <Space>
                <Button
                  color="default"
                  variant="outlined"
                  onClick={() => navigator(-1)}
                >
                  取消
                </Button>
                <Button color="default" variant="solid" onClick={handleSave}>
                  保存
                </Button>
                {!location.state?.data && (
                  <Button type="primary" onClick={handleSaveAndAdd}>
                    保存并继续添加
                  </Button>
                )}
              </Space>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default AddStaffPage;
