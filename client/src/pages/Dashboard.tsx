import React from "react";
import withHome from "./WithHome";
import DashBoardComponent from "../components/DashBoardComponent";

export interface IDashBoardProps {}

export interface IDashBoardState {}

const Dashboard = (props: IDashBoardProps) => {
  return (
    <div>
      <DashBoardComponent />
    </div>
  );
};

export default withHome(Dashboard);
