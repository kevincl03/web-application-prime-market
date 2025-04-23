import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }
  const bookingsCollection = db.collection("bookings");
  const { id } = params;
  try {
    const resp = await bookingsCollection.deleteOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({
      message: "Deleted booking product",
      response: resp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }
  const bookingsCollection = db.collection("bookings");

  const updateDoc = await request.json();
  try {
    const resp = await bookingsCollection.updateOne(
      { _id: new ObjectId(params.id) },
      {
        $set: {
          ...updateDoc,
        },
      },
      {
        upsert: true,
      }
    );
    return NextResponse.json({
      message: "Updated booking product",
      response: resp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { message: "Database connection failed" },
      { status: 500 }
    );
  }
  const bookingsCollection = db.collection("bookings");
  const { id } = params;

  try {
    const resp = await bookingsCollection.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({
      message: "Booking found",
      data: resp,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
