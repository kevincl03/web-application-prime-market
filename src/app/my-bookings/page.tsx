/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define types
interface Booking {
  _id: string;
  productName: string;
  price: string;
  date: string;
  paymentMethod: string;
}

interface BookingResponse {
  myBookings: Booking[];
}

interface DeleteResponse {
  response: {
    deletedCount: number;
  };
}

const Page = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadData = async () => {
    try {
      // Get bookings data with the appropriate type
      const response = await axios.get<BookingResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/${session?.user?.email}`
      );
      if (response.status === 200) {
        setBookings(response.data.myBookings || []);
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Delete booking and ensure proper typing for the response
      const response = await axios.delete<DeleteResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/booking/${id}`
      );

      if (response.status === 200 && response.data.response?.deletedCount > 0) {
        loadData();
      } else {
        console.error("Failed to delete booking:", response.data);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  return (
    <div className="overflow-x-auto pt-8 mt-20">
      <h1 className="flex items-center justify-center mb-2 text-3xl">
        My Booking
      </h1>
      <table className="table table-zebra">
        <thead>
          <tr className="bg-gray-100 border-b font-bold text-sky-700">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Payment</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(
            ({ productName, _id, date, price, paymentMethod }, index) => (
              <tr key={_id}>
                <th>{index + 1}</th>
                <td>{productName}</td>

                <td
                  className={`font-bold py-2 px-4 ${
                    paymentMethod === "Online Payment"
                      ? "text-sky-400"
                      : "text-red-800"
                  }`}
                >
                  {paymentMethod}
                </td>
                <td>{price}</td>
                <td>{date}</td>
                <td>
                  <div className="flex items-center space-x-2">
                    <Link href={`/my-bookings/update/${_id}`}>
                      <button className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
