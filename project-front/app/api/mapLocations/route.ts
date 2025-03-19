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

    if (image) {
      // Convert File to ArrayBuffer
      const arrayBuffer = await image.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      console.log('Attempting to upload file:', {
        fileName,
        fileSize: image.size,
        fileType: image.type
      });

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('map-locations')
        .upload(fileName, buffer, {
          contentType: image.type,
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }

      console.log('File uploaded successfully:', uploadData);

      const { data: { publicUrl } } = supabase.storage
        .from('map-locations')
        .getPublicUrl(fileName);

      image_url = publicUrl;
      console.log('Generated public URL:', image_url);
    }

    console.log('Inserting into database with data:', {
      name,
      latitude,
      longitude,
      short_description,
      image_url,
      long_description
    });

    const { data, error } = await supabase
      .from('locations')
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
      { error: error instanceof Error ? error.message : 'Internal server error' },
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