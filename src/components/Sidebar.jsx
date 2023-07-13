import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoPerson, IoHome, IoLogOut } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import { GrLogout } from "react-icons/gr";
import { FiBox, FiTruck, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const datapengguna = JSON.parse(localStorage.getItem("user"));
    setUsers(datapengguna);
  }, []);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div>
      <aside className="menu pl-2 pt-5 has-shadow">
        <p className="menu-label">Transaksi</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/penjualan"}>
              <FiShoppingCart /> Penjualan
            </NavLink>
          </li>
          <li>
            <NavLink to={"/pengeluaran"}>
              <GrLogout /> Pengeluaran
            </NavLink>
          </li>
          {/* <li>
            <NavLink to={"/products"}>
              <IoPricetag /> Products
            </NavLink>
          </li> */}
        </ul>
        <p className="menu-label">Master Data</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/barang"}>
              <FiBox /> Barang
            </NavLink>
          </li>
          <li>
            <NavLink to={"/suplier"}>
              <FiTruck /> Suplier
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Report</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/laporan"}>
              <IoMdStats /> Laporan
            </NavLink>
          </li>
        </ul>

        {users && users.role === "admin" && (
          <div>
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson /> Users
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
