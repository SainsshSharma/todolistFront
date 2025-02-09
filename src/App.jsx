import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  addTask,
  toggleTaskCompletion,
  deleteTask,
} from "../API/api.js";
import "./App.css";
function App() {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState("");

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  const toggleTaskMutation = useMutation({
    mutationFn: toggleTaskCompletion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTaskMutation.mutate(newTask);
      setNewTask("");
    }
  };

  const GetTodaysDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); 
    var yyyy = today.getFullYear();

    return mm + "/" + dd + "/" + yyyy;
  };

  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p>Error fetching tasks!</p>;

  return (
    <div className="container">
      <h1>{GetTodaysDate()}</h1>
      <div className="taskInput">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask} disabled={addTaskMutation.isLoading}>
          {addTaskMutation.isLoading ? "Adding..." : "Add Task"}
        </button>
      </div>
      <ul>
        {console.log(tasks.data.data)}
        {tasks?.data?.data?.map((task) => (
          <li key={task._id}>
            <input type="checkbox" checked={task.completed} onChange={()=>toggleTaskMutation.mutate(task._id)}></input>
            <p
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </p>
            
              <button onClick={() => deleteTaskMutation.mutate(task._id)}>
                Remove
              </button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
