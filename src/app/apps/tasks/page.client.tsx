"use client";
import { useState } from "react";
import { TaskProvider, useTasks } from "./context";
import TaskList from "./components/taskList";
import AddTaskForm from "./components/taskAdd";
import { Task } from "./type";

const HomePage = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const { addTask, updateTask } = useTasks();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSubmit = (task: Task) => {
    if (editingTask) {
      updateTask(task);
      setEditingTask(null);
    } else {
      addTask(task);
    }
  };
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Management</h2>
      <AddTaskForm
        onSubmit={handleSubmit}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <TaskList onEditTask={handleEditTask} />
    </div>
  );
};

export default HomePage;
