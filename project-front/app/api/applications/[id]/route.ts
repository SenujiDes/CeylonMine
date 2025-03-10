import { NextResponse } from 'next/server';
import { supabase } from '../../../utility/supabase';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { data: application, error } = await supabase
    .from('applications')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch related documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .eq('application_id', params.id);

  // Fetch related comments
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('application_id', params.id)
    .order('created_at', { ascending: false });

  return NextResponse.json({
    ...application,
    documents: documents || [],
    comments: comments || []
  });
}