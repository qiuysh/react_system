/** @format */

import React from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  message,
} from "antd";
import UserOutlined from "@ant-design/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/LockOutlined";
import * as ajax from "./services";
import "./login.less";

type ILoginProps = {
  history: any;
};

const Login: React.FC<ILoginProps> = props => {
  const { history } = props;

  function handleSubmit(value: any): void {
    ajax.login(value).then((res: any) => {
      const isLoginSuccess: Boolean = res.result;
      if (isLoginSuccess) {
        localStorage.setItem("token", res.data.token);
        history.push("/dashboard");
      } else {
        message.error(res.result_message);
      }
    });
  }

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <h1>Idev Workbench</h1>
        <Form onFinish={e => handleSubmit(e)}>
          <Form.Item name="username">
            <Input
              prefix={
                <UserOutlined
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              placeholder="账号"
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              prefix={
                <LockOutlined
                  style={{ color: "rgba(0,0,0,.25)" }}
                />
              }
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            {/* <Checkbox>记住密码</Checkbox>
            <a className="login-form-forgot" href="">
              忘记密码
            </a> */}
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-priame"
              block>
              登录
            </Button>
            {/* <a>注册</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
