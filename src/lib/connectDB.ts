import { MongoClient, Db, ServerApiVersion } from "mongodb";

let db: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (db) return db;

  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
  if (!uri) {
    throw new Error("MongoDB URI is not defined in environment variables");
  }

  try {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect(); // Ensure the connection is established
    db = client.db("App-Ecommerce");
    console.log("Connected to MongoDB successfully.");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
};
