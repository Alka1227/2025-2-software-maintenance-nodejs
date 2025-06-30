const API_URL = "http://localhost:3000/api"; 
export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return await res.json();
};

export const addTask = async (title, description) => {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
};
