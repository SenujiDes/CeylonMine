import { NextResponse } from 'next/server';
import { supabase } from '../../utility/supabase';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const latitude = parseFloat(formData.get('latitude') as string);
    const longitude = parseFloat(formData.get('longitude') as string);
    const short_description = formData.get('short_description') as string;
    const long_description = formData.get('long_description') as string;
    const image = formData.get('image') as File;

    let image_url = '';

    // Upload image to Supabase Storage if image is provided
    if (image) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('map-locations')
        .upload(fileName, image);

      if (uploadError) {
        throw new Error('Failed to upload image');
      }

      // Get the public URL of the uploaded image
      const { data: { publicUrl } } = supabase.storage
        .from('map-locations')
        .getPublicUrl(fileName);

      image_url = publicUrl;
    }

    // Save location data to database
    const { data, error } = await supabase
      .from('map_locations')
      .insert([
        {
          name,
          latitude,
          longitude,
          short_description,
          image_url,
          long_description,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}