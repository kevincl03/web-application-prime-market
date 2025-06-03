import { connectDB } from "@/lib/connectDB";
import { Collection, Document } from "mongodb";
import { NextResponse } from "next/server";

// Add caching and revalidation
export const revalidate = 60; // Revalidate every 60 seconds

export const GET = async () => {
  try {
    const db = await connectDB();

    if (!db) {
      return new NextResponse(
        JSON.stringify({ message: "Database connection failed" }),
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
          }
        }
      );
    }

    const servicesCollection: Collection<Document> = db.collection("services");

    // Optimized query with projection for better performance
    const services = await servicesCollection
      .find({}, {
        projection: {
          _id: 1,
          id: 1,
          name: 1,
          description: 1,
          price: 1,
          image: 1,
          ratings: 1
        }
      })
      .toArray();

    return new NextResponse(JSON.stringify({ services }), {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  }
};
