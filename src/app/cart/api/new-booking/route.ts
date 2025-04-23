/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from "@/lib/connectDB";
import { Collection } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: { json: () => any }) => {
  const newBooking = await request.json();
  const db = await connectDB();
  const bookingsCollection: Collection<Document> = db.collection("carts");

  try {
    const res = await bookingsCollection.insertOne(newBooking);
    return new NextResponse(JSON.stringify({ message: "Sent Successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
