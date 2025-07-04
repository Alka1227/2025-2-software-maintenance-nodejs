const API_URL = "http://localhost:4000/api"; 

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`)
  if (!res.ok) throw new Error("Failed to fetch tasks")
  return await res.json()
}

export const addTask = async (title, description) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  })
  if (!res.ok) throw new Error("Failed to add task")
  return res
}

export const completeTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}/complete`, {
    method: "PUT",
  })
  if (!res.ok) throw new Error("Failed to complete task")
  return res
}

export const deleteTask = async (id) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Failed to delete task")
  return res
}
