"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import the Next.js Image component

interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

// Define the type for the response data
interface UsersResponse {
  allUsers: User[];
}

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      const loadData = async () => {
        try {
          const response = await axios.get<UsersResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/user-managements/api/${session.user.email}`
          );
          setUsers(response.data.allUsers || []);
        } catch (error) {
          console.error("Error loading users:", error);
        }
      };
      loadData();
    }
  }, [session]); // Add session as a dependency

  return (
    <div className="overflow-x-auto pt-8">
      <div className="text-3xl text-sky-900 mb-4">
        Total Users: {users.length}
      </div>
      <table className="table table-zebra w-full mb-8">
        <thead>
          <tr className="bg-gray-100 border-b font-bold text-sky-700">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Photo</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, image, name, email }, index) => (
            <tr key={_id}>
              <th>{index + 1}</th>
              <td>
                <Image
                  src={image}
                  alt={name}
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              </td>
              <td>{name}</td>
              <td>{email}</td>
              <td>Admin</td>
              <td>
                <div className="flex items-center space-x-2">
                  <button className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>

                  <button
                    /* onClick={() => handleDelete(_id)} */
                    className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
