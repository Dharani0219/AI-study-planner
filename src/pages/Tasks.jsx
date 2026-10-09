import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";



function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    fetchTasks();
    fetchSubjects();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/subjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    console.log("Title:", title);
    console.log("Subject:", subjectId);
    console.log("Due:", dueDate);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        {
          title,
          subjectId,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setSubjectId("");
      setDueDate("");

      fetchTasks();
    } catch (err) {
      console.log(err);
      alert("Failed to add task");
    }
  };

  const completeTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
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
          Tasks
        </h1>

        {/* ADD TASK SECTION */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <option value="">Select Subject</option>

            {subjects.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.subjectName}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "10px 15px",
              background: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </div>

        {/* TASK LIST */}
        {tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: "#1f2937",
              color: "white",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          >
            <h2>{task.title}</h2>

            <p>
              Subject : {task.subjectId?.subjectName || "No Subject"}
            </p>

            <p>Due : {task.dueDate?.substring(0, 10)}</p>

            <p>Status : {task.status}</p>

            {task.status === "Pending" && (
              <button
                onClick={() => completeTask(task._id)}
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  background: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Mark Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;