import { NextResponse } from 'next/server';
import { supabase } from '../../../utility/supabase';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { role, license_status } = body;

    // First check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .single();

    if (checkError || !existingUser) {
      console.error('User not found:', checkError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update both role and license_status in a single query
    const updateData: any = {};
    if (role) updateData.role = role;
    if (license_status) updateData.license_status = license_status;

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
