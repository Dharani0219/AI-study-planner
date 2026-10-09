import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Fetch all subjects
  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Add new subject
  const addSubject = async () => {
    if (!subjectName.trim()) {
      alert("Please enter a subject name");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/subjects",
        { subjectName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubjectName("");
      fetchSubjects();
    } catch (error) {
  console.log(error);
  console.log(error.response?.data);
  console.log(error.response?.status);
}
  };
const deleteSubject = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.delete(`/subjects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSubjects();
  } catch (err) {
    console.log(err);
    alert("Delete failed");
  }
};
  return (
  <div style={{ display: "flex" }}>
    <Sidebar />

    <div
      style={{
        flex: 1,
        padding: "40px",
        background: "#0f172a",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "white",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Subjects
      </h1>

      {/* Add Subject */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={addSubject}
          style={{
            background: "#4f46e5",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Subject
        </button>
      </div>

      {/* Subject List */}
      {subjects.map((subject) => (
        <div
          key={subject._id}
          style={{
            background: "#1f2937",
            color: "white",
            padding: "18px",
            marginBottom: "15px",
            borderRadius: "12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>{subject.subjectName}</h3>

          <button
            onClick={() => deleteSubject(subject._id)}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  </div>
);
}

export default Subjects;
