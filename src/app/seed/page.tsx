'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { MOCK_LISTINGS, Listing } from '@/data/listings';

export default function SeedPage() {
    const [status, setStatus] = useState('Idle');
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog(prev => [...prev, msg]);

    const handleSeed = async () => {
        setStatus('Seeding...');
        addLog('Starting seed process...');

        try {
            for (const listing of MOCK_LISTINGS) {
                addLog(`Inserting ${listing.name}...`);

                // Map local Listing type to potentially snake_case DB columns if needed
                // Assuming the DB columns match the Listing interface keys largely, 
                // but let's be explicit to match the SQL schema we created.
                const dbRow = {
                    name: listing.name,
                    location: listing.location,
                    age: listing.age,
                    image: listing.image,
                    description: listing.description,
                    whatsapp: listing.whatsapp,
                    gallery: listing.gallery,
                    // Stats flattened? Or stored as JSON?
                    // Schema said: height text, bust text.
                    height: listing.stats.height,
                    bust: listing.stats.bust,
                    // hair is missing in listing.stats in some mock data, check interface? 
                    // Interface has hair. Mock data has hair. Schema has no 'hair' column? 
                    // Let's check schema: "height text, bust text". No hair.

                    services: listing.services,

                    is_vip: listing.isVip,
                    ethnicity: listing.ethnicity,
                    nationality: listing.nationality,
                    body_type: listing.bodyType,
                    service_type: listing.serviceType,
                    attention_to: listing.attentionTo,
                    // posted_date? Schema has created_at default now(). 
                    // listing has postedDate string.
                };

                const { error } = await supabase.from('listings').insert(dbRow);

                if (error) {
                    console.error('Error inserting', listing.name, error);
                    addLog(`Error inserting ${listing.name}: ${error.message}`);
                } else {
                    addLog(`Success: ${listing.name}`);
                }
            }
            addLog('Seeding complete!');
            setStatus('Done');
        } catch (e: any) {
            addLog(`Critical Error: ${e.message}`);
            setStatus('Error');
        }
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <h1>Database Seeder</h1>
            <p style={{ marginBottom: '2rem', color: '#888' }}>
                Click below to insert MOCK_LISTINGS into your Supabase table.
            </p>

            <button
                className="btn btn-primary"
                onClick={handleSeed}
                disabled={status === 'Seeding...'}
            >
                {status === 'Seeding...' ? 'Seeding...' : 'Start Seeding'}
            </button>

            <div className="logs" style={{ marginTop: '2rem', textAlign: 'left', background: '#111', padding: '1rem', borderRadius: '8px', maxHeight: '300px', overflowY: 'auto' }}>
                {log.map((l, i) => <div key={i} style={{ fontFamily: 'monospace', marginBottom: '0.25rem' }}>{Math.random().toString(36).substring(7)}: {l}</div>)}
            </div>
        </div>
    );
}
