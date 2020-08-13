import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import { ILoginState } from "./LoginComponent";

interface IFormProps extends ILoginState {
  //   forRegister?: boolean;
  onFinish?: any;
}

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

const FormComponent = (props: Partial<IFormProps>) => {
  const { onFinish } = props;

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>

          <span
            className="centertile"
            style={{ padding: "1em", display: "inline-list-item" }}
          >
            New User ? &nbsp;
            <Link to="/register">Register</Link>
          </span>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormComponent;
