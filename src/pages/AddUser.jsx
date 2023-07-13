import React, { useEffect , useState} from "react";
import Layout from "./Layout";
import FormAddUser from "../components/FormAddUser";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getMe } from "../features/authSlice";

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState([]);
  console.log("user dashboard", user.name);
  useEffect(() => {
    const datapengguna = JSON.parse(localStorage.getItem("user"));
    if (!datapengguna) {
      navigate("/");
    } else {
      setUser(datapengguna);
    }
  }, [navigate]);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { isError, user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  //   if (user && user.role !== "admin") {
  //     navigate("/dashboard");
  //   }
  // }, [isError, user, navigate]);
  return (
    <Layout>
      <FormAddUser />
    </Layout>
  );
};

export default AddUser;
