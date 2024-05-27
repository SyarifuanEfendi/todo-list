'use client'
import { useState } from "react";
import Link from "next/link";
import Login from "./login/page.client";
import Guest from "./guest/page.client";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    // <div className="border-b border-gray-200 dark:border-gray-700">
    //   <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
    //         <li className="me-2" key={`_tabs_login`}>
    //           <Link
    //             href='/auth/login/login'
    //             className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    //           >
    //             Login
    //           </Link>
    //           <Link
    //             href='/auth/login/guest'
    //             className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
    //           >
    //             Guest
    //           </Link>
    //         </li>
    //   </ul>
    // </div>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
        <div className="flex justify-around">
            {/* <Link href={'/auth/login/login'}>Login</Link>
            <Link href={'/auth/login/guest'}>Guest</Link> */}
          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 py-2 font-bold ${
              activeTab === "login"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("guest")}
            className={`px-4 py-2 font-bold ${
              activeTab === "guest"
                ? "text-green-500 border-b-2 border-green-500"
                : "text-gray-500"
            }`}
          >
            Guest
          </button>
        </div>
        {activeTab === "login" && <Login />}
        {activeTab === "guest" && <Guest />}
      </div>
    </div>
  );
};

export default Home;
