import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SideBar = () => {

  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/signin");
  }
  return (
    <div className="bg-gray-800 text-white w-full lg:w-64 p-6 flex flex-col min-h-screen">
      <Link to="/" className="text-center text-xl font-bold text-white mb-6">
        <h2>Home</h2>
      </Link>
      <ul className="space-y-4">
        <li>
          <NavLink
            to="/dashboard"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700"
          >
            <i className="bi bi-box mr-3"></i>
            <p>Products</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account"
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700"
          >
            <i className="bi bi-people mr-3"></i>
            <p>Users</p>
          </NavLink>
        </li>
        <li>
          <NavLink
           
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700"
          >
            <i className="bi bi-receipt mr-3"></i>
            <p>Orders</p>
          </NavLink>
        </li>
        <li>
          <NavLink
       
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700"
          >
            <i className="bi bi-list-ul mr-3"></i>
            <p>Categories</p>
          </NavLink>
        </li>
        <li>
          <NavLink
         
            className="flex items-center p-2 hover:bg-gray-700 rounded"
            activeClassName="bg-gray-700"
          >
            <i className="bi bi-graph-up mr-3"></i>
            <p>Statistics</p>
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 hover:bg-gray-700 rounded w-full text-left"
          >
            <i className="bi bi-box-arrow-right mr-3"></i>
            <p>Logout</p>
          </button>
        </li>
      </ul>

      <div className="mt-auto">
        <p className="text-center text-xs">
          &copy; 2024 All Rights Reserved
        </p>
      </div>


    </div>
  );
};

export default SideBar;
