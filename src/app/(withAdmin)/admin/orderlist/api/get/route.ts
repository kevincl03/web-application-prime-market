/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// GET handler
export const GET = async (request: NextRequest) => {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { message: "Database connection failed" },
        { status: 500 }
      );
    }

    const bookingsCollection: Collection<Document> = db.collection("bookings");
    const bookings = await bookingsCollection.find().toArray();

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "An error occurred", error: (error as Error).message },
      { status: 500 }
    );
  }
};
