import { addClassificationTypeAPI } from "@/apis/modules/slassificationManagement";
import { App, Button, Form, Input, Modal } from "antd";

const AddDishCategories = ({
  open,
  handleDishCancel,
  handleDishOk,
}: {
  open: boolean;
  handleDishCancel: () => void;
  handleDishOk: (type) => void;
}) => {
  const [form] = Form.useForm(); // form实例
  const { message } = App.useApp();

  const onSubmit = (fn: () => void) => {
    // TODO: 提交表单
    form.validateFields().then((values) => {
      addClassificationTypeAPI({
        name: values.name,
        sort: values.sort,
        type: 1,
      }).then((res: any) => {
        console.log(res);
        if (res.code !== 1) {
          message.error(res.msg);
        } else {
          message.success("添加成功");
          fn();
          form.resetFields();
        }
      });
    });
  };

  const onCancel = () => {
    form.resetFields();
    handleDishCancel();
  };
  const handleSaveAndAddDish = () => {
    onSubmit(() => {
      handleDishOk("SaveAndAddDish");
    });
  };
  return (
    <Modal
      open={open}
      onOk={() =>
        onSubmit(() => {
          handleDishOk("addDish");
        })
      }
      onCancel={onCancel}
      centered={true}
      title="添加菜品分类"
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
          <Button
            color="default"
            variant="solid"
            onClick={handleSaveAndAddDish}
          >
            保存并继续添加
          </Button>
        </>
      )}
    >
      <Form layout="vertical" style={{ marginTop: 16 }} form={form}>
        <Form.Item
          label="分类名称"
          name="name"
          rules={[
            {
              required: true,
              message: "请输入分类名称",
            },
          ]}
        >
          <Input placeholder="请输入分类名称"></Input>
        </Form.Item>
        <Form.Item
          label="排序"
          name="sort"
          rules={[
            {
              required: true,
              message: "请输入排序",
            },
            { pattern: /^[0-9]+$/, message: "排序只能为数字" },
          ]}
        >
          <Input placeholder="请输入排序"></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddDishCategories;
