import React, { FC, useState } from "react";
import { Table } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import arrayMove from "array-move";

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const columns = [
  {
    title: "Sort",
    dataIndex: "sort",
    width: 30,
    className: "drag-visible",
    render: () => <DragHandle />,
  },
  {
    title: "Name",
    dataIndex: "name",
    className: "drag-visible",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];
// Name
// o Release date
// o Duration
// o Actors
// o Average user rating (x/5 stars)

//set interface for data
//   interface Product {
//     name: string;
//     price: number;
//     description: string;
// }

// const products: Product[];

// I would recommend using the Array<T> form if the item type is very large : Array<{name: string, price: number, description: string}>

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    index: 0,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    index: 1,
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    index: 2,
  },
];

const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableContainerComponent = SortableContainer((props: any) => (
  <tbody {...props} />
));

export interface IDashBoardComponentProps {}

export interface IData {
  key: string;
  name: string;
  age: number;
  address: string;
  index: number;
  // tags: string[];
}

// use interface for data
export interface IDashBoardComponentState {
  dataSource: IData[];
}

// const {
//     data,
//     loading,
//     error,
// } = useQuery<GetAlreadyRated>(GET_MOVIE_ALREADY_RATED, {variables: {movieId: props.movie.id}});

const DashBoardComponent: FC<IDashBoardComponentProps> = (props) => {
  const [state, setstate] = useState({
    dataSource: data,
  });

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    const { dataSource } = state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove(
        // [].concat(dataSource),
        [...data],
        oldIndex,
        newIndex,
      ).filter((el) => !!el);
      console.log("Sorted items: ", newData, oldIndex, newIndex);
      setstate({ dataSource: newData });
    }
  };

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const { dataSource } = state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(
      (x: any) => x.index === restProps["data-row-key"],
    );
    return <SortableItem index={index} {...restProps} />;
  };

  const { dataSource } = state;
  const DraggableContainer = (props: any) => (
    <SortableContainerComponent
      useDragHandle
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  return (
    <>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      />
    </>
  );
};

export default DashBoardComponent;
