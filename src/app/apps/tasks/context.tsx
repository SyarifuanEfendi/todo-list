// src/context/TaskContext.tsx
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { Task } from "./type";

interface TaskContextProps {
  tasks: Task[];
  tasksComplated: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  toggleTaskCompletion: (id: number) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksComplated, setTasksComplated] = useState<Task[]>([]);
  const [cookies, setCookies] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/todo?moduleID=getCookies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get cookies");
        }
        const newTask = await response.json();
        setCookies(newTask.responseData);
      } catch (error) {
        console.error("Error getting session cookies:", error);
      }
    };
    fetchData();
  }, []);

  const addTask = async (task: Task) => {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        user: cookies?.user?.name || "Guest",
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    getDataOngoing();
  };

  const updateTask = async (updatedTask: Task) => {
    console.log("update");
    console.log(updatedTask);
    const id = updatedTask.id;
    const response = await fetch(`/api/todo?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTask.title }),
    });
    getDataOngoing();
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`/api/todo?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    getDataOngoing();
    getDataComplated();
    // setTasks(tasks.filter((task) => task.id !== id));
  };

  const getDataOngoing = async () => {
    const response = await fetch(`/api/todo?moduleID=getDataOngoing`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get task");
    }
    const newTask = await response.json();
    const newTasks: Task[] = newTask.responseData;
    setTasks(newTasks);
  };

  const getDataComplated = async () => {
    const response = await fetch(`/api/todo?moduleID=getDataComplated`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get task");
    }
    const newTask = await response.json();
    const newTasks: Task[] = newTask.responseData;
    setTasksComplated(newTasks);
  };

  const toggleTaskCompletion = async (id: number) => {
    const response = await fetch(`/api/todo?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "check" }),
    });

    getDataOngoing();
    getDataComplated();
    // setTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, completed: !task.completed } : task
    //   )
    // );
  };
  useEffect(() => {
    getDataOngoing();
    getDataComplated();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        tasksComplated,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
