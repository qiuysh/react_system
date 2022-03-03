import React from "react";
import * as Chart from "@ant-design/charts";

export interface BarChartProps {
  options: object;
  data: Array<{
    x: string;
    y: number;
  }>;
}

const Bar: React.FC<BarChartProps> = props => {
  const { options, data } = props;
  const config = {
    data,
    xField: "x",
    yField: "y",
  };
  return <Chart.Bar {...config} />;
};

export default Bar;
