"use client"

import { useState, useEffect } from "react"
import { getTasks, addTask, completeTask, deleteTask } from "../api/tasksApi"

export default function TaskView() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError("")
      const tasks = await getTasks()
      setTasks(tasks)
    } catch (err) {
      setError("Failed to load tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async () => {
    if (!title.trim()) {
      setError("Title is required!")
      return
    }

    try {
      setLoading(true)
      setError("")
      await addTask(title, description)
      setTitle("")
      setDescription("")
      await fetchTasks()
    } catch (err) {
      setError("Failed to add task")
    } finally {
      setLoading(false)
    }
  }

  const handleCompleteTask = async (id) => {
    try {
      setError("")
      await completeTask(id)
      await fetchTasks()
    } catch (err) {
      setError("Failed to complete task")
    }
  }

  const handleDeleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      setError("")
      await deleteTask(id)
      await fetchTasks()
    } catch (err) {
      setError("Failed to delete task")
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>📋 TASK MANAGER</h1>

      {error && (
        <div
          style={{
            background: "#fee",
            color: "#c33",
            padding: "10px",
            borderRadius: "5px",
            marginBottom: "20px",
            border: "1px solid #fcc",
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          border: "1px solid #ddd",
        }}
      >
        <h3 style={{ marginTop: 0, color: "#555" }}>Add New Task</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Task title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              flex: "2",
              minWidth: "300px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <button
            onClick={handleAddTask}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Adding..." : "+ Add Task"}
          </button>
        </div>
      </div>

      {loading && tasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>Loading tasks...</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <thead>
              <tr style={{ background: "#f8f9fa" }}>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Description</th>
                <th style={tableHeaderStyle}>Created</th>
                <th style={tableHeaderStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    No tasks yet. Add your first task above! 🚀
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={tableCellStyle}>{task.id}</td>
                    <td style={tableCellStyle}>
                      <strong>{task.title}</strong>
                    </td>
                    <td style={tableCellStyle}>
                      <span
                        style={{
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          background: task.status === "Completed" ? "#d4edda" : "#fff3cd",
                          color: task.status === "Completed" ? "#155724" : "#856404",
                        }}
                      >
                        {task.status === "Completed" ? "✅ Completed" : "⏳ Pending"}
                      </span>
                    </td>
                    <td style={tableCellStyle}>
                      {task.description || <em style={{ color: "#999" }}>No description</em>}
                    </td>
                    <td style={tableCellStyle}>
                      {task.createdDate ? new Date(task.createdDate).toLocaleDateString() : "-"}
                    </td>
                    <td style={tableCellStyle}>
                      <div style={{ display: "flex", gap: "5px" }}>
                        {task.status !== "Completed" && (
                          <button
                            onClick={() => handleCompleteTask(task.id)}
                            style={{
                              padding: "5px 10px",
                              background: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                            title="Mark as complete"
                          >
                            ✓
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          style={{
                            padding: "5px 10px",
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                          title="Delete task"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const tableHeaderStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "bold",
  color: "#555",
  borderBottom: "2px solid #dee2e6",
}

const tableCellStyle = {
  padding: "12px",
  verticalAlign: "top",
}
