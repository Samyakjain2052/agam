import Link from 'next/link';
// import { ChevronRight } from 'lucide-react'; 

interface Props {
    items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: Props) {
    return (
        <nav aria-label="Breadcrumb" className="breadcrumbs-nav">
            <ol className="breadcrumbs-list">
                <li className="breadcrumb-item">
                    <Link href="/">Home</Link>
                    <span className="separator">›</span>
                </li>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.label} className={`breadcrumb-item ${isLast ? 'active' : ''}`}>
                            {isLast ? (
                                <span aria-current="page">{item.label}</span>
                            ) : (
                                <>
                                    <Link href={item.href || '#'}>{item.label}</Link>
                                    <span className="separator">›</span>
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>

            <style jsx>{`
        .breadcrumbs-nav {
            margin-bottom: 1.5rem;
            color: var(--text-muted);
            font-size: 0.9rem;
        }
        .breadcrumbs-list {
            list-style: none;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            padding: 0;
            margin: 0;
        }
        .breadcrumb-item {
            display: flex;
            align-items: center;
        }
        .breadcrumb-item a {
            color: var(--text-muted);
            text-decoration: none;
            transition: color 0.2s;
        }
        .breadcrumb-item a:hover {
            color: var(--primary);
        }
        .breadcrumb-item.active span {
            color: var(--text-main);
            font-weight: 500;
        }
        .separator {
            margin: 0 0.5rem;
            color: var(--text-muted);
            font-size: 1.2em; /* Make chevron slightly larger */
            line-height: 1;
        }
      `}</style>
        </nav>
    );
}
