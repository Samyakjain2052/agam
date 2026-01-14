'use client';

import Link from 'next/link';
import Image from 'next/image';

interface ListingProps {
  id: string;
  name: string;
  location: string;
  age: number;
  image: string;
  isVip?: boolean; // Optional to support existing calls if any
  whatsapp?: string; // Optional
}

export default function ListingCard({ listing }: { listing: ListingProps }) {
  return (
    <Link href={`/listing/${listing.id}`} className={`listing-card glass ${listing.isVip ? 'vip-card' : ''}`}>
      <div className="image-wrapper" suppressHydrationWarning>
        <Image
          src={listing.image}
          alt={`${listing.name} - ${listing.location} Escort`} // Keyword rich alt text
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {listing.isVip && <span className="badge badge-vip">VIP</span>}
        <span className="badge badge-new location-badge">{listing.location}</span>
      </div>
      <div className="content" suppressHydrationWarning>
        <h3 className="name">
          {listing.name}, <span className="age">{listing.age}</span>
          {listing.isVip && <span className="verified-check">✓</span>}
        </h3>

        <div className="card-actions">
          <button className="btn btn-primary btn-sm">View Profile</button>
          {listing.whatsapp && (
            <button
              className="btn btn-whatsapp btn-sm"
              onClick={(e) => {
                e.preventDefault();
                window.open(`https://wa.me/${listing.whatsapp}`, '_blank');
              }}
            >
              Chat
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .listing-card {
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          display: block;
          position: relative;
        }
        .vip-card {
            border: 1px solid var(--primary);
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.2); /* Gold glow */
        }
        .listing-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: var(--primary);
        }
        .image-wrapper {
          height: 300px;
          background: #222;
          position: relative;
        }
        /* image styles handled by next/image + class */
        .location-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          z-index: 2;
        }
        .badge-vip {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            color: black;
            font-weight: bold;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            z-index: 2;
        }

        .content {
          padding: 1.25rem;
        }
        .name {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .verified-check {
            color: var(--primary);
            font-size: 0.9em;
        }
        .age {
          font-weight: 400;
          color: var(--text-muted);
          font-size: 1rem;
        }
        
        .card-actions {
            display: flex;
            gap: 0.5rem;
        }
        .btn-full {
          width: 100%;
        }
        .btn-whatsapp {
            background: #25D366;
            color: white;
            border: none;
        }
      `}</style>
      {/* Global helpful styles for next/image */}
      <style jsx global>{`
        .object-cover { object-fit: cover; }
      `}</style>
    </Link>
  );
}
