import React, { useEffect, useState } from "react";
import {
  Table,
  Divider,
  PageHeader,
  Button,
  Badge,
} from "antd";
import { PaginationProps } from "antd/es/pagination";
import * as ajax from "./services";
import "./style.less";

const statusText: any = {
  success: "成功",
  error: "错误",
  warning: "异常",
};

interface iReqParamsStates {
  page: number;
  size: number;
}
interface iDataSourceStats {
  data?: Array<object>;
  total?: number;
}

const CustemTable: React.FC<any> = props => {
  const [reqParams, changeParam] =
    useState<iReqParamsStates>({
      page: 1,
      size: 10,
    });
  const [dataSource, getDataSource] =
    useState<iDataSourceStats>({
      data: [],
      total: 0,
    });
  const [loading, changeStatusLoading] =
    useState<boolean>(false);

  const pagination: PaginationProps = {
    current: reqParams.page,
    pageSize: reqParams.size,
    total: dataSource.total,
  };

  const columns: Array<object> = [
    {
      title: "规则名称",
      dataIndex: "name",
    },
    {
      title: "描述",
      dataIndex: "desc",
      width: "25%",
    },
    {
      title: "触发次数",
      dataIndex: "num",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text: any): JSX.Element => {
        return (
          <Badge status={text} text={statusText[text]} />
        );
      },
    },
    {
      title: "调用时间",
      dataIndex: "time",
    },
    {
      title: "操作",
      width: 150,
      render: (
        text: unknown,
        record: object
      ): JSX.Element => {
        return (
          <div>
            <a>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchList();
  }, [reqParams]);

  const fetchList = async () => {
    let dataSource: iDataSourceStats = {};
    changeStatusLoading(true);
    const res: any = await ajax.getPage(reqParams);
    if (res.result) {
      dataSource = {
        data: res.data.rows,
        total: res.data.count,
      };
    }
    getDataSource(dataSource);
    changeStatusLoading(false);
  };

  const changeTablePage = (
    pagination: any,
    filters: any,
    sorter: any
  ): void => {
    reqParams.page = pagination.current;
    changeParam(reqParams);
  };

  return (
    <PageHeader
      title=""
      extra={[
        <Button key="1" type="primary">
          新增
        </Button>,
      ]}
    >
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={dataSource.data}
        onChange={changeTablePage}
        pagination={pagination}
      />
    </PageHeader>
  );
};

export default CustemTable;
