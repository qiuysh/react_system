/** @format */

import * as React from "react";
import LineChart from "@ant-design/charts/es/plots/line";

export interface iLineProps {
  options: object;
  data: Array<{
    x: string;
    y: number;
  }>;
}

const Line: React.FC<iLineProps> = props => {
  const { options, data } = props;
  const config = {
    data,
    xField: "x",
    yField: "y",
  };
  return <LineChart {...config} />;
};

export default Line;
