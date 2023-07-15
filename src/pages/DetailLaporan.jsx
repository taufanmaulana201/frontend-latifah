import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";

const DetailLaporan = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

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

  useEffect(() => {
    const response = axios.get(
      `https://latifah-backend-production.up.railway.app/invoice/${id}`
    );
    setData(response);
  }, [id]);

  console.log(data.data);

  return (
    <div>
      <Link to={"/laporan"}>kembali</Link>
      <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>Detail Transaksi</h1>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "35%", textAlign: "left" }}>Kode Transaksi</div>
          <div style={{ width: "75%", textAlign: "left" }}>
            : {data.data.kode}
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "35%", textAlign: "left" }}>
            Tanggal Transaksi
          </div>
          <div style={{ width: "75%", textAlign: "left" }}>
            : {moment(data.data.createdAt).format("L")}
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "35%", textAlign: "left" }}>Total Transaksi</div>
          <div style={{ width: "75%", textAlign: "left" }}>
            : Rp. {data.data.total}
          </div>
        </div>
      </div>
      <div style={{ textAlign: "left", marginTop: "25px" }}>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Barang</th>
              <th>Harga</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.data.ProductInvoices.map((product, index) => (
              <tr key={product.uuid}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.qty}</td>
                <td>{product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailLaporan;
