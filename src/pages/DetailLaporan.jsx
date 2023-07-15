import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";

const DetailLaporan = () => {
  const [Detail, setDetail] = useState({});
  const { id } = useParams();

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

  const detailProduct = async () => {
    const data = await axios.get(
      `https://latifah-backend-production.up.railway.app/invoice/${id}`
    );
    setDetail(data);
  };

  console.log("detail laporan", Detail);

  useEffect(() => {
    detailProduct();
  }, []);

  return (
    <div>
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
            : {Detail.data.kode}
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
            : {moment(Detail.data.createdAt).format("L")}
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
            : Rp. {Detail.data.total}
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
            {Detail.data.ProductInvoices.map((product, index) => (
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
