import React from "react";
import { Button } from "antd";
import { gql, useQuery } from "@apollo/client";
import {
  RouteComponentProps,
  withRouter,
  Switch,
  Route,
  BrowserRouter,
  RouteProps,
  Redirect,
  useHistory,
} from "react-router-dom";

type TParams = { id: string };

const IS_LOGGED_IN = gql`
  query GetToken {
    token @client
  }
`;

// query: gql`
//     query GetToken {
//       token
//     }
//   `,
//   data: {
//     isLoggedIn: !!localStorage.getItem("token"),
//   },

const App = (props: RouteComponentProps<TParams>): JSX.Element => {
  console.log(props);
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data);
  return (
    <>
      <div className="container">
        <Button> Hello </Button>
      </div>
    </>
  );
};

export default withRouter(App);
