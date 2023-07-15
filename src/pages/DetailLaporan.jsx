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

  const getdata = async () => {
    const res = await axios.get(
      `https://latifah-backend-production.up.railway.app/invoice/${id}`
    );
    setData(res.data);
  };
  useEffect(() => {
    getdata();
  }, []);

  console.log("data", data);
  return (
    <div>
      {data ? (
        <div style={{ padding: "25px" }}>
          <Link
            className="is-info button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100px",
              height: "30px",
              borderRadius: "2px",
            }}
            to={"/laporan"}
          >
            <span className="ml-1">Kembali</span>
          </Link>
          <h1
            style={{ fontWeight: "bold", fontSize: "25px", marginTop: "25px" }}
          >
            Detail Transaksi
          </h1>
          <div style={{ width: "100%", marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <div style={{ width: "13%", textAlign: "left" }}>
                Kode Transaksi
              </div>
              <div style={{ width: "87%", textAlign: "left" }}>
                : {data.kode}
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <div style={{ width: "13%", textAlign: "left" }}>
                Tanggal Transaksi
              </div>
              <div style={{ width: "87%", textAlign: "left" }}>
                : {moment(data.createdAt).format("L")}
              </div>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              <div style={{ width: "13%", textAlign: "left" }}>
                Total Transaksi
              </div>
              <div style={{ width: "87%", textAlign: "left" }}>
                : Rp. {data.total}
              </div>
            </div>
          </div>
          <div style={{ textAlign: "left", marginTop: "25px" }}>
            <table className="table is-striped is-fullwidth">
              <thead style={{ background: "#eaeaea" }}>
                <tr>
                  <th>ID</th>
                  <th>Barang</th>
                  <th>Harga</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.ProductInvoices.map((product, index) => (
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
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <p>Loading....</p>
        </div>
      )}
    </div>
  );
};

export default DetailLaporan;
