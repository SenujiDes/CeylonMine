import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call your Flask backend here
    const response = await fetch('http://your-flask-backend/api/calculate-royalty', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to calculate royalty');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calculating royalty:', error);
    return NextResponse.json(
      { error: 'Failed to calculate royalty' },
      { status: 500 }
    );
  }
} 