import {
  addClassificationTypeAPI,
  modifyClassificationAPI,
} from "@/apis/modules/slassificationManagement";
import { App, Button, Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";

const AddPackageClassificationModal = ({
  addOpen,
  handleOK,
  handleCancel,
  modifyValues,
}: {
  addOpen: boolean;
  handleOK: (type) => void;
  handleCancel: () => void;
  modifyValues: any;
}) => {
  const [form] = Form.useForm(); // form实例

  const { message } = App.useApp();
  const [fromLoading, setFormLoading] = useState(false);

  const onOk = (fn: () => void) => {
    //表单验证（验证时可以获取到表单数据）
    form.validateFields().then((value) => {
      console.log("表单数据", value);
      setFormLoading(true);
      if (modifyValues?.id) {
        modifyClassificationAPI({
          ...modifyValues,
          id: modifyValues.id,
          name: value.name,
          sort: value.sort,
          type: modifyValues.type,
        })
          .then((res: any) => {
            if (res.code !== 1) {
              message.error(res.msg);
            } else {
              fn();
              message.success("修改成功");
            }
          })
          .finally(() => {
            setFormLoading(false);
          });
      } else {
        addClassificationTypeAPI({
          name: value.name,
          sort: value.sort,
          type: 2,
        })
          .then((res: any) => {
            if (res.code !== 1) {
              message.error(res.msg);
            } else {
              fn();
              message.success("新增成功");
            }
          })
          .finally(() => {
            setFormLoading(false);
          });
      }
    });
  };
  const handleSaveAndAdd = () => {
    onOk(() => {
      handleOK("addAndReset");
    });
  };
  useEffect(() => {
    if (addOpen) {
      form.setFieldsValue(modifyValues);
    }
  }, [addOpen]);
  return (
    <>
      <Modal
        confirmLoading={fromLoading}
        open={addOpen}
        title={modifyValues?.id ? "修改套餐分类" : "新增套餐分类"}
        centered={true}
        onOk={() =>
          onOk(() => {
            handleOK("add");
          })
        }
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
            <Button color="default" variant="solid" onClick={handleSaveAndAdd}>
              保存并继续添加
            </Button>
          </>
        )}
      >
        <Form style={{ marginTop: "16px" }} layout="vertical" form={form}>
          <FormItem
            label="分类名称"
            name="name"
            rules={[{ required: true, message: "新增套餐分类不能为空" }]}
          >
            <Input placeholder="请输入分类名称"></Input>
          </FormItem>
          <FormItem
            label="排序"
            name="sort"
            rules={[
              { required: true, message: "排序不能为空" },
              { pattern: /^[0-9]+$/, message: "排序只能为数字" },
            ]}
          >
            <Input placeholder="请输入排序"></Input>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};
export default AddPackageClassificationModal;
