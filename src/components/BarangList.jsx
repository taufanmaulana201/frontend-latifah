import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiBox } from "react-icons/fi";

const BarangList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("https://backend-latifah-production.up.railway.app/barang");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`https://backend-latifah-production.up.railway.app/barang/${productId}`);
    getProducts();
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
          <FiBox style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Stok Barang</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <Link to="/barang/add" className="button is-info mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kode Barang</th>
            <th>Nama Barang</th>
            <th>Stok</th>
            <th>Harga Jual</th>
            <th>Suplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.kode}</td>
              <td>{product.name}</td>
              <td>{product.stok}</td>
              <td>{product.harga}</td>
              <td>{product.suplier.name}</td>
              <td>
                <Link
                  to={`/barang/edit/${product.uuid}`}
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

export default BarangList;
