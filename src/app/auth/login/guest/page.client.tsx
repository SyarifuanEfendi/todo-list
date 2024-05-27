"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Guest: React.FC = () => {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/apps/tasks");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <button
        type="submit"
        className="w-full py-2 px-4 bg-green-500 rounded-md hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none"
      >
        Continue as Guest
      </button>
    </form>
  );
};

export default Guest;
