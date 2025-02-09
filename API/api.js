import axios from "axios";

const API_URL = "http://localhost:8000/tasks/";

export const fetchTasks = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const addTask = async (title) => {
  const { data } = await axios.post(API_URL, { title });
  return data;
};

export const toggleTaskCompletion = async (id) => {
  const { data } = await axios.patch(`${API_URL}/${id}/complete`);
  console.log(data)
  return data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
