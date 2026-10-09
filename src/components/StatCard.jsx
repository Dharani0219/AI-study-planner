function StatCard({ title, value, icon, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        transition: "0.3s",
        cursor: "pointer",
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "15px",
          }}
        >
          {title}
        </p>

        <h1
          style={{
            marginTop: "12px",
            fontSize: "38px",
            color: "#111827",
          }}
        >
          {value}
        </h1>
      </div>

      <div
        style={{
          background: color,
          width: "60px",
          height: "60px",
          borderRadius: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        {icon}
      </div>
    </div>
  );
}

export default StatCard;