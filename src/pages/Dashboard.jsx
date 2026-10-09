import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import StatCard from "../components/StatCard";
import api from "../services/api";

import {
  FaBook,
  FaTasks,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

function Dashboard() {
  const [stats, setStats] = useState({
    subjects: 0,
    tasks: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const subRes = await api.get("/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const taskRes = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const completed = taskRes.data.filter(
        (task) => task.status === "Completed"
      ).length;

      const pending = taskRes.data.filter(
        (task) => task.status === "Pending"
      ).length;

      setStats({
        subjects: subRes.data.length,
        tasks: taskRes.data.length,
        completed,
        pending,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1
        style={{
          fontSize: "38px",
          color: "#111827",
          marginBottom: "10px",
        }}
      >
        👋 Welcome Back
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "35px",
          fontSize: "18px",
        }}
      >
        Track your study progress with AI Study Planner
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
        }}
      >
        <StatCard
          title="Subjects"
          value={stats.subjects}
          icon={<FaBook size={28} />}
          color="#4f46e5"
        />

        <StatCard
          title="Tasks"
          value={stats.tasks}
          icon={<FaTasks size={28} />}
          color="#7c3aed"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          icon={<FaCheckCircle size={28} />}
          color="#16a34a"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          icon={<FaClock size={28} />}
          color="#f59e0b"
        />
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#111827",
            marginBottom: "15px",
          }}
        >
          🎯 Today's Goal
        </h2>

        <p
          style={{
            color: "#6b7280",
            fontSize: "16px",
          }}
        >
          Finish your pending tasks and revise today's subjects.
        </p>
      </div>
    </Layout>
  );
}

export default Dashboard;