'use client';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <h3 className="footer-title">VelvetDirectory</h3>
          <p className="footer-text">
            The premium destination for verified listings.
          </p>
        </div>
        <div className="footer-col">
          <p className="disclaimer">
            &copy; {new Date().getFullYear()} VelvetDirectory. All rights reserved. <br />
            Must be 18+ to enter.
          </p>
        </div>
      </div>
      <style jsx>{`
        .footer {
          border-top: 1px solid var(--border);
          padding: 3rem 0;
          margin-top: auto;
          background: var(--surface);
        }
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }
        .footer-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
        }
        .footer-text {
          color: var(--text-muted);
          max-width: 300px;
        }
        .disclaimer {
          color: var(--text-muted);
          font-size: 0.875rem;
          text-align: right;
        }
        @media(max-width: 600px) {
          .footer-inner { flex-direction: column; text-align: center; }
          .disclaimer { text-align: center; }
        }
      `}</style>
    </footer>
  );
}
