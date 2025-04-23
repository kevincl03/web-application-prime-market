import { NextRequest, NextResponse } from "next/server";
import { Db, ObjectId } from "mongodb";
import { connectDB } from "@/lib/connectDB";

// GET handler
export const GET = async (
  request: NextRequest,
  context: { params: { id: string } }
) => {
  const db: Db | null = await connectDB();
  if (!db) {
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }

  const bookingsCollection = db.collection("bookings");
  const { id } = context.params;

  try {
    const resp = await bookingsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!resp) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Booking found", data: resp });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong", error: (error as Error).message },
      { status: 500 }
    );
  }
};
