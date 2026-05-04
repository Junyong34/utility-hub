import { NextRequest, NextResponse } from 'next/server';
import { queryPlaceList } from '@/lib/places';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const payload = queryPlaceList({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      region: searchParams.get('region'),
      search: searchParams.get('search'),
      age: searchParams.get('age'),
      category: searchParams.get('category'),
      indoor: searchParams.get('indoor'),
      outdoor: searchParams.get('outdoor'),
      free: searchParams.get('free'),
      feeding: searchParams.get('feeding'),
      stroller: searchParams.get('stroller'),
      rain: searchParams.get('rain'),
    });

    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json(
      { error: 'Failed to fetch places' },
      { status: 500 }
    );
  }
}
