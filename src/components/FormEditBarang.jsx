import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiBox } from "react-icons/fi";

const FormEditBarang = () => {
  const [name, setName] = useState("");
  const [harga, setharga] = useState("");
  const [catatan, setCatatan] = useState("");
  const [kode, setKode] = useState("");
  const [stok, setStok] = useState("");
  const [suplierId, setsuplierId] = useState("");
  const [msg, setMsg] = useState("");
  const [supliers, setSupliers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/barang/${id}`);
        setKode(response.data.kode);
        setName(response.data.name);
        setStok(response.data.stok);
        setharga(response.data.harga);
        setCatatan(response.data.harga);
        setsuplierId(response.data.suplierId);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/barang/${id}`, {
        name,
        harga,
        kode,
        stok,
        suplierId,
        catatan,
      });
      navigate("/barang");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const getSuplier = async () => {
    await axios.get("http://localhost:5000/suplier/").then((res) => {
      setSupliers(res.data);
    });
  };

  useEffect(() => {
    getSuplier();
  }, []);

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
          <h2 className="subtitle">Edit Barang</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Kode Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    placeholder="kode barang"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Nama Barang</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="nama barang"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Stok</label>
                <div className="control">
                  <textarea
                    className="input"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    placeholder="stok barang"
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
                    placeholder="catatan"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Role</label>
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
                  <button type="submit" className="button is-success">
                    Update
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

export default FormEditBarang;
