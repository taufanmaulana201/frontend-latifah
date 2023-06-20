import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("https://backend-latifah-production.up.railway.app/users");
    setUsers(response.data);
  };

  const deleteUser = async (userId) => {
    await axios.delete(`https://backend-latifah-production.up.railway.app/users/${userId}`);
    getUsers();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "15px 0 15px 10px",
        }}
      >
        <div>
          <IoPerson style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Users</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <Link to="/users/add" className="button is-info mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-warning mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger "
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
