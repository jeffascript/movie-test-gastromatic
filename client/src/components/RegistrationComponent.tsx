import React, { useState, useCallback } from "react";
import { ApolloClient, useApolloClient, useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphAPIs";

import { Form, Spin } from "antd";

import "./LoginForm.css";
import { openNotification } from "./Notification";

import { setTimeout } from "timers";

interface IRegistrationComponentProps {}

export interface IRegistrationComponentState {
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

const RegistrationComponent = (props: IRegistrationComponentProps) => {
  const [loginInput, setLoginInput] = useState<IRegistrationComponentState>();

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
        setLoginInput({} as IRegistrationComponentState);
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

  if (loading) {
    setTimeout(() => {
      return <Spin tip="Loading..." size="large" />;
    }, 1000);
  }

  return (
    <>
      <Form onFinish={onFinish} />
    </>
  );
};

export default RegistrationComponent;
