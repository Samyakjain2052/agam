import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://velvet-directory.example.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all listings IDs for dynamic sitemap
    const { data: listings } = await supabase
        .from('listings')
        .select('id, created_at');

    const listingUrls = (listings || []).map((listing) => ({
        url: `${BASE_URL}/listing/${listing.id}`,
        lastModified: new Date(listing.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const cityPages = ['Bangalore', 'Delhi', 'Mumbai', 'Chennai'].map(city => ({
        url: `${BASE_URL}/${city.toLowerCase()}-escorts`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const, // City pages update often with new ads
        priority: 0.9,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/post`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...cityPages,
        ...listingUrls,
    ];
}
