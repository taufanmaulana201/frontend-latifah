import React, { useEffect } from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import LaporanList from "../components/LaporanList";

const Laporan = () => {
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
      <LaporanList />
    </Layout>
  );
};

export default Laporan;
