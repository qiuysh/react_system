import React from "react";
import { Statistic } from "antd";
import FallOutlined from "@ant-design/icons/FallOutlined";
import RiseOutlined from "@ant-design/icons/RiseOutlined";
import "../style.less";

export interface FlipCardProps {
  options: {
    title: string;
    precision?: number;
    style?: object;
    isMom?: boolean;
  };
  data: {
    value: number;
    prefix?: string;
    suffix?: string;
  };
}

const FlipCard: React.FC<FlipCardProps> = props => {
  const { options, data } = props;
  const { title, precision, isMom } = options;
  const { value, prefix, suffix } = data;
  let color: string = "#333";
  let prefixContent: React.ReactNode;
  if (isMom) {
    color = prefix === "up" ? "#cf1322" : "#3f8600";
    prefixContent =
      prefix === "up" ? <RiseOutlined /> : <FallOutlined />;
  }
  return (
    <div className="flip-chart">
      <Statistic
        title={title}
        value={value}
        precision={precision || 2}
        valueStyle={{
          color,
        }}
        prefix={isMom ? prefixContent : prefix}
        suffix={suffix || "%"}
      />
    </div>
  );
};

export default FlipCard;
