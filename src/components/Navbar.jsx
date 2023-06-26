import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo-putih.jpg";
import { useDispatch, useSelector } from "react-redux";
// import { LogOut, reset } from "../features/authSlice";
import { IoPerson } from "react-icons/io5";

const Navbar = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // const logout = () => {
  //   dispatch(LogOut());
  //   dispatch(reset());
  //   navigate("/");
  // };

  return (
    <div>
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <NavLink to="/dashboard" className="navbar-item">
            <img
              src={logo}
              alt="logo"
              style={{ width: "35px", height: "50px" }}
            />
            <p className="" style={{ fontWeight: "bold", fontSize: "25px" }}>
              Latifah Busana
            </p>
          </NavLink>

          <a
            href="!#"
            role="button"
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <p style={{ fontWeight: "bold", marginRight: "5px" }}>
                {user && user.name}
              </p>
              <div
                style={{
                  background: "#eaeaea",
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoPerson
                  style={{ width: "75%", height: "75%", color: "grey" }}
                />
              </div>
              {/* <div className="buttons">
                <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
