import React from "react";
import * as Chart from "@ant-design/charts";

export interface LineChartProps {
  options: object;
  data: Array<{
    x: string;
    y: number;
  }>;
}

const Line: React.FC<LineChartProps> = props => {
  const { options, data } = props;
  const config = {
    data,
    xField: "x",
    yField: "y",
  };
  return <Chart.Line {...config} />;
};

export default Line;
