import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { email: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const bookingsCollection: Collection<Document> = db.collection("bookings");

  try {
    const myBookings = await bookingsCollection
      .find({ email: params.email })
      .toArray();
    return NextResponse.json({ myBookings });
  } catch (error) {
    console.error("Error fetching email:", error);
    return NextResponse.json(
      { error: "Failed to fetch email" },
      { status: 500 }
    );
  }
};
