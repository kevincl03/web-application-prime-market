import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

const AdminProfiles = () => {
  const [adminData, setAdminData] = useState({
    name: "John Doe",
    email: "admin@example.com",
  });

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpdate = (e: FormEvent) => {
    e.preventDefault();

    console.log("Updated Profile Data:", adminData);
    alert("Profile updated successfully!");
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("New Password:", newPassword);
    alert("Password changed successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  const { data: session } = useSession();

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white p-6 shadow rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>

        <div className="flex flex-col items-center justify-center">
          {session && (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-40 rounded-full">
                    <Image
                      alt="Profile"
                      src={session.user?.image || "/default-profile.png"}
                      height="100"
                      width="100"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                ></ul>
              </div>

              {/* <div className="text-center mt-2">
                <p className="font-semibold">{session.user?.name}</p>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
              </div> */}
            </>
          )}
        </div>

        <form onSubmit={handleProfileUpdate}>
          <div>
            {session && (
              <>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={session.user?.name || ""}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={session.user?.email || ""}
                    onChange={handleInputChange}
                    className="border p-2 rounded w-full"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </form>
      </div>
      <div className="bg-white p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfiles;
