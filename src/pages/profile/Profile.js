import React, { useState, useEffect } from "react";

const Profile = () => {
    const [user, setUser] = useState();
    const [listUsers, setListUsers] = useState([]);
    const [changePassModalOpen, setChangePassModalOpen] = useState(false);

    // State for password change form
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [rePass, setRePass] = useState("");
    const [error, setError] = useState({});

    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((response) => response.json())
            .then((data) => setListUsers(data));
        setUser(JSON.parse(sessionStorage.getItem("user")));
    }, []);

    const handleChangeAccPass = () => {
        setError({});

        if (currentPass !== user.password) {
            setError({ currentPass: "Password is not correct" });
            return;
        }
        if (newPass !== rePass) {
            setError({ rePass: "New password does not match" });
            return;
        }
        if (newPass.length < 6 || newPass.length > 20) {
            setError({
                newPass: "Password must be between 6 and 20 characters",
            });
            return;
        }

        const updatedUser = { ...user, password: newPass };

        fetch(`http://localhost:9999/user/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
                sessionStorage.setItem("user", JSON.stringify(data));
                alert("Password changed successfully");
                setChangePassModalOpen(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("An error occurred while changing password");
            });
    };

    const updateProfile = async () => {
        if (user) {
            try {
                let existingUser = listUsers.find(
                    (u) => u.id !== user.id && u.email === user.email
                );
                if (existingUser) {
                    alert("Account already exists, please choose another email");
                } else {
                    const updatedUser = { ...user,roll:user.roll };

                    const response = await fetch(
                        `http://localhost:9999/user/${user.id}`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(updatedUser),
                        }
                    );

                    if (!response.ok) throw new Error("Error updating user.");

                    const data = await response.json();
                    setUser(updatedUser);
                    sessionStorage.setItem("user", JSON.stringify(updatedUser));
                    alert("Update successfully!");
                }
            } catch (error) {
                alert("Update failed");
                console.error("Error updating user:", error);
            }
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

            <div className="mb-4">
                <label className="block text-gray-700">First Name:</label>
                <input
                    type="text"
                    value={user ? user.firstName : ""}
                    onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            firstName: e.target.value,
                        }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Last Name:</label>
                <input
                    type="text"
                    value={user ? user.lastName : ""}
                    onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            lastName: e.target.value,
                        }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Phone Number:</label>
                <input
                    type="text"
                    value={user ? user.phone : ""}
                    onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            phone: e.target.value,
                        }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Address:</label>
                <input
                    type="text"
                    value={user ? user.address : ""}
                    onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            address: e.target.value,
                        }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                    type="text"
                    value={user ? user.email : ""}
                    onChange={(e) =>
                        setUser((prevUser) => ({
                            ...prevUser,
                            email: e.target.value,
                        }))
                    }
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <button
                onClick={updateProfile}
               className="w-full py-2  mb-4  text-white bg-gray-800 rounded-md hover:bg-gray-800 focus:outline-none"
            >
                Update Profile
            </button>

            <button
                onClick={() => setChangePassModalOpen(true)}
               className="w-full py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none"
            >
                Change Password
            </button>


            {changePassModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h4 className="text-xl font-semibold mb-4">Change Password</h4>

                        <div className="mb-4">
                            <label className="block text-gray-700">Current Password:</label>
                            <input
                                type="password"
                                value={currentPass}
                                onChange={(e) => setCurrentPass(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            {error.currentPass && (
                                <p className="text-red-500 text-sm">{error.currentPass}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">New Password:</label>
                            <input
                                type="password"
                                value={newPass}
                                onChange={(e) => setNewPass(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            {error.newPass && (
                                <p className="text-red-500 text-sm">{error.newPass}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Confirm New Password:</label>
                            <input
                                type="password"
                                value={rePass}
                                onChange={(e) => setRePass(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            {error.rePass && (
                                <p className="text-red-500 text-sm">{error.rePass}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setChangePassModalOpen(false)}
                                className="py-2 px-4 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleChangeAccPass}
                                className="py-2 px-4 text-white bg-gray-500 rounded-md hover:bg-blue-600 focus:outline-none"
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
