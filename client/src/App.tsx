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

type RouterProps = Partial<RouteComponentProps>;
// query: gql`
//     query GetToken {
//       token
//     }
//   `,
//   data: {
//     isLoggedIn: !!localStorage.getItem("token"),
//   },

const App = (props: RouterProps): JSX.Element => {
  console.log(props);
  const { data } = useQuery(IS_LOGGED_IN);
  console.log(data);
  return (
    <>
      <div className="container">
        <Button> Hello </Button>
        <h1>nice</h1>
      </div>
    </>
  );
};

export default withRouter(App);
