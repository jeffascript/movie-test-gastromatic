import React, { FC } from "react";

import LoginComponent from "../components/LoginComponent";

import withHome from "./WithHome";

interface ILoginProps {}

const Login: FC<ILoginProps> = (props): JSX.Element => {
  // const location = useLocation();

  // // const [state, setstate] = useState<Partial<ICurrentUser>>({});
  // const [state, setstate] = useState<Partial<ICurrentUser>>({});
  // const { data, error } = useQuery(GET_CURRENT_USER);
  // const fetchUser = () => {
  //   if (data) {
  //     setstate(data.currentUser);
  //     console.log(data.currentUser);
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  // });

  return (
    <>
      {/* welcomeUserName={state.currentUser?.username} */}
      <LoginComponent />
    </>
  );
};

export default withHome(Login);
