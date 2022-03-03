import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import ChartPanel from "./chartPanel";
import * as ajax from "./services";

interface iDashboardState {
  line?: Array<{
    x: string;
    y: number;
  }>;
  bar?: Array<{
    x: string;
    y: number;
  }>;
  flipcard: {
    sales?: number;
    grate?: number;
    reduce?: number;
    customers?: number;
  };
}

const DashBoard: React.FC<any> = props => {
  const [dataSource, getDashData] =
    useState<iDashboardState>({
      line: [],
      bar: [],
      flipcard: {
        sales: 0,
        grate: 0,
        reduce: 0,
        customers: 0,
      },
    });
  const { line, bar, flipcard } = dataSource;

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = (): void => {
    ajax.getDashboard().then((res: any) => {
      const isSuccessed: boolean = res.result;
      let dataSource;
      if (isSuccessed) {
        dataSource = res.data;
      } else {
        message.error(res.result_message);
      }
      getDashData(dataSource);
    });
  };

  return (
    <>
      <Row gutter={20}>
        <Col span={6}>
          <ChartPanel
            type="flipcard"
            options={{ title: "销售额", isMom: false }}
            data={{
              prefix: "$",
              value: flipcard.sales,
              suffix: "亿",
            }}
          />
        </Col>
        <Col span={6}>
          <ChartPanel
            type="flipcard"
            options={{
              title: "销售额增长率",
              isMom: true,
            }}
            data={{ prefix: "up", value: flipcard.grate }}
          />
        </Col>
        <Col span={6}>
          <ChartPanel
            type="flipcard"
            options={{ title: "成本降低率", isMom: true }}
            data={{
              prefix: "down",
              value: flipcard.reduce,
            }}
          />
        </Col>
        <Col span={6}>
          <ChartPanel
            type="flipcard"
            options={{ title: "客户量", isMom: false }}
            data={{
              prefix: "",
              value: flipcard.customers,
              suffix: "万",
            }}
          />
        </Col>
      </Row>
      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col span={12}>
          <ChartPanel
            type="line"
            options={{ title: "历年趋势" }}
            data={line}
          />
        </Col>
        <Col span={12}>
          <ChartPanel
            type="bar"
            options={{ title: "本年度季度销售额情况" }}
            data={bar}
          />
        </Col>
      </Row>
    </>
  );
};

export default DashBoard;
