import React, { FC, useState } from "react";
import { Table, Tag, Space, Rate } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import arrayMove from "array-move";

const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "pointer", color: "#999" }} />
));

const columns = [
  {
    title: "Drag n'Drop",
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
    title: "Release Date",
    dataIndex: "releaseDate",
    sorter: (a: any, b: any) => a.releaseDate - b.releaseDate,
  },
  {
    title: "Duration",
    dataIndex: "duration",
  },

  {
    title: "Actors",
    key: "actors",
    dataIndex: "actors",
    render: (actors: any) => (
      <>
        {actors.map((actor: any) => (
          <Tag color="blue" key={actor}>
            {actor}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Average Ratings",
    dataIndex: "ratings",
    render: (ratings: number) => {
      return (
        <>
          <Rate
            disabled
            allowHalf
            defaultValue={ratings}
            onChange={(e) => console.log(e, "ratings change")}
          />
          <p>Rated by 20 Users </p>
        </>
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render: (text: string, record: any) => (
      <Space size="middle">
        <a>
          <EditOutlined />{" "}
        </a>
        <a>
          <DeleteOutlined />{" "}
        </a>
      </Space>
    ),
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

//TODO: Add rating in data below as number... then show the number with the icon  index value+1

const data = [
  {
    // key: "1",
    name: "John Brown",
    releaseDate: "19/02/2020",
    duration: 25,
    index: "5f317e3f1b219bc22abfbc11",
    actors: ["Randy bookeer", "Peeter parkeer", "Peearkeer"],
    ratings: 3.5,
  },
  {
    // key: "2",
    name: "John Brown",
    releaseDate: "13/12/2020",
    duration: 3452,
    index: "2f317e3f1b219bc22abfbc11",
    actors: ["Randy bookeer", "Peeter parkeer"],
    ratings: 2.5,
  },
  {
    // key: "3",
    name: "John Brown",
    releaseDate: "13/12/2020",
    duration: 3452,
    index: "3f317e3f1b219bc22abfbc11",
    actors: ["Randy bookeer", "Peeter parkeer"],
    ratings: 2.5,
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
  tags: string[];
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
        onChange={(e) => console.log(e)}
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
