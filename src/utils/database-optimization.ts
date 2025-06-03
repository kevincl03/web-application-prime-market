import { connectDB } from '@/lib/connectDB';

interface IndexSpecification {
  [key: string]: 1 | -1 | 'text';
}

export async function optimizeDatabase() {
  try {
    const db = await connectDB();
    
    const productsCollection = db.collection('products');

    const indexes: IndexSpecification[] = [
      { name: 1 },
      { category: 1 },
      { price: 1 },
      { brand: 1 },
      { rating: -1 },
      { createdAt: -1 },
      { updatedAt: -1 },
      
      { category: 1, price: 1 },
      { category: 1, rating: -1 },
      { brand: 1, price: 1 },
      
      { discount: 1 },
      { featured: 1 },
    ];

      for (const index of indexes) {
      try {
        await productsCollection.createIndex(index);
      } catch {
        console.log(`Index already exists or error:`, index);
      }
    }

    try {
      await productsCollection.createIndex(
        { 
          name: 'text', 
          description: 'text',
          category: 'text',
          brand: 'text'
        },
        { 
          weights: { 
            name: 10, 
            category: 5,
            brand: 3,
            description: 1 
          }
        }
      );
   } catch {
      console.log('Text search index already exists');
    }

    const usersCollection = db.collection('users');    
    const userIndexes: IndexSpecification[] = [
      { email: 1 },
      { createdAt: -1 },
      { role: 1 },
    ];for (const index of userIndexes) {
      try {
        await usersCollection.createIndex(index);
      } catch {
      }
    }

    const bookingsCollection = db.collection('bookings');    
    const bookingIndexes: IndexSpecification[] = [
      { userId: 1 },
      { userEmail: 1 },
      { createdAt: -1 },
      { status: 1 },
      { userId: 1, createdAt: -1 },
    ];for (const index of bookingIndexes) {
      try {
        await bookingsCollection.createIndex(index);
      } catch {
      }
    }
    
    const productIndexes = await productsCollection.listIndexes().toArray();
    
    return {
      success: true,
      message: 'Database optimized successfully',
      indexCount: productIndexes.length
    };

  } catch (error) {
    console.error('Error optimizing database:', error);    return {
      success: false,
      message: 'Failed to optimize database',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function getDatabaseStats() {
  try {
    const db = await connectDB();
    
    const productsCollection = db.collection('products');
    
    const stats = await db.command({ collStats: 'products' });
    const indexes = await productsCollection.listIndexes().toArray();
    
    return {
      totalDocuments: stats.count || 0,
      dataSize: stats.size || 0,
      storageSize: stats.storageSize || 0,
      avgObjSize: stats.avgObjSize || 0,
      indexCount: indexes.length,
      indexes: indexes.map((idx: { name?: string; key?: Record<string, unknown> }) => ({ 
        name: idx.name || 'unknown', 
        key: idx.key || {} 
      }))
    };
    
  } catch {
    console.error('Error getting database stats');
    return null;
  }
}

export async function explainQuery(query: Record<string, unknown> = {}, options: Record<string, unknown> = {}) {
  try {
    const db = await connectDB();
    const productsCollection = db.collection('products');
    
    const explanation = await productsCollection
      .find(query, options)
      .explain('executionStats');
    
    return {
      executionTime: explanation.executionStats.executionTimeMillis,
      totalDocsExamined: explanation.executionStats.totalDocsExamined,
      totalDocsReturned: explanation.executionStats.totalDocsReturned,
      indexUsed: explanation.executionStats.indexName || 'COLLSCAN',
      efficiency: explanation.executionStats.totalDocsReturned / explanation.executionStats.totalDocsExamined
    };
    
  } catch {
    console.error('Error explaining query');
    return null;
  }
}
