/** @format */
import * as React from "react";
import BarChart from "@ant-design/charts/es/plots/bar";

export interface iBarProps {
  options: object;
  data: Array<{
    x: string;
    y: number;
  }>;
}

const Bar: React.FC<iBarProps> = props => {
  const { options, data } = props;
  const config = {
    data,
    xField: "x",
    yField: "y",
  };
  return <BarChart {...config} />;
};

export default Bar;
