import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";

const Account = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:9999/user`);
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleShow = (user = null) => {
    setIsEditing(!!user);
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      id: currentUser?.id || Date.now().toString(),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      email: formData.get("email"),
      dateOfBirth: formData.get("dateOfBirth"),
      roll: parseInt(formData.get("roll")),
      password: formData.get("password"),
    };

    if (isEditing) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === currentUser.id ? userData : user))
      );
    } else {
      setUsers((prevUsers) => [...prevUsers, userData]);
    }

    handleClose();
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    const sortedUsers = [...users].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];

      if (field === "roll") {
        aValue = aValue === 1 ? "Admin" : "User";
        bValue = bValue === 1 ? "Admin" : "User";
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col lg:flex-row">
      <SideBar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">User Manager</h1>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => handleShow()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add User
          </button>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded"
          />
        </div>

        <table className="w-full bg-white border border-gray-200 rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("firstName")}>
                Full Name {sortField === "firstName" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("email")}>
                Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left cursor-pointer" onClick={() => handleSort("roll")}>
                Role {sortField === "roll" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 border-b">
                <td className="p-3">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.address || "N/A"}</td>
                <td className="p-3">{user.roll === 1 ? "Admin" : "User"}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleShow(user)}
                    className="px-3 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            Previous
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`px-4 py-2 border rounded ${
                currentPage === pageNumber + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            Next
          </button>
        </div>

        {/* Modal for Add/Edit User */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg w-11/12 md:w-2/3 lg:w-1/3 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit User" : "Add User"}
              </h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={currentUser?.firstName || ""}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={currentUser?.lastName || ""}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={currentUser?.phone || ""}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={currentUser?.address || ""}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={currentUser?.email || ""}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium">Role</label>
                  <select
                    name="roll"
                    defaultValue={currentUser?.roll || 0}
                    className="w-full border p-2 rounded"
                  >
                    <option value={0}>User</option>
                    <option value={1}>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    defaultValue={currentUser?.password || ""}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;