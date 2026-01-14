'use client';

import { useState } from 'react';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { Listing } from '@/data/listings';
import SearchModal from '@/components/SearchModal';
import Breadcrumbs from '@/components/Breadcrumbs';

interface Props {
    city: string;
    listings: Listing[];
}

export default function CityPageContent({ city, listings }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [advancedFilters, setAdvancedFilters] = useState({
        ageRange: [18, 60],
        ethnicity: '',
        nationality: '',
        bodyType: '',
        serviceType: '',
        attentionTo: ''
    });

    const filteredListings = listings.filter(l => {
        // Advanced Filters
        const matchesAge = l.age >= advancedFilters.ageRange[0] && l.age <= advancedFilters.ageRange[1];
        const matchesEthnicity = advancedFilters.ethnicity ? l.ethnicity === advancedFilters.ethnicity : true;
        const matchesBody = advancedFilters.bodyType ? l.bodyType === advancedFilters.bodyType : true;
        const matchesService = advancedFilters.serviceType ?
            (l.serviceType === 'Both' || l.serviceType === advancedFilters.serviceType) : true;
        const matchesAttention = advancedFilters.attentionTo ?
            (l.attentionTo === 'All' || l.attentionTo === advancedFilters.attentionTo) : true;

        return matchesAge && matchesEthnicity && matchesBody && matchesService && matchesAttention;
    }).sort((a, b) => {
        // VIP Sorting
        if (a.isVip && !b.isVip) return -1;
        if (!a.isVip && b.isVip) return 1;
        return 0;
    });

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <SearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={(filters) => {
                    setAdvancedFilters({
                        ageRange: filters.ageRange,
                        ethnicity: filters.ethnicity,
                        nationality: filters.nationality,
                        bodyType: filters.bodyType,
                        serviceType: filters.serviceType,
                        attentionTo: filters.attentionTo
                    });
                }}
            />

            <section className="city-hero">
                <Breadcrumbs items={[{ label: `${city} Escorts` }]} />

                <h1 className="hero-title">
                    Premium <span className="highlight">{city} Escorts</span>
                </h1>

                <div className="seo-content glass">
                    <p>
                        Welcome to the premier destination for finding high-class <strong>{city} Escorts</strong>.
                        Our directory features verified independent call girls and top agencies in {city}.
                    </p>
                    <div className="filter-actions" style={{ marginTop: '1rem' }}>
                        <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                            Advanced Filters & Search
                        </button>
                    </div>
                </div>
            </section>

            <h2 className="section-title">Latest Profiles in {city}</h2>

            <div className="listing-grid">
                {filteredListings.length > 0 ? (
                    filteredListings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No listings found matching your criteria in {city}.</p>
                        <button className="btn-link" onClick={() => setAdvancedFilters({
                            ageRange: [18, 60],
                            ethnicity: '',
                            nationality: '',
                            bodyType: '',
                            serviceType: '',
                            attentionTo: ''
                        })}>Clear Filters</button>
                    </div>
                )}
            </div>

            <div className="seo-footer">
                <h3>Why Choose Our {city} Escort Directory?</h3>
                <ul>
                    <li>✅ 100% Verified Profiles</li>
                    <li>✅ Direct WhatsApp Contact</li>
                    <li>✅ No Middlemen</li>
                    <li>✅ Premium & Independent Models</li>
                </ul>
            </div>

            <style jsx>{`
        .city-hero {
          padding: 3rem 0;
        }
        
        .hero-title {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }
        .highlight { color: var(--primary); }
        
        .seo-content {
          padding: 2rem;
          border-radius: var(--radius-lg);
          margin-bottom: 3rem;
        }
        .seo-content p {
          line-height: 1.7;
          margin-bottom: 1rem;
          color: #ddd;
        }
        .section-title {
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border);
        }

        .listing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }
        .empty-state {
            grid-column: 1 / -1;
            padding: 4rem;
            text-align: center;
            background: var(--surface);
            border-radius: var(--radius-lg);
            color: var(--text-muted);
        }
        .btn-link {
            background: none;
            border: none;
            color: var(--primary);
            text-decoration: underline;
            cursor: pointer;
            margin-top: 1rem;
        }

        .seo-footer {
            background: var(--surface);
            padding: 2rem;
            border-radius: var(--radius-lg);
        }
        .seo-footer h3 { margin-bottom: 1rem; }
        .seo-footer ul { 
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
        }
        .seo-footer li {
            color: var(--text-muted);
        }
      `}</style>
        </div>
    );
}
