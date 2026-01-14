// import { MOCK_LISTINGS } from '@/data/listings'; // Mock data removed
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ListingDetails from '@/components/ListingDetails';
import { supabase } from '@/lib/supabase';

async function getListing(id: string) {
  const { data: item, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !item) {
    return null;
  }

  // Map to local Listing interface
  return {
    id: item.id,
    name: item.name,
    location: item.location,
    age: item.age,
    image: item.image,
    description: item.description,
    whatsapp: item.whatsapp,
    gallery: item.gallery || [],
    stats: {
      height: item.height || '',
      bust: item.bust || '',
      hair: ''
    },
    services: item.services || [],
    isVip: item.is_vip,
    ethnicity: item.ethnicity,
    nationality: item.nationality,
    bodyType: item.body_type,
    serviceType: item.service_type,
    attentionTo: item.attention_to,
    postedDate: item.created_at,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) return { title: 'Listing Not Found' };

  return {
    title: `${listing.name} - ${listing.age} | ${listing.location} Call Girls`,
    description: listing.description,
    openGraph: {
      title: `${listing.name} in ${listing.location}`,
      description: listing.description,
      images: [listing.image],
    },
  };
}

export default async function ListingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListing(id);

  if (!listing) {
    notFound();
  }

  // @ts-ignore - Ignore type mismatch for now if any
  return <ListingDetails listing={listing} />;
}
