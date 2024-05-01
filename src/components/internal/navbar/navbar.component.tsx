"use client";

import Link from "next/link";
import { useContext } from "react";
import AuthenticationSvcContext from "@/shared/services/authentication/authentication.context";
import AuthService from "@/shared/services/authentication/authentication.service";
import { useRouter } from "next/navigation";
import ROUTES from "@/static/router.data";
import { toast } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const authSvc = useContext<AuthService>(AuthenticationSvcContext);

  const userType = authSvc.userType;
  console.log("User Type:", userType);

  const handleLogout = () => {
    authSvc.logout();
    router.push(ROUTES.root);
    toast.success("Logged out successfully!", {
      position: "top-right",
      theme: "dark",
    });
  };

  return (
    <nav className=" border-b border-gray-200 fixed z-30 w-full bg-neutral-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              id="toggleSidebarMobile"
              aria-expanded="true"
              aria-controls="sidebar"
              className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
            >
              <svg
                id="toggleSidebarMobileHamburger"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                id="toggleSidebarMobileClose"
                className="w-6 h-6 hidden"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <Link
              href="/"
              className="flex  justify-center items-center gap-2 text-white"
            >
              <i className="fa-regular fa-truck-ramp-couch fa-2xl"></i>
              <h1 className="text-4xl font-bold">
                <span className="text-red-500 text-4xl font-bold">UN</span>
                PACK
              </h1>
            </Link>
            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
              <label className="sr-only">Search</label>
              <div className="mt-1 relative lg:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-regular fa-magnifying-glass"></i>
                </div>
                <input
                  type="text"
                  name="email"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
            >
              <span className="sr-only">Search</span>
              <i className="fa-regular fa-magnifying-glass"></i>
            </button>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex ml-5 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
            >
              {/* user icon */}
              <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>{" "}
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
