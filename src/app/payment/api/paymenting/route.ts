/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from "@/lib/connectDB";
import { Collection } from "mongodb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async (request: { json: () => any }) => {
  const newBooking = await request.json();
  const db = await connectDB();
  const bookingsCollection: Collection<Document> = db.collection("bookings");

  try {
    const res = await bookingsCollection.insertOne(newBooking);
    return new Response(JSON.stringify({ message: "Sent Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
