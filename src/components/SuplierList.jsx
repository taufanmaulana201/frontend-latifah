import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiTruck } from "react-icons/fi";

const SuplierList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get(
      "https://latifah-backend-production.up.railway.app/suplier"
    );
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(
      `https://latifah-backend-production.up.railway.app/suplier/${productId}`
    );
    getProducts();
  };

  console.log(products);

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
          <FiTruck style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Suplier</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <Link to="/suplier/add" className="button is-info mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>email</th>
            <th>No.Hp</th>
            <th>Alamat</th>
            <th>Catatan</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.email}</td>
              <td>{product.hp}</td>
              <td>{product.alamat}</td>
              <td>{product.catatan}</td>

              <td>
                <Link
                  to={`/suplier/edit/${product.uuid}`}
                  className="button is-small is-warning mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="button is-small is-danger"
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

export default SuplierList;
