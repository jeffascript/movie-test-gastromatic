import React, { FC } from "react";
import { useQuery } from "@apollo/client";

interface IHomeProps {}

interface IHomeState {}

const Home: FC<IHomeProps> = (props): JSX.Element => {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
};

// const {
//   data: movieData,
//   error: movieError,
//   loading: movieLoading,
// } = useQuery<GetMovieById>(GET_MOVIE_BY_ID, {variables: {id: props.movie.id}});

// const { data } = useQuery<GetCurrentUser>(GET_CURRENT_USER);
//     let userId = data ? data.currentUser.id : "";

// const client = useApolloClient();
// const [login, {loading, error}] = useMutation(LOGIN_USER,
//     {
//         onCompleted({login}) {
//             localStorage.setItem("token", login.token);
//             client.writeData({data: {isLoggedIn: true}});
//         }
//     });

// login({
//   variables: {
//       username: inputs.username,
//       password: inputs.password
//   }
// }).catch(error => console.log(error));

// const [inputs, setInputs] = useState({
//     username: "",
//     usernameError: "",
//     password: "",
//     passwordError: ""
// });

export default Home;