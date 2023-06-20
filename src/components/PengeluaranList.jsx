import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { GrLogout } from "react-icons/gr";

const PengeluaranList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("https://backend-latifah-production.up.railway.app/pengeluaran");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`https://backend-latifah-production.up.railway.app/pengeluaran/${productId}`);
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
          <GrLogout
            style={{ color: "blue", fontSize: "100px", marginRight: "15px" }}
          />
        </div>
        <div>
          <h2 className="subtitle">Laporan Pengeluaran</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <Link to="/pengeluaran/add" className="button is-info mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Jenis Pengeluaran</th>
            <th>Total</th>
            <th>tanggal</th>
            <th>Catatan</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{moment(product.creaatedAt).format("L")}</td>
              <td>{product.catatan}</td>
              <td>{product.user.name}</td>
              <td>
                <Link
                  to={`/pengeluaran/edit/${product.uuid}`}
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

export default PengeluaranList;
