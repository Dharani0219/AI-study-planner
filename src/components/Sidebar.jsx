import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Brain,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <CheckSquare size={20} />,
    }
   
  ];

  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "#ffffff",
        padding: "25px",
        boxShadow: "2px 0 15px rgba(0,0,0,0.08)",
      }}
    >
      <h1
        style={{
          color: "#4f46e5",
          fontSize: "28px",
          marginBottom: "50px",
        }}
      >
        📚 AI Study Planner
      </h1>

      {menus.map((menu) => (
        <Link
          key={menu.path}
          to={menu.path}
          style={{
            textDecoration: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px",
              marginBottom: "12px",
              borderRadius: "12px",
              background:
                location.pathname === menu.path
                  ? "#4f46e5"
                  : "transparent",
              color:
                location.pathname === menu.path
                  ? "white"
                  : "#374151",
              transition: "0.3s",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            {menu.icon}

            {menu.name}
          </div>
        </Link>
      ))}

      <div
        style={{
          marginTop: "60px",
          padding: "18px",
          background: "#eef2ff",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h3
          style={{
            margin: 0,
            color: "#4f46e5",
          }}
        >
          🚀 Keep Learning
        </h3>

        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginTop: "10px",
          }}
        >
          Complete your daily tasks and stay consistent.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;