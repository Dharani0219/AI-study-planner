import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await api.post("/users/register", {
        name,
        email,
        password,
      });

      alert("Registered Successfully");

      navigate("/login");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef2ff",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          width: "350px",
        }}
      >
        <h1>Register</h1>

        <input
          placeholder="Name"
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: "10px", marginTop: "15px" }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "12px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;