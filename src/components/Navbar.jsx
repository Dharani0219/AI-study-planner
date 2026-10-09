import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <div
      style={{
        height: "70px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#111827",
            fontSize: "24px",
          }}
        >
          Dashboard
        </h2>

        <p
          style={{
            margin: 0,
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Welcome to AI Study Planner
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <FaBell size={22} color="#4f46e5" />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle size={36} color="#4f46e5" />

          <div>
            <h4
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              Dharani
            </h4>

            <small style={{ color: "#6b7280" }}>
              Student
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;