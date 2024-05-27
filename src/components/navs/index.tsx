"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("logout gagal");
    }

    // Redirect ke halaman login
    router.push("/auth/login");
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>{/* Empty div to push the central items to the middle */}</div>
        <div className="flex space-x-4 justify-center">
          <a href="/apps/tasks" className="text-white font-semibold">
            Tasks
          </a>
          {username != "Guest" && (
            <a href="/apps/profile" className="text-white font-semibold">
              Profile
            </a>
          )}
        </div>
        <div className="relative">
          <div
            className="text-white font-semibold cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          >
            {username}
          </div>
          {showLogout && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48">
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
