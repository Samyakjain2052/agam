import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CityPageContent from '@/components/CityPageContent';

type Props = {
    params: Promise<{ slug: string }>
}

const SUPPORTED_CITIES = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    if (!slug.endsWith('-escorts')) return {};

    const citySlug = slug.replace('-escorts', '');
    const city = SUPPORTED_CITIES.find(c => c.toLowerCase() === citySlug);

    if (!city) return {};

    return {
        title: `${city} Escorts | High Profile Call Girls in ${city}`,
        description: `Find the best independent escorts and call girls in ${city}. Verified photos, genuine profiles, and premium services available now in ${city}.`,
        keywords: [`${city.toLowerCase()} escorts`, `${city.toLowerCase()} call girls`, `independent escorts ${city}`, `vip escorts ${city}`],
        openGraph: {
            title: `${city} Escorts Service | Verified Listings`,
            description: `Browse 100+ verified call girls in ${city}. Direct WhatsApp booking.`,
        }
    };
}

export default async function CityPage({ params }: Props) {
    const { slug } = await params;

    // Validate URL pattern
    if (!slug.endsWith('-escorts')) {
        notFound();
    }

    const citySlug = slug.replace('-escorts', '');
    const city = SUPPORTED_CITIES.find(c => c.toLowerCase() === citySlug);

    if (!city) {
        notFound();
    }

    // Filter listings for this city from Supabase
    // Note: In a real app we would paginate this.
    const { data: cityListingsDB } = await supabase
        .from('listings')
        .select('*')
        .ilike('location', city) // Case insensitive match
        .order('is_vip', { ascending: false });

    const cityListings = (cityListingsDB || []).map(item => ({
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
    }));

    return <CityPageContent city={city} listings={cityListings} />;
}

