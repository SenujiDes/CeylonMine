import { NextResponse } from 'next/server';
import { supabase } from '../../../utility/supabase';

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { role, license_status } = await request.json();

    // First check if user exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (checkError) {
      console.error('Database error:', checkError);
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    if (!existingUser) {
      console.error('User not found with ID:', id);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update both role and license_status in a single query
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({
        role: role || existingUser.role,
        license_status: license_status || existingUser.license_status
      })
      .eq('id', id)
      .select()
      .maybeSingle();

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    if (!updatedUser) {
      return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
