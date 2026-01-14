'use client';

import { Listing } from '@/data/listings';
import Link from 'next/link';

interface Props {
  listing: Listing;
}

export default function ListingDetails({ listing }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: listing.name,
      description: listing.description,
      image: listing.image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: listing.location,
        addressCountry: 'IN',
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
        areaServed: listing.location,
      },
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/" className="back-link">
        ← Back to Listings
      </Link>

      <div className="profile-layout">
        <div className="gallery-section">
          <div className="main-image glass" style={{ backgroundImage: `url(${listing.image})` }} />
          <div className="gallery-grid">
            {listing.gallery.map((img, idx) => (
              <div key={idx} className="thumb glass" style={{ backgroundImage: `url(${img})` }} />
            ))}
          </div>
        </div>

        <div className="info-section glass">
          <div className="header-info">
            <h1 className="name">{listing.name}</h1>
            <span className="location-badge">{listing.location}</span>
          </div>

          <div className="stats-grid">
            <div className="stat">
              <span className="label">Age</span>
              <span className="value">{listing.age}</span>
            </div>
            <div className="stat">
              <span className="label">Ethnicity</span>
              <span className="value">{listing.ethnicity || '-'}</span>
            </div>
            <div className="stat">
              <span className="label">Body Type</span>
              <span className="value">{listing.bodyType || '-'}</span>
            </div>
            <div className="stat">
              <span className="label">Height</span>
              <span className="value">{listing.stats.height}</span>
            </div>
            <div className="stat">
              <span className="label">Bust</span>
              <span className="value">{listing.stats.bust}</span>
            </div>
            <div className="stat">
              <span className="label">Service</span>
              <span className="value">{listing.serviceType || '-'}</span>
            </div>
          </div>

          <div className="description">
            <h3>About Me</h3>
            <p>{listing.description}</p>
          </div>

          <div className="services">
            <h3>Services</h3>
            <div className="tags">
              {listing.services.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>

          <div className="actions">
            <a
              href={`https://wa.me/${listing.whatsapp}?text=Hi ${listing.name}, I saw your profile on VelvetDirectory.`}
              target="_blank"
              className="btn btn-primary btn-lg"
            >
              Chat on WhatsApp
            </a>
            <button className="btn btn-secondary btn-lg">Call Now</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .back-link {
          display: inline-block;
          margin-bottom: 2rem;
          color: var(--text-muted);
        }
        .back-link:hover { color: var(--primary); }

        .profile-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .main-image {
          height: 500px;
          border-radius: var(--radius-lg);
          background-size: cover;
          background-position: center;
          margin-bottom: 1rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
        }

        .thumb {
          aspect-ratio: 1;
          border-radius: var(--radius-md);
          background-size: cover;
          background-position: center;
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }
        .thumb:hover { opacity: 1; }

        .info-section {
          padding: 2rem;
          border-radius: var(--radius-lg);
          height: fit-content;
        }

        .header-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .name {
          font-size: 2.5rem;
          color: var(--primary);
        }

        .location-badge {
          background: rgba(255,255,255,0.1);
          padding: 0.5rem 1rem;
          border-radius: 100px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 2rem;
        }

        .stat {
          text-align: center;
        }
        .label {
          display: block;
          color: var(--text-muted);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }
        .value {
          font-size: 1.25rem;
          font-weight: 600;
        }

        .description {
          margin-bottom: 2rem;
        }
        .description h3, .services h3 {
          margin-bottom: 0.75rem;
          color: var(--text-main);
        }
        .description p {
          color: var(--text-muted);
          line-height: 1.6;
        }

        .services {
          margin-bottom: 2rem;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .tag {
          background: rgba(99, 102, 241, 0.1);
          color: var(--secondary);
          padding: 0.25rem 0.75rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .actions {
          display: grid;
          gap: 1rem;
        }
        .btn-lg {
          width: 100%;
          font-size: 1.1rem;
          padding: 1rem;
        }

        @media(max-width: 768px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }
          .main-image { height: 400px; }
        }
      `}</style>
    </div>
  );
}
