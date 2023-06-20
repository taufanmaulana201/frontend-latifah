import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiTruck } from "react-icons/fi";

const FormEditSuplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [catatan, setCatatan] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await axios.get(`https://backend-latifah-production.up.railway.app/suplier/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setHp(response.data.hp);
        setAlamat(response.data.alamat);
        setCatatan(response.data.catatan);
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
      await axios.patch(`https://backend-latifah-production.up.railway.app/suplier/${id}`, {
        name,
        email,
        hp,
        alamat,
        catatan,
      });
      navigate("/suplier");
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
          <FiTruck style={{ fontSize: "100px", marginRight: "15px" }} />
        </div>
        <div>
          <h2 className="subtitle">Edit Suplier</h2>
          <h1 className="title">Latifah Busana</h1>
        </div>
      </div>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
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
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email address"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">No.Hp</label>
                <div className="control">
                  <input
                    className="input"
                    value={hp}
                    onChange={(e) => setHp(e.target.value)}
                    placeholder="nomor hp"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Alamat</label>
                <div className="control">
                  <textarea
                    className="input"
                    value={alamat}
                    onChange={(e) => setAlamat(e.target.value)}
                    placeholder="Alamat"
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
                <div className="control">
                  <button type="submit" className="button is-info">
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

export default FormEditSuplier;
