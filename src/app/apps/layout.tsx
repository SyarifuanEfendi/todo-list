"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navs";
import { TaskProvider } from "./tasks/context";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const Dashboard = ({ children }: DashboardLayoutProps) => {
  const [cookies, setCookies] = useState<{ user: string } | null>(null);
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
  const username = cookies?.user?.name || "Guest";

  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100">
        <header>
          <Navbar username={username} />
        </header>
        <main>
          <div className="flex items-center justify-center py-20">
            <div className="bg-white p-8 rounded-lg shadow-lg overflow-hidden w-full max-w-md">
              {children}
            </div>
          </div>
        </main>
      </div>
    </TaskProvider>
  );
};

export default Dashboard;
