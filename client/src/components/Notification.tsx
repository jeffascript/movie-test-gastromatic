import React from "react";
import {
  ExclamationOutlined,
  CloseCircleOutlined,
  InfoOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";

import { notification } from "antd";

interface INotificationProps {
  type: string;
  message: string;
  description?: string;
}

export const openNotification = ({
  message,
  description,
  type,
}: INotificationProps) => {
  const findType = (type: string) => {
    switch (type) {
      case "warning":
        return <ExclamationOutlined style={{ color: "orange" }} />;
        break;
      case "info":
        return <InfoOutlined style={{ color: "blue" }} />;
        break;
      case "error":
        return <CloseCircleOutlined style={{ color: "red" }} />;
        break;

      default:
        return <CheckCircleTwoTone twoToneColor="green" />;
        break;
    }
  };

  notification.open({
    message,
    description,
    icon: findType(type),
  });
};
