"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// Define the Booking interface
interface Booking {
  _id: string;
  name: string;
  email: string;
  paymentMethod: string;
  date: string;
  phone: string;
  price: string;
}

const PaymentRecord = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch bookings
  const loadBooking = async () => {
    try {
      const response = await axios.get<{ bookings: Booking[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orderlist/api/get`
      );
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-3xl font-bold mb-8 text-sky-800 text-center">
          Payment Record ({bookings.length})
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b font-bold text-sky-700">
                <th className="py-3 px-4">Name / Email</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Number</th>
                <th className="py-3 px-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">
                    <span>{order.name}</span>
                    <br />
                    <span className="text-sm text-gray-500">{order.email}</span>
                  </td>
                  <td
                    className={`font-bold py-3 px-4 ${
                      order.paymentMethod === "Online Payment"
                        ? "text-sky-400"
                        : "text-red-800"
                    }`}
                  >
                    {order.paymentMethod}
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.phone}</td>
                  <td className="py-3 px-4">{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentRecord;
