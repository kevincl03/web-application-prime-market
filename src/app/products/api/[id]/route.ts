import { connectDB } from "@/lib/connectDB";
import { Collection, Document, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const db = await connectDB();
  if (!db) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const { id } = await params;
  const productsCollection: Collection<Document> = db.collection("products");
  try {
    const product = await productsCollection.findOne({
      _id: new ObjectId(id),
    });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
};
