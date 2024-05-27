// src/components/TaskList.tsx
import { useTasks } from "../context";
import { Check, Edit, Trash } from "lucide-react";
import { Task } from "../type";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface TaskListProps {
  onEditTask: (task: Task) => void;
}

const TaskList = ({ onEditTask }: TaskListProps) => {
  const { tasks, tasksComplated, toggleTaskCompletion, deleteTask } =
    useTasks();
  return (
    <div className="grid  gap-4 py-8">
      <h4 className="font-bold">Ongoing Task</h4>
      {tasks?.length > 0 &&
        tasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 border rounded-lg ${
              task?.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label className="flex items-center space-x-2">
                  <span className="font-semibold">{task.title}</span>
                  <button
                    onClick={() => onEditTask(task)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Update Task"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </label>
                <span className="text-gray-500 text-sm">
                  {task.createdAt
                    ? format(new Date(task.createdAt), "dd MMMM yyyy HH:mm", {
                        locale: id,
                      })
                    : ""}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700 flex items-center justify-center rounded-full w-5 h-5"
                  aria-label="Delete Task"
                >
                  <Trash className="w-5 h-5" />
                </button>
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="flex items-center justify-center rounded-full text-white w-5 h-5 border border-black"
                  aria-label="Complete Task"
                >
                  {/* <Check className="w-5 h-5" /> */}
                </button>
              </div>
            </div>
            <p className="mt-2">{task.description}</p>
          </div>
        ))}
      <h4 className="font-bold">Completed Task</h4>
      {tasksComplated?.length > 0 &&
        tasksComplated.map((task) => (
          <div
            key={task.id}
            className={`p-4 border rounded-lg ${
              task.completed ? "bg-green-100" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <label className="flex items-center space-x-2">
                  <span className="font-semibold line-through">
                    {task.title}
                  </span>
                  <button
                    onClick={() => onEditTask(task)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Update Task"
                    disabled={true}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                </label>
                <span className="text-gray-500 text-sm">
                  {task.createdAt
                    ? format(new Date(task.createdAt), "dd MMMM yyyy HH:mm", {
                        locale: id,
                      })
                    : ""}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete Task"
                  disabled={true}
                >
                  <Trash className="w-5 h-5" />
                </button>
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="flex items-center justify-center rounded-full bg-green-500 text-white w-5 h-5 hover:bg-green-700 border border-black"
                  aria-label="Complete Task"
                  disabled={true}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="mt-2">{task.description}</p>
          </div>
        ))}
    </div>
  );
};

export default TaskList;
