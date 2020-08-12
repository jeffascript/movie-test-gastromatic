import React, { useState, useCallback } from "react";
import { ApolloClient, useApolloClient, useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphAPIs";

import { Spin } from "antd";

import "./LoginForm.css";
import { openNotification } from "./Notification";

import { setTimeout } from "timers";
import FormComponent from "./Form";

interface ILoginProps {}

export interface ILoginState {
  username?: string;
  password?: string;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginComponent = (props: ILoginProps) => {
  const [loginInput, setLoginInput] = useState<ILoginState>();

  const client: ApolloClient<any> = useApolloClient();

  const [login, { loading, error }] = useMutation(USER_LOGIN, {
    onCompleted({ login }) {
      console.log(login);
      localStorage.setItem("token", login.token);

      client.writeQuery({
        query: USER_LOGIN,
        data: {
          isLoggedIn: true,
        },
      });
    },
  });

  const onFinish = useCallback(
    (value: any) => {
      setLoginInput(value);

      if (value) {
        setData(value);
      } else {
        setLoginInput({} as ILoginState);
      }
    },
    [loginInput],
  );

  const setData = async (loginInput: any) => {
    await login({
      variables: {
        username: loginInput.username,
        password: loginInput.password,
      },
    })
      .then(
        (res) =>
          openNotification({
            message: "Sign-In successful",
            type: "success",
          }),

        (error) =>
          openNotification({
            message: error.name,
            type: "error",
            description: error.message,
          }),
      )
      .catch((error) => console.log(error));
  };

  if (error) {
    console.log("rr");
  }

  if (loading) {
    setTimeout(() => {
      return <Spin tip="Loading..." size="large" />;
    }, 1000);
  }

  return (
    <>
      <FormComponent onFinish={onFinish} />
    </>
  );
};

export default LoginComponent;
