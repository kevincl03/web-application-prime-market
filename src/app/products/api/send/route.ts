/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectDB } from "@/lib/connectDB";
import { products } from "@/lib/products";
import { Collection, Document } from "mongodb";

export const GET = async () => {
  const db = await connectDB();
  const productsCollection: Collection<Document> = db.collection("products");
  try {
    await productsCollection.deleteMany();
    const resp = await productsCollection.insertMany(products);
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
