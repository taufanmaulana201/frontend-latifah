import React from "react";

const CardDashboard = ({ br, jenis, value, waktu, total, logo }) => {
  return (
    <div
      className=""
      style={{
        cursor: "pointer",
        width: "250px",
        height: "120px",
        background: `white`,
        borderLeft: `5px solid ${br}`,
        borderRadius: "6px",
        marginRight: "10px",
        boxShadow: "3px 5px #eaeaea",
        padding: "5px",
        display: "flex",
      }}
    >
      <div
        style={{
          color: "#3333",
          fontWeight: "bold",
          width: "20%",
          fontSize: "50px",
        }}
      >
        {logo}
      </div>
      <div style={{ width: "80%", textAlign: "right", marginRight: "15px" }}>
        <p className="" style={{ fontSize: "24px", fontWeight: "bold" }}>
          {jenis}
        </p>
        <p
          style={{
            fontSize: "14px",
            fontWeight: "normal",
            color: "grey",
            lineHeight: "4px",
          }}
        >
          {waktu}
        </p>
        <p style={{ fontSize: "20px", fontWeight: "normal", marginTop: "5px" }}>
          {value}
        </p>
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{total}</p>
      </div>
    </div>
  );
};

export default CardDashboard;
