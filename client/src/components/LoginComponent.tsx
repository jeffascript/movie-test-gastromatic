import React, { useState, useCallback, useEffect } from "react";
import { ApolloClient, useApolloClient, useMutation } from "@apollo/client";
import { USER_LOGIN } from "../graphAPIs";

import { Spin } from "antd";

import "./LoginForm.css";
import { openNotification } from "./Notification";

import { setTimeout } from "timers";
import FormComponent from "./Form";
import { useHistory } from "react-router-dom";

interface ILoginProps {}

export interface ILoginState {
  username?: string;
  password?: string;
}

const LoginComponent = (props: ILoginProps) => {
  const [loginInput, setLoginInput] = useState<ILoginState>();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);

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
        setLoginInput(value);
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
        (res) => {
          return (
            openNotification({
              message: "Sign-In successful",
              type: "success",
            }),
            setLoginSuccess(true)
          );
        },

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

  const history = useHistory();
  useEffect(() => {
    loginSuccess ||
      (localStorage.getItem("token") && history.push("/gastromovies"));
  }, [loginSuccess, history]);

  return (
    <>
      <FormComponent onFinish={onFinish} />
    </>
  );
};

export default LoginComponent;
