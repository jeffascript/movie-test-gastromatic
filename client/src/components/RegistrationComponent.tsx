import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../graphAPIs";

import { Spin } from "antd";

import "./LoginForm.css";
import { openNotification } from "./Notification";

import { setTimeout } from "timers";

import RegFormComponent from "./RegisterForm";
import { useHistory } from "react-router-dom";

interface IRegistrationComponentProps {}

export interface IRegistrationComponentState {
  username?: string;
  password?: string;
}

const RegistrationComponent = (props: IRegistrationComponentProps) => {
  const history = useHistory();

  const [RegisterUser, { loading, data, error }] = useMutation(USER_REGISTER, {
    onCompleted({ login }) {
      console.log(login);
      history.push("/login");
    },
  });

  const onFinish = useCallback((value: any) => {
    if (value) {
      setData(value);
    } else {
      openNotification({
        message: "Check your input fields",
        type: "warning",
      });
    }
  }, []);

  const setData = async (loginInput: any) => {
    await RegisterUser({
      variables: {
        username: loginInput.username,
        password: loginInput.password,
      },
    })
      .then(
        (res) =>
          openNotification({
            message: "Registration successful",
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
      <RegFormComponent onFinish={onFinish} />
    </>
  );
};

export default RegistrationComponent;
