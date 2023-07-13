import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiBox } from "react-icons/fi";

const FormAddBarang = () => {
  const [supliers, setSupliers] = useState([]);
  const [name, setName] = useState("");
  const [kode, setKode] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [catatan, setCatatan] = useState("");
  const [suplierId, setsuplierId] = useState(1);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const getSuplier = async () => {
    await axios
      .get("https://latifah-backend-production.up.railway.app/suplier")
      .then((res) => {
        setSupliers(res.data);
      });
  };

  useEffect(() => {
    getSuplier();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://latifah-backend-production.up.railway.app/barang",
        {
          name,
          kode,
          harga,
          stok,
          catatan,
          suplierId,
        }
      );
      navigate("/barang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
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
          <FiBox style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Tambah Barang</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Product Name"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Kode</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    placeholder="kode"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">harga</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="harga"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <input
                    type="number"
                    className="input"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    placeholder="stok"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Catatan</label>
                <div className="control">
                  <textarea
                    className="input"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Catatan"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Suplier</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={suplierId}
                      onChange={(e) => setsuplierId(e.target.value)}
                    >
                      {supliers &&
                        supliers.map((data) => {
                          return (
                            <option key={data.id} value={data.id}>
                              {data.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-info">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddBarang;
