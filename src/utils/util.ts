/**
 * @format
 * @Author: wulin
 * @Date: 2021-03-12 14:24:26
 * @LastEditors: wulin
 * @LastEditTime: 2021-04-23 15:12:07
 * @Description: xxxx
 * @FilePath: /react_system/src/utils/util.ts
 */

/** @format */

/**
 * 验证是否登录
 * @param nextState
 * @param replace
 */
export function isLogined(nextState: any, replace: any) {
  if (!loggedIn()) {
    replace({
      pathname: "/login",
    });
  }
}

export function loggedIn() {
  return !!localStorage.token;
}

/**
 * 获取内容高度
 */
export function getViewPortHeight() {
  return Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0,
  );
}
