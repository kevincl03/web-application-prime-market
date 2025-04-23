"use client";
import { useState } from "react";

interface PaymentRecord {
  id: number;
  userName: string;
  amount: number;
  date: string;
  status: string;
}

const initialPayments: PaymentRecord[] = [
  {
    id: 1,
    userName: "John Doe",
    amount: 150.5,
    date: "2024-10-20",
    status: "Completed",
  },
  {
    id: 2,
    userName: "Jane Smith",
    amount: 200.0,
    date: "2024-10-21",
    status: "Pending",
  },
];

const PaymentRecords = () => {
  const [payments] = useState<PaymentRecord[]>(initialPayments);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Payment Records</h1>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4">Payment ID</th>
            <th className="py-2 px-4">User</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id} className="border-b">
              <td className="py-2 px-4">{payment.id}</td>
              <td className="py-2 px-4">{payment.userName}</td>
              <td className="py-2 px-4">${payment.amount.toFixed(2)}</td>
              <td className="py-2 px-4">{payment.date}</td>
              <td className="py-2 px-4">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentRecords;
