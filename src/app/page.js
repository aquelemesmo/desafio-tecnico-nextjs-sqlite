"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("/api");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, completed: false }),
    });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await fetch(`/api/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: completed ? 0 : 1 }),
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`/api/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg text-black">
      <h1 className="text-xl font-bold text-center">Crie, edite e delete suas tarefas!</h1>

      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          placeholder="Digite uma tarefa..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          onClick={addTask}
        >
          Adicionar
        </button>
      </div>
      
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center p-2 border-b">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id, task.completed)}
                className="cursor-pointer"
              />
              <span className={task.completed ? "line-through text-gray-500" : ""}>{task.title}</span>
            </div>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              onClick={() => deleteTask(task.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
