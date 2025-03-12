import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response that will clear the cookie
    const response = NextResponse.json({ success: true });

    // Clear the adminToken cookie
    response.cookies.set({
      name: 'adminToken',
      value: '',
      expires: new Date(0), // Set expiration to past date to ensure deletion
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }
}