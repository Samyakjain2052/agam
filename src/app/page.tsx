'use client';

import { useState, useEffect } from 'react';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import SearchModal from '@/components/SearchModal';
import Breadcrumbs from '@/components/Breadcrumbs';

import { supabase } from '@/lib/supabase';
// import { MOCK_LISTINGS } from '@/data/listings'; // Removed mock data import

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<any[]>([]); // Use appropriate type if possible
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Advanced Filters State
  const [advancedFilters, setAdvancedFilters] = useState({
    ageRange: [18, 60],
    ethnicity: '',
    nationality: '',
    bodyType: '',
    serviceType: '',
    attentionTo: ''
  });

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .order('is_vip', { ascending: false }); // VIPs first

      if (error) {
        console.error('Error fetching listings:', error);
      } else {
        // Map DB snake_case to CamelCase if needed, or update ListingCard to handle it.
        // For simplicity, let's map it here to match our frontend interface.
        const mapped = (data || []).map(item => ({
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
            hair: '' // hair not in DB yet
          },
          services: item.services || [],
          isVip: item.is_vip,
          ethnicity: item.ethnicity,
          nationality: item.nationality,
          bodyType: item.body_type,
          serviceType: item.service_type,
          attentionTo: item.attention_to,
        }));
        setListings(mapped);
      }
      setLoading(false);
    }

    fetchListings();
  }, []);

  const filteredListings = listings.filter(l => {
    // 1. Basic Text & City Filter
    const matchesLoc = filter ? l.location === filter : true;
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase());

    // 2. Advanced Filters
    const matchesAge = l.age >= advancedFilters.ageRange[0] && l.age <= advancedFilters.ageRange[1];
    const matchesEthnicity = advancedFilters.ethnicity ? l.ethnicity === advancedFilters.ethnicity : true;
    const matchesBody = advancedFilters.bodyType ? l.bodyType === advancedFilters.bodyType : true;
    const matchesService = advancedFilters.serviceType ?
      (l.serviceType === 'Both' || l.serviceType === advancedFilters.serviceType) : true;
    const matchesAttention = advancedFilters.attentionTo ?
      (l.attentionTo === 'All' || l.attentionTo === advancedFilters.attentionTo) : true;

    return matchesLoc && matchesSearch && matchesAge && matchesEthnicity && matchesBody && matchesService && matchesAttention;
  }); // Sort is already done by DB query (VIP first), but local filtering preserves order usually.

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

      <section className="hero">
        <Breadcrumbs items={[{ label: 'India Call Girls' }]} />

        <h1 className="hero-title">
          Find the Best <span style={{ color: 'var(--primary)' }}>Companions</span> in Your City
        </h1>
        <p className="hero-subtitle">Premium verified listings for your company.</p>

        <div className="search-bar glass">
          <input
            type="text"
            placeholder="Search by name or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
            Filters
          </button>
          <button className="btn btn-primary">Search</button>
        </div>

        <div className="filters">
          <Link href="/" className={`btn btn-sm ${filter === '' ? 'btn-primary' : 'btn-secondary'}`}>All</Link>
          <Link href="/bangalore-escorts" className="btn btn-sm btn-secondary">Bangalore</Link>
          <Link href="/delhi-escorts" className="btn btn-sm btn-secondary">Delhi</Link>
          <Link href="/mumbai-escorts" className="btn btn-sm btn-secondary">Mumbai</Link>
          <Link href="/chennai-escorts" className="btn btn-sm btn-secondary">Chennai</Link>
        </div>
      </section>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>Loading listings...</div>
      ) : (
        <div className="listing-grid">
          {filteredListings.map((listing: any) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}

      {!loading && filteredListings.length === 0 && (
        <div className="empty-state">
          <p>No listings found matching your criteria.</p>
          <button className="btn-link" onClick={() => {
            setSearch('');
            setFilter('');
            setAdvancedFilters({
              ageRange: [18, 60],
              ethnicity: '',
              nationality: '',
              bodyType: '',
              serviceType: '',
              attentionTo: ''
            });
          }}>Clear all filters</button>
        </div>
      )}

      <style jsx>{`
        .hero {
          padding: 2rem 1rem 4rem;
          text-align: center;
        }
        .hero-title {
          font-size: 3rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .hero-subtitle {
          color: var(--text-muted);
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .search-bar {
          max-width: 600px;
          margin: 0 auto 2rem;
          padding: 0.5rem;
          border-radius: 100px;
          display: flex;
          gap: 0.5rem;
        }
        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 0 1.5rem;
          color: white;
          font-size: 1rem;
          outline: none;
        }
        .filters {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        .listing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }
        .empty-state {
          text-align: center;
          padding: 4rem;
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
        @media(max-width: 600px) {
          .hero-title { font-size: 2rem; }
          .search-bar { flex-direction: column; border-radius: var(--radius-lg); }
        }
      `}</style>
    </div>
  );
}
