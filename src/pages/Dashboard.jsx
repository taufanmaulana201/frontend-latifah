import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getMe } from "../features/authSlice";

const Dashboard = () => {
  const [user, setUser] = useState([]);
  console.log("user dashboard", user);
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

  // }, [isError, navigate]);

  // console.log("user dashboard", user);

  useEffect(() => {
    const datapengguna = JSON.parse(localStorage.getItem("user"));
    setUser(datapengguna);
  }, []);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

export default Dashboard;
