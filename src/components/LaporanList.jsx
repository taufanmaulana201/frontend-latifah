import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { IoMdStats } from "react-icons/io";
import swal from "sweetalert";

const LaporanList = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("today");
  const hariini = moment().format("L");
  const bulanini = moment().format("L");
  const [filtertoday, setFilterToday] = useState(hariini);
  const [filterBulan, setFilterBulan] = useState(bulanini);

  // console.log(filtertoday);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/invoice");
    setProducts(response.data);
  };

  const detailProduct = async (productId) => {
    const data = await axios.get(`http://localhost:5000/invoice/${productId}`);
    if (data) {
      swal(
        <div>
          {/* <p>{data}</p> */}

          <h1 style={{ fontWeight: "bold", fontSize: "25px" }}>
            Detail Transaksi
          </h1>
          <div style={{ width: "100%", marginTop: "20px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "35%", textAlign: "left" }}>
                Kode Transaksi
              </div>
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
              <div style={{ width: "35%", textAlign: "left" }}>
                Total Transaksi
              </div>
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
    }
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
          <IoMdStats style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Laporan Transaksi</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <p>Filter : </p>
          <div className="field ml-1">
            <div className="control">
              <div className="select is-fullwidth is-small">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value={"today"}>hari</option>
                  <option value={"bulan"}>bulan</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "15px",
          }}
        >
          <p>Value : </p>
          {filter === "today" ? (
            <div style={{ marginLeft: "10px" }}>
              <input
                className="input is-small"
                type="date"
                value={filtertoday}
                onChange={(e) => setFilterToday(e.target.value)}
                placeholder="Small input"
              />
            </div>
          ) : (
            <div style={{ marginLeft: "10px" }}>
              <input
                className="input is-small"
                type="month"
                value={filterBulan}
                onChange={(e) => setFilterBulan(e.target.value)}
                placeholder="Small input"
              />
            </div>

            // <div className="field ml-1">
            //   <div className="control">
            //     <div className="select is-fullwidth is-small">
            //       <select
            //         value={filter}
            //         onChange={(e) => setFilter(e.target.value)}
            //       >
            //         {NamaBulan.map((data, index) => {
            //           return (
            //             <option key={index} value={data}>
            //               {data}
            //             </option>
            //           );
            //         })}
            //       </select>
            //     </div>
            //   </div>
            // </div>
          )}
        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kode Transaksi</th>
            <th>Jenis Transaksi</th>
            <th>Tanggal Transaksi</th>
            <th>Total</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products
              .filter((data) =>
                filter === "today"
                  ? moment(data.createdAt).format("L") ===
                    moment(filtertoday).format("L")
                  : moment(data.createdAt).format("MMMM") ===
                    moment(filterBulan).format("MMMM")
              )
              .map((product, index) => (
                <tr key={product.uuid}>
                  <td>{index + 1}</td>
                  <td>{product.kode}</td>
                  <td>{product.jenis}</td>
                  <td>{moment(product.createdAt).format("L")}</td>
                  <td>{product.total}</td>
                  <td>{product.user.name}</td>
                  <td>
                    <button
                      onClick={() => detailProduct(product.uuid)}
                      className="button is-small is-warning"
                    >
                      detail
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default LaporanList;
