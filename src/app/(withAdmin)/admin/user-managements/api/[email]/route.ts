/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: {
    _id: string; // Adjusting _id type to string for compatibility
    email: string;
  };
};

export const GET = async (request: NextRequest, { params }: RouteParams) => {
  const db = await connectDB();

  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const userCollection: Collection<Document> = db.collection("users");

  try {
    // If `_id` represents a MongoDB ObjectId, convert it properly
    const filter = ObjectId.isValid(params._id)
      ? { _id: new ObjectId(params._id) }
      : { id: params._id };

    const allUsers = await userCollection.find(filter).toArray();

    return NextResponse.json({ allUsers });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
