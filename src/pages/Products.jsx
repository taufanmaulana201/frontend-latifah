import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ProductList from "../components/ProductList";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getMe } from "../features/authSlice";

const Products = () => {
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
  // const { isError } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getMe());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isError) {
  //     navigate("/");
  //   }
  // }, [isError, navigate]);
  return (
    <Layout>
      <ProductList />
    </Layout>
  );
};

export default Products;
