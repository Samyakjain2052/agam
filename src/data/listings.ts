export interface Listing {
    id: string;
    // Basic Info
    name: string;
    age: number;
    location: string;
    image: string;
    description: string;
    whatsapp: string;
    gallery: string[];

    // Stats
    stats: {
        height: string;
        bust: string;
        hair: string;
    };

    // Advanced / Oklute Replication
    isVip: boolean;
    ethnicity: string;      // e.g. 'Indian', 'Asian', 'Russian'
    nationality: string;    // e.g. 'Indian'
    bodyType: string;       // e.g. 'Slim', 'Curvy', 'Athletic'
    services: string[];     // Array of strings
    serviceType: 'Incall' | 'Outcall' | 'Both';
    attentionTo: 'Men' | 'Women' | 'Couples' | 'All';
    postedDate: string;     // ISO Date string
}

export const MOCK_LISTINGS: Listing[] = [
    {
        id: '1',
        name: 'Priya',
        location: 'Bangalore',
        age: 24,
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80',
        description: 'Fun loving and open minded companion for your events and travel.',
        whatsapp: '919876543210',
        services: ['Dinner Date', 'Travel Companion', 'Events'],
        stats: { height: '5\'6"', bust: '34C', hair: 'Black' },
        gallery: [
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80'
        ],
        isVip: true,
        ethnicity: 'Indian',
        nationality: 'Indian',
        bodyType: 'Curvy',
        serviceType: 'Both',
        attentionTo: 'Men',
        postedDate: '2023-10-01'
    },
    {
        id: '2',
        name: 'Sofie',
        location: 'Delhi',
        age: 22,
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80',
        description: 'Charming and elegant. Ready to make your evening special.',
        whatsapp: '919876543210',
        services: ['Dinner Date', 'Party'],
        stats: { height: '5\'5"', bust: '32B', hair: 'Brown' },
        gallery: [
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80',
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80'
        ],
        isVip: false,
        ethnicity: 'Indian',
        nationality: 'Indian',
        bodyType: 'Slim',
        serviceType: 'Outcall',
        attentionTo: 'Men',
        postedDate: '2023-10-05'
    },
    {
        id: '3',
        name: 'Natasha',
        location: 'Mumbai',
        age: 25,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80',
        description: 'Sophisticated and classy model.',
        whatsapp: '919876543210',
        services: ['Modelling', 'Events', 'VIP Services'],
        stats: { height: '5\'8"', bust: '34D', hair: 'Black' },
        gallery: [
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80'
        ],
        isVip: true,
        ethnicity: 'Russian',
        nationality: 'Russian',
        bodyType: 'Athletic',
        serviceType: 'Incall',
        attentionTo: 'Men',
        postedDate: '2023-10-10'
    },
    {
        id: '4',
        name: 'Kiara',
        location: 'Bangalore',
        age: 23,
        image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&q=80',
        description: 'Sweet and bubbly personality.',
        whatsapp: '919876543210',
        services: ['Girlfriend Experience', 'Movies'],
        stats: { height: '5\'4"', bust: '32C', hair: 'Black' },
        gallery: [],
        isVip: false,
        ethnicity: 'Indian',
        nationality: 'Indian',
        bodyType: 'Petite',
        serviceType: 'Both',
        attentionTo: 'Men',
        postedDate: '2023-10-12'
    },
    {
        id: '5',
        name: 'Riya',
        location: 'Delhi',
        age: 26,
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=500&q=80',
        description: 'Professional and discreet.',
        whatsapp: '919876543210',
        services: ['Business Events', 'Travel'],
        stats: { height: '5\'7"', bust: '34B', hair: 'Highlight' },
        gallery: [],
        isVip: true,
        ethnicity: 'Indian',
        nationality: 'Indian',
        bodyType: 'Slim',
        serviceType: 'Outcall',
        attentionTo: 'All',
        postedDate: '2023-10-15'
    },
    {
        id: '6',
        name: 'Ananya',
        location: 'Mumbai',
        age: 21,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80',
        description: 'Young and energetic.',
        whatsapp: '919876543210',
        services: ['Parties', 'Clubbing'],
        stats: { height: '5\'3"', bust: '30A', hair: 'Black' },
        gallery: [],
        isVip: false,
        ethnicity: 'Indian',
        nationality: 'Indian',
        bodyType: 'Petite',
        serviceType: 'Both',
        attentionTo: 'Couples',
        postedDate: '2023-10-18'
    },
];
