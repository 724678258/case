import { App, Badge, Button, Input, Space, Table, TableProps } from "antd";
import "./index.less";
import { useEffect, useState } from "react";
import {
  getListAPI,
  modifyStateAPI,
  queryEmployeeDetailsAPI,
} from "@/apis/modules/staff";
import { useNavigate } from "react-router-dom";

const StaffManagement = () => {
  //列表数据
  const [staffList, setStaffList] = useState([]);
  const [count, setCount] = useState(0);
  const [listLoading, setListLoading] = useState(false);
  const navigator = useNavigate();
  const { modal } = App.useApp();

  //数据请求参数
  const [reqData, setReqData] = useState({
    name: "",
    page: 1,
    pageSize: 10,
  });
  //点击分页重新获取列表
  const onPageChange = (page: number, pageSize: number) => {
    //修改参数依赖项，引发数据的重新渲染
    setReqData({ ...reqData, page, pageSize });
  };

  useEffect(() => {
    getList();
  }, [reqData]);
  //获取列表数据
  const getList = async () => {
    try {
      setListLoading(true);
      const res = await getListAPI(reqData);
      setStaffList(res.data.records);
      setCount(res.data.total);
    } finally {
      setListLoading(false); //关闭loading
    }
    // setListLoading(true);
    // try {
    //   const res = await getListAPI(reqData);
    //   setListLoading(false);
    //   setStaffList(res.data.records);
    //   setCount(res.data.total);
    // } catch (error) {
    //   setListLoading(false);
    //   // 处理错误，例如显示错误消息
    //   console.error("获取数据时发生错误:", error);
    //   // 你可以在这里添加更多的错误处理逻辑，比如显示一个用户友好的错误消息
    // }
  };

  //搜索回车事件
  const handleSearch = (e: any) => {
    setReqData({
      ...reqData,
      name: e.target.value,
      page: 1, //搜索结果分页从第一页开始
    });
  };

  //清除搜索条件
  const handleClear = () => {
    setReqData({
      ...reqData,
      name: "",
    });
  };
  //点击新增显示弹窗
  const onClickAddStaffModal = () => {
    navigator("/staffmanagement/add");
  };
  //修改状态
  const handleState = (record: any) => {
    modal.confirm({
      centered: true,
      title: "提示",
      content: <>确认调整该账号的状态?</>,
      onOk: async () => {
        await modifyStateAPI(record.status === 1 ? 0 : 1, record.id);
        getList();
      },
    });
  };

  //点击修改
  const handleModify = async (record: any) => {
    const res = await queryEmployeeDetailsAPI(record.id);
    navigator("/staffmanagement/add", {
      state: {
        data: res.data,
      },
    });
  };

  const columns: TableProps["columns"] = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      width: 64,
      render: (text, record, index) =>
        (reqData.page - 1) * reqData.pageSize + index + 1,
    },
    {
      title: "员工姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "账号",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "账号状态",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        return status === 1 ? (
          <Badge status="success" text="启用" />
        ) : (
          <Badge status="error" text="禁用" />
        );
      },
    },
    {
      title: "最后操作时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "操作",
      key: "action",
      width: 150,
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => handleModify(record)}>修改</a>
          {record.status === 1 ? (
            <a style={{ color: "#FF4D4F" }} onClick={() => handleState(record)}>
              禁用
            </a>
          ) : (
            <a onClick={() => handleState(record)}>启用</a>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="content-staff-management">
      <div className="toolbar">
        <Input
          prefix={<i className="ri-search-line  search-icon"></i>}
          className="search-input"
          placeholder="请输入员工姓名"
          onPressEnter={handleSearch}
          allowClear={true}
          onClear={handleClear}
        />
        <Button
          className="add-button"
          type="primary"
          onClick={onClickAddStaffModal}
          icon={<i className="ri-add-line"></i>}
        >
          添加员工
        </Button>
      </div>
      <Table
        loading={listLoading}
        columns={columns}
        dataSource={staffList}
        pagination={{
          total: count,
          pageSize: reqData.pageSize,
          showSizeChanger: true,
          showTotal: (total) => `共 ${total} 条`,
          onChange: onPageChange,
        }}
      />
    </div>
  );
};
export default StaffManagement;
