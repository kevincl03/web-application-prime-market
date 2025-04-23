import { connectDB } from "@/lib/connectDB";
import { Collection, Document, Db } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  const db: Db | null = await connectDB();
  if (!db) {
    return new NextResponse(
      JSON.stringify({ message: "Database connection failed" }),
      {
        status: 500,
      }
    );
  }

  const productsCollection: Collection<Document> = db.collection("products");
  try {
    const products = await productsCollection.find().toArray();
    return new NextResponse(JSON.stringify({ products }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
    });
  }
};
