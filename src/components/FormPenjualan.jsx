import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import moment from "moment";
import { FiShoppingCart } from "react-icons/fi";

const FormAddPenjualan = () => {
  const datenow = moment().format("DD/MM/YYYY");
  const dateinv = moment().format("MM[]DD[]YYYY");
  const time = moment().format("h[]mm[]ss");
  const [invke, setInvke] = useState(time);
  const [bayar, setBayar] = useState();
  // const [kembalian, setKembalian] = useState(0);
  const [barangs, setBarangs] = useState([]);
  const [barangFilter, setBarangFilter] = useState();
  const [keranjang, setKeranjang] = useState([]);
  const [penyimpanan, setPenyimpanan] = useState({
    product_id: "",
    name: "",
    price: "",
    qty: "",
  });
  // const [search, setSearch] = useState("");
  const [qty, setQty] = useState(1);
  const kode = `INV-${dateinv}-${invke}`;
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const searchbarang = (e) => {
    const { value } = e.target;
    const filter = barangs.filter(
      (data) => data.name === value || data.kode === value
    );
    setBarangFilter(filter);
    setPenyimpanan({
      product_id: filter[0].id,
      name: filter[0].name,
      price: filter[0].harga,
      qty: qty,
    });
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (barangFilter.length === 0) {
      alert("barang tidak ditemukan");
    } else {
      setKeranjang([...keranjang, penyimpanan]);
      setPenyimpanan({
        product_id: "",
        name: "",
        price: "",
        qty: "",
      });
      setQty(1);
      setBarangFilter();
    }
  };

  const handledeletekeranjang = (e) => {
    // alert("delete");
    setKeranjang(keranjang.filter((data, index) => index !== e));
  };

  let totalasd = 0;
  // setKembalian(totalasd - bayar);
  keranjang &&
    keranjang.map((data) => {
      const total = data.price * data.qty;
      totalasd += total;
    });
  // setKembalian(totalasd - bayar);
  const getBarang = async () => {
    await axios.get("http://localhost:5000/barang").then((res) => {
      setBarangs(res.data);
    });
  };

  useEffect(() => {
    getBarang();
  }, []);

  const buatTransaksi = async (e) => {
    // e.preventDefault();
    // alert("kode " + kode + "barang " + JSON.stringify(keranjang));
    // setKeranjang([]);
    try {
      await axios.post("http://localhost:5000/invoice", {
        kode: kode,
        jenis: "penjualan",
        ProdctList: keranjang,
      });
      // swal("Good job!", "transaksi berhasil dibuat", "success");
      setKeranjang([]);
      navigate("/penjualan");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  console.log(keranjang);
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
          <FiShoppingCart style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Penjualan Barang</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <div className="container px-2 ">
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          <div
            className="is-shadowless"
            style={{
              background: "white",
              marginright: "15px",
              borderRadius: "5px",
              width: "50%",
              marginRight: "10px",
              paddingTop: "15px",
              paddingBottom: "10px",
              paddingLeft: "8px",
              maxHeight: "max-content",
            }}
          >
            <div className="card is-shadowless">
              <div className="card-content">
                <div className="content">
                  <h2 className="subtitle">Transaksi Penjualan</h2>
                  <p className="has-text-centered">{msg}</p>
                  <div className="field">
                    <label className="label">Tanggal Transaksi</label>
                    <div className="control">
                      <input
                        disabled
                        type="text"
                        className="input"
                        value={datenow}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Kode Transaksi</label>
                    <div className="control">
                      <input
                        disabled
                        type="text"
                        className="input"
                        value={kode}
                      />
                    </div>
                  </div>
                  <form onSubmit={saveProduct}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ width: "85%" }}>
                        <div className="field">
                          <label className="label">Cari Barang</label>
                          <div
                            className="control"
                            style={{ position: "relative" }}
                          >
                            <input
                              type="text"
                              className="input"
                              // value={search}
                              onChange={searchbarang}
                              placeholder="Cari Barang..."
                            />
                            {barangFilter &&
                              barangFilter.map((data, index) => {
                                return (
                                  <div
                                    key={index}
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      background: "green",
                                      borderRadius: "100%",
                                      position: "absolute",
                                      top: 6,
                                      right: 6,
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <BiCheck
                                      style={{
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "30px",
                                      }}
                                    />
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "15%" }}>
                        <div className="field">
                          <label className="label">QTY</label>
                          <div className="control">
                            <input
                              type="number"
                              className="input"
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              placeholder="Cari Barang..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="field"
                      style={{
                        marginTop: "15px",
                      }}
                    >
                      <div className="control">
                        <button type="submit" className="button is-info ">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            className="is-shadowless"
            style={{
              background: "white ",
              borderRadius: "5px",
              width: "50%",
              paddingTop: "35px",
              paddingBottom: "20px",
              paddingLeft: "25px",
              maxHeight: "max-content",
            }}
          >
            <form onSubmit={buatTransaksi}>
              <h2
                className="subtitle"
                style={{ fontWeight: "bold", fontSize: "25px" }}
              >
                Buat Tansaksi
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "35%",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Total Transaksi
                </div>
                <div
                  style={{
                    width: "65%",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "15px",
                  }}
                >
                  : Rp. {totalasd}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    width: "35%",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Bayar
                </div>
                <div
                  style={{
                    width: "65%",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "15px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div>: Rp.</div> &nbsp;
                    <div className="control">
                      <input
                        className="input"
                        type="number"
                        value={bayar}
                        onChange={(e) => setBayar(e.target.value)}
                        placeholder="masukan nominal"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <div
                  style={{
                    width: "35%",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Kembalian
                </div>
                <div
                  style={{
                    width: "65%",
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginLeft: "15px",
                  }}
                >
                  : Rp. {bayar - totalasd || 0}
                </div>
              </div>
              <div className="control" style={{ marginTop: "25px" }}>
                <button type="submit" className="button is-info ">
                  Buat Transaksi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <table className="table is-striped is-fullwidth mt-5 ">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keranjang &&
              keranjang.map((product, index) => (
                <tr key={product.product_id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.qty}</td>
                  <td>{product.price * product.qty}</td>
                  <td>
                    <button
                      onClick={() => handledeletekeranjang(index)}
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
    </div>
  );
};

export default FormAddPenjualan;
