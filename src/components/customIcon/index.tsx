/** @format */

import { createFromIconfontCN } from "@ant-design/icons";

const iconfont = require("@assets/fonts/iconfont");

console.log("Iconfont", iconfont);
export default createFromIconfontCN({
  scriptUrl: iconfont,
});
