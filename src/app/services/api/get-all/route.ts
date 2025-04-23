import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db = await connectDB();

  if (!db) {
    return new NextResponse(
      JSON.stringify({ message: "Database connection failed" }),
      {
        status: 500,
      }
    );
  }

  const servicesCollection: Collection<Document> = db.collection("services");

  try {
    const services = await servicesCollection.find().toArray();
    return new NextResponse(JSON.stringify({ services }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
