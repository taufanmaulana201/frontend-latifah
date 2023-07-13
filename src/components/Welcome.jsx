import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardDashboard from "./CardDashboard";
import { FiBox, FiLogOut, FiShoppingCart } from "react-icons/fi";
import axios from "axios";
import moment from "moment";
import {
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const hariini = moment().format("L");
  const bulanini = moment().format("L");
  const [laporan, SetLaporan] = useState([]);
  const [pengeluaran, setPengeluaran] = useState([]);
  const [barang, setBarang] = useState([]);
  const [filtertoday, setFilterToday] = useState(hariini);
  const [filterBulan, setFilterBulan] = useState(bulanini);
  const [filter, setFilter] = useState("bulan");

  const getlaporan = async () => {
    try {
      const data = await axios.get(
        "https://latifah-backend-production.up.railway.app/invoice"
      );
      SetLaporan(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getlaporan();
  }, []);
  const getpengeluaran = async () => {
    try {
      const data = await axios.get(
        "https://latifah-backend-production.up.railway.app/pengeluaran"
      );
      setPengeluaran(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getpengeluaran();
  }, []);
  const getBarang = async () => {
    try {
      const data = await axios.get(
        "https://latifah-backend-production.up.railway.app/barang"
      );
      setBarang(data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getBarang();
  }, []);

  const transaksihariini =
    laporan &&
    laporan
      .filter(
        (data) => moment(data.createdAt).format("L") === moment().format("L")
      )
      .map((data) => data);
  let totaltoday = 0;
  transaksihariini.map((data) => (totaltoday += data.total));

  const transaksibulanini =
    laporan &&
    laporan
      .filter(
        (data) =>
          moment(data.createdAt).format("MMMM") === moment().format("MMMM")
      )
      .map((data) => data);
  let totalbulan = 0;
  transaksibulanini.map((data) => (totalbulan += data.total));
  let totalpengeluaran = 0;
  pengeluaran.map((data) => (totalpengeluaran += data.price));

  const data =
    laporan &&
    laporan.filter((data) =>
      filter === "today"
        ? moment(data.createdAt).format("L") === moment(filtertoday).format("L")
        : moment(data.createdAt).format("MMMM") ===
          moment(filterBulan).format("MMMM")
    );

  return (
    <div style={{ position: "relative" }}>
      <div
        className=""
        style={{ width: "100%", height: "150px", background: "skyblue" }}
      ></div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 80,
          left: 5,
        }}
      >
        <CardDashboard
          logo={<FiShoppingCart />}
          br={"red"}
          jenis={"Transaksi"}
          value={`${transaksihariini.length} Items`}
          waktu={"Hari Ini"}
          total={`Rp. ${totaltoday}`}
        />
        <CardDashboard
          logo={<FiShoppingCart />}
          br={"yellow"}
          jenis={"Transaksi"}
          value={`${transaksibulanini.length} items`}
          waktu={"Bulan Ini"}
          total={`Rp. ${totalbulan}`}
        />
        <CardDashboard
          logo={<FiLogOut />}
          br={"green"}
          jenis={"Pengeluaran"}
          value={`${pengeluaran.length} Items`}
          waktu={"Bulan Ini"}
          total={`Rp. ${totalpengeluaran}`}
        />
        <CardDashboard
          logo={<FiBox />}
          br={"blue"}
          jenis={"Barang"}
          value={`${barang.length} Barang`}
          // waktu={"Minggu Ini"}
          // total={`Rp. 5000000`}
        />
      </div>
      <div style={{ marginTop: "70px", padding: "10px" }}>
        <h1 className="title">Grafik Penjualan</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
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
            )}
          </div>
        </div>
        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="createdAt" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="total"
                fill="#8884d8"
                stroke="#8884d8"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
