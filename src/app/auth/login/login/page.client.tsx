"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [form, setForm] = useState({
    userId: "john.doe@example.com",
    password: "password",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Reset error state

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: form.userId, password: form.password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log(response);
      
      console.log("Login successful:", data);
      router.push("/apps/tasks");
    } catch (err) {
      setError("Gagal login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          required
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 rounded-md hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
