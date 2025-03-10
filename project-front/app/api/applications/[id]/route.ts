import { NextResponse } from 'next/server';
import { supabase } from '../../../utility/supabase';

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  // Await the params
  const { id } = await context.params;

  // First query
  const { data: application, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch related documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('application_id', id);

  // Fetch related comments
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('application_id', id)
    .order('created_at', { ascending: false });

  return NextResponse.json({
    ...application,
    documents: documents || [],
    comments: comments || []
  });
}