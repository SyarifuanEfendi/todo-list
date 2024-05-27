// src/components/AddTaskForm.tsx
import { useState, useEffect } from "react";
import { useTasks } from "../context";
import { Task } from "../type";

interface AddTaskFormProps {
  onSubmit: (task: Task) => void;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

const AddTaskForm = ({
  onSubmit,
  editingTask,
  setEditingTask,
}: AddTaskFormProps) => {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
    } else {
      setTitle("");
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: editingTask ? editingTask.id : null,
      title,
      completed: editingTask ? editingTask.completed : false,
    };
    onSubmit(newTask);
    setEditingTask(null);
  };

  const handleCancel = () => {
    setTitle("");
    setEditingTask(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
        />
      </div>
      <div className="flex justify-center mt-2">
        {editingTask ? (
          <>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Task
          </button>
        )}
      </div>
    </form>
  );
};

export default AddTaskForm;
