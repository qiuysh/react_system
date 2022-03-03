import React from "react";
import { Card } from "antd";
import { Flipper, Bar, Line } from "@/components/charts";

type dataArray = {
  data: Array<{
    x: string;
    y: number;
  }>;
};

type dataObject = {
  data: {
    value: number;
    prefix?: string | null;
    suffix?: string;
  };
};

type iChartProps = {
  type: string;
  options: {
    title: string;
    isMom?: boolean;
    [key: string]: unknown;
  };
  data: dataArray | dataObject | any;
};

function Chart({
  type,
  options,
  data,
}: iChartProps): JSX.Element {
  let element: JSX.Element = <div>暂无图表</div>;
  switch (type) {
    case "flipcard": {
      element = <Flipper options={options} data={data} />;
      break;
    }
    case "bar": {
      element = <Bar options={options} data={data} />;
      break;
    }
    case "line": {
      element = <Line options={options} data={data} />;
      break;
    }
    default:
  }
  return element;
}

const ChartPanel: React.FC<iChartProps> = params => {
  const { type, options } = params;
  return (
    <Card title={type != "flipcard" ? options.title : ""}>
      <Chart {...params} />
    </Card>
  );
};

export default ChartPanel;
