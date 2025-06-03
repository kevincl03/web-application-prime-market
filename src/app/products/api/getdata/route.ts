import { connectDB } from "@/lib/connectDB";
import { Collection, Document, Db } from "mongodb";
import { NextResponse } from "next/server";

// Add caching headers and revalidation
export const revalidate = 300; // Revalidate every 5 minutes (increased from 60s)

// In-memory cache for production optimization
let cachedProducts: Document[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const GET = async () => {
  try {
    // Check in-memory cache first for faster response
    const now = Date.now();
    if (cachedProducts && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return new NextResponse(JSON.stringify({ products: cachedProducts }), {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
        }
      });
    }

    const db: Db | null = await connectDB();
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

    const productsCollection: Collection<Document> = db.collection("products");
    
    // Optimized query with projection to only get necessary fields and create index hint
    const products = await productsCollection
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
      .sort({ _id: 1 }) // Add consistent sorting
      .toArray();

    // Update cache
    cachedProducts = products;
    cacheTimestamp = now;

    return new NextResponse(JSON.stringify({ products }), {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    
    // Return cached data if available, even on error
    if (cachedProducts) {
      return new NextResponse(JSON.stringify({ products: cachedProducts }), {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
          'Content-Type': 'application/json',
          'X-Cache': 'STALE',
        }
      });
    }
      return new NextResponse(JSON.stringify({ message: "Error occurred" }), {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    });
  }
};
