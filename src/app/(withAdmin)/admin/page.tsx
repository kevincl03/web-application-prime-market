/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define data interfaces
interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

interface UserResponse {
  allUsers: User[];
}

interface Booking {
  _id: string;
  user: string;
  date: string;
  amount: number;
}

interface BookingResponse {
  myBookings: Booking[];
}

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch user data
  const loadData = async () => {
    try {
      const response = await axios.get<UserResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user-managements/api/${session?.user?.id}`
      );
      setUsers(response.data.allUsers || []);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Fetch booking data
  const loadBooking = async () => {
    try {
      const response = await axios.get<BookingResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/${session?.user?.email}`
      );
      setBookings(response.data.myBookings || []);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  useEffect(() => {
    if (session) {
      loadData();
      loadBooking();
    }
  }, [session]);

  // Chart data
  const salesData = {
    labels: ["Total Users", "Total Orders", "Total Sales"],
    datasets: [
      {
        label: "Statistics",
        data: [users.length, bookings.length, 10],
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="min-h-screen w-full pt-2">
      <div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          E-commerce Sell Details with Chart
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
        <div className="p-6 bg-sky-100 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-sky-600">Total Users</h3>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        <div className="p-6 bg-sky-100 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-sky-600">Total Orders</h3>
          <p className="text-3xl font-bold">{bookings.length}</p>
        </div>

        <div className="p-6 bg-sky-100 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-sky-600">Total Sales</h3>
          <p className="text-3xl font-bold">50</p>
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-1">
          Sales Statistics
        </h2>
        <Bar data={salesData} options={salesOptions} />
      </div>
    </div>
  );
};

export default Page;
