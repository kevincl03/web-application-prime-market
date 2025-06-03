import { MongoClient, Db, ServerApiVersion } from "mongodb";

let client: MongoClient | null = null;
let db: Db | null = null;

export const connectDB = async (): Promise<Db> => {
  if (db && client) return db;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MongoDB URI is not defined in environment variables");
  }

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      retryWrites: true,
    });
    
    // Connect to the MongoDB cluster
    await client.connect();
    db = client.db("App-Ecommerce");
    
    console.log("Connected to MongoDB successfully with connection pooling.");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw new Error("Database connection failed");
  }
};

process.on('SIGINT', async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  }
});
