import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../graphAPIs";

import { Spin } from "antd";

import "./LoginForm.css";
import { openNotification } from "./Notification";

import { setTimeout } from "timers";
import { Redirect } from "react-router-dom";
import RegFormComponent from "./RegisterForm";

interface IRegistrationComponentProps {}

export interface IRegistrationComponentState {
  username?: string;
  password?: string;
}

const RegistrationComponent = (props: IRegistrationComponentProps) => {
  const [registerComplete, setRegisterComplete] = useState<boolean>(false);

  const [RegisterUser, { loading }] = useMutation(USER_REGISTER, {
    onCompleted({ login }) {
      console.log(login);
      setRegisterComplete(true);
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
      {registerComplete && <Redirect to="/login" />}
      <RegFormComponent onFinish={onFinish} />
    </>
  );
};

export default RegistrationComponent;
