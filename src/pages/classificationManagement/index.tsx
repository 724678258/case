import { App, Badge, Button, Input, Modal, Select, Space, Table } from "antd";
import "./index.less";
import { useEffect, useState } from "react";
import {
  deleteClassificationTypeAPI,
  editClassificationTypeAPI,
  getClassificationListAPI,
} from "@/apis/modules/slassificationManagement";
import AddPackageClassificationModal from "./addPackageClassificationModal";
import AddDishCategories from "./addDishCategoriesModal";

const categoryObj = {
  1: "菜品分类",
  2: "套餐分类",
};

const initialData = {
  id: null,
  name: null,
  sort: null,
  type: null,
};
const ClassificationManagement = () => {
  const { message, modal } = App.useApp();
  const [listValues, setListValues] = useState([]); //列表数据
  const [listLoading, setListLoading] = useState(false); //列表加载
  const [count, setCount] = useState(0); //总数
  const [disableOpen, setDisableOpen] = useState(false); //禁用弹窗
  const [disableValues, setDisableValues] = useState<any>({}); //禁用弹窗数据
  const [addOpen, setAddOpen] = useState(false); //新增弹窗
  const [addDishOpen, setAddDishOpen] = useState(false); //新增菜品分类弹窗
  const [modifyValues, setModifyValues] = useState({
    ...initialData, //弹窗初始值
  });
  const [reqData, setReqData] = useState({
    name: "",
    type: "",
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    getList();
  }, []);

  //获取列表
  const getList = async (params?: any) => {
    try {
      setListLoading(true);
      const res = await getClassificationListAPI(params ? params : reqData);
      setListValues(res.data.records);
      setCount(res.data.total);
    } finally {
      setListLoading(false);
    }
  };

  //菜单类型筛选
  const typeFilter = (value) => {
    setReqData({ ...reqData, type: value });
    getList({ ...reqData, type: value });
  };
  //菜单名称筛选
  const handleSearch = (e) => {
    setReqData({ ...reqData, name: e.target.value });
    getList({ ...reqData, name: e.target.value });
  };
  //清除菜单类型筛选条件
  const handleClearType = () => {
    setReqData({ ...reqData, type: "" });
    getList({ ...reqData, type: "" });
  };
  //清除菜单名称筛选条件
  const handleClearName = () => {
    setReqData({ ...reqData, name: "" });
    getList({ ...reqData, name: "" });
  };
  //打开禁用弹窗
  const openDisable = (record: any) => {
    setDisableValues(record);
    setDisableOpen(true);
  };
  //确定禁用或启用
  const handleDisableOk = async () => {
    await editClassificationTypeAPI({
      status: disableValues.status === 1 ? 0 : 1,
      id: disableValues.id,
    }).then(() => {
      setDisableOpen(false);
      getList({
        ...reqData,
        page: 1,
      });
      message.success("操作成功");
    });
  };
  //取消禁用
  const handleDisableCancel = () => {
    setDisableOpen(false);
  };
  // 删除
  const handleDelete = async (record: any) => {
    await modal.confirm({
      centered: true,
      title: "确定删除",
      content: <>此操作将永久删除该分类，是否继续？?</>,
      onOk: async () => {
        const res: any = await deleteClassificationTypeAPI(record);
        if (res.code === 0) {
          message.error("当前分类关联了菜品,不能删除");
        } else {
          message.success("删除成功");
          getList({
            ...reqData,
            page: 1,
          });
        }
      },
    });
  };
  //打开新增弹窗
  const handleAdd = () => {
    setModifyValues({ ...initialData });
    setAddOpen(true);
  };
  //确定新增或修改
  const handleOK = (type) => {
    if (type === "add") {
      setAddOpen(false);
    }
    getList({
      ...reqData,
      page: 1,
    });
  };
  //取消新增或修改
  const handleCancel = () => {
    setAddOpen(false);
  };

  //点击修改
  const handleModify = (record: any) => {
    setModifyValues({
      id: record.id,
      name: record.name,
      sort: record.sort,
      type: record.type,
    });
    setAddOpen(true);
  };
  //新增菜品分类
  const addDishModal = () => {
    setAddDishOpen(true);
  };

  //取消新增菜品分类
  const handleDishCancel = () => {
    setAddDishOpen(false);
  };

  const handleDishOk = (type) => {
    if (type === "addDish") {
      setAddDishOpen(false);
    }
    getList({
      ...reqData,
      page: 1,
    });
  };

  //表头
  const columns = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
      width: 64,
      render: (text, record, index) =>
        (reqData.page - 1) * reqData.pageSize + index + 1,
    },
    {
      title: "分类名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "分类类型",
      dataIndex: "type",
      key: "type",
      render: (type) => {
        return categoryObj?.[type];
      },
    },
    {
      title: "排序",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status === 1 ? (
          <Badge status="success" text="启用" />
        ) : (
          <Badge status="error" text="禁用" />
        );
      },
    },
    {
      title: "操作时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      dataIndex: "operate",
      key: "operate",
      width: "160px",
      render: (_: any, record: any) => {
        return (
          <Space>
            <a onClick={() => handleModify(record)}>修改</a>
            {record.status === 1 ? (
              <a
                onClick={() => openDisable(record)}
                style={{ color: "#FF4D4F" }}
              >
                禁用
              </a>
            ) : (
              <a onClick={() => openDisable(record)}>启用</a>
            )}
            <a
              onClick={() => handleDelete(record)}
              style={{ color: "#FF4D4F" }}
            >
              删除
            </a>
          </Space>
        );
      },
    },
  ];
  return (
    <div className="classification-management">
      {/* 分类管理 */}
      <div className="classification-management-toolbar">
        <div className="toolbar-lift">
          <Input
            placeholder="请输入分类名称"
            className="toolbar-input"
            onClear={handleClearName}
            onPressEnter={handleSearch}
            allowClear={true}
            prefix={<i className="ri-search-line  search-icon"></i>}
          />
          <Select
            className=" toolbar-select"
            placeholder="请选择分类类型"
            allowClear={true}
            onClear={handleClearType}
            onSelect={typeFilter}
            options={Object.entries(categoryObj).map(([value, label]) => ({
              value,
              label,
            }))}
          ></Select>
        </div>
        <div className="toolbar-right">
          <Space>
            <Button
              color="default"
              variant="solid"
              onClick={addDishModal}
              icon={<i className="ri-add-line"></i>}
            >
              新增菜品分类
            </Button>
            <Button
              type="primary"
              onClick={handleAdd}
              className="toolbar-button"
              icon={<i className="ri-add-line"></i>}
            >
              新增套餐分类
            </Button>
          </Space>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={listValues}
        loading={listLoading}
        pagination={{
          pageSize: reqData.pageSize, //每页条数
          total: count, //总条数
          showSizeChanger: true, //是否可以改变 pageSize
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => {
            reqData.page = page;
            reqData.pageSize = pageSize;
            getList();
          },
        }}
      ></Table>
      {/* 禁用弹窗 */}
      <Modal
        centered={true} //居中
        open={disableOpen}
        title="温馨提示"
        onOk={handleDisableOk}
        onCancel={handleDisableCancel}
      >
        <p>确认调整该分类的状态?</p>
      </Modal>
      {/* 新增套餐分类弹窗 */}
      <AddPackageClassificationModal
        addOpen={addOpen}
        handleOK={handleOK}
        handleCancel={handleCancel}
        modifyValues={modifyValues}
      ></AddPackageClassificationModal>
      {/* 新增菜品分类弹窗 */}
      <AddDishCategories
        open={addDishOpen}
        handleDishOk={handleDishOk}
        handleDishCancel={handleDishCancel}
      ></AddDishCategories>
    </div>
  );
};

export default ClassificationManagement;
