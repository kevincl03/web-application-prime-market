import { NextResponse } from 'next/server';
import { optimizeDatabase, getDatabaseStats, explainQuery } from '@/utils/database-optimization';

export async function GET() {
  try {
    // Get current database stats
    const stats = await getDatabaseStats();
    
    return NextResponse.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error getting database stats:', error);
    return NextResponse.json(
      { error: 'Failed to get database stats' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, query, options } = body;

    switch (action) {
      case 'optimize':
        const optimizationResult = await optimizeDatabase();
        return NextResponse.json(optimizationResult);

      case 'stats':
        const stats = await getDatabaseStats();
        return NextResponse.json({ success: true, stats });

      case 'explain':
        const explanation = await explainQuery(query || {}, options || {});
        return NextResponse.json({ success: true, explanation });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in database optimization endpoint:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
