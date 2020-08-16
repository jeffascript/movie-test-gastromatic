import React, { useState, useCallback, FC } from "react";
import {
  ApolloClient,
  useApolloClient,
  useMutation,
  useQuery,
} from "@apollo/client";
import { USER_LOGIN, IS_LOGGED_IN } from "../graphAPIs";

import { Spin } from "antd";

import "./LoginForm.css";
import { openNotification } from "./Notification";

import { setTimeout } from "timers";
import FormComponent from "./Form";
import { useHistory } from "react-router-dom";

interface ILoginCompProps {
  //   welcomeUserName?: string;
}

export interface ILoginState {
  username: string;
  password: string;
}

const LoginComponent: FC<ILoginCompProps> = (props) => {
  const [loginInput, setLoginInput] = useState<ILoginState>();

  const history = useHistory();
  const client: ApolloClient<any> = useApolloClient();
  const { data } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN);

  const [login, { loading, error }] = useMutation(USER_LOGIN, {
    onCompleted({ login }) {
      console.log(login);

      localStorage.setItem("token", login.token);

      console.log(data?.isLoggedIn, "before write");

      client.writeQuery({
        query: USER_LOGIN,
        data: {
          isLoggedIn: true,
        },
      });

      console.log(data?.isLoggedIn, "after write");
      history.push("/gastromovies");
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
          return openNotification({
            message: ` Welcome Back`,
            type: "success",
            description: "Sign-In successful",
          });
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

  return (
    <>
      <FormComponent onFinish={onFinish} />
    </>
  );
};

export default LoginComponent;
