'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header glass">
      <div className="container header-inner">
        <Link href="/" className="logo">
          Velvet<span className="logo-accent">Directory</span>
        </Link>
        <nav className="nav">
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            Home
          </Link>
          <Link href="/post" className={`btn btn-primary btn-sm`}>
            Post Your Ad
          </Link>
        </nav>
      </div>
      <style jsx>{`
        .header {
        position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid var(--border);
      background: rgba(5, 5, 5, 0.8);
      backdrop-filter: blur(10px);
        }
      .header-inner {
        height: 70px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 0 1rem;
        }
      .logo {
        font - size: 1.5rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-right: 2rem;
      white-space: nowrap;
        }
      .logo-accent {
        color: var(--primary);
        }
      .nav {
        display: flex;
      align-items: center;
      gap: 2rem;
        }
      .nav-link {
        font - weight: 500;
      color: var(--text-muted);
      transition: color 0.2s;
      padding: 0.5rem 0;
        }
      .nav-link:hover, .nav-link.active {
        color: var(--text-main);
        }
      .btn-sm {
        padding: 0.6rem 1.25rem;
      font-size: 0.9rem;
      white-space: nowrap;
        }
      @media (max-width: 600px) {
            .logo {font - size: 1.2rem; margin-right: 1rem; }
      .nav {gap: 1rem; }
      .btn-sm {padding: 0.4rem 0.8rem; font-size: 0.8rem; }
        }
      `}</style>
    </header >
  );
}
