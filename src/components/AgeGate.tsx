'use client';

import { useState, useEffect } from 'react';

export default function AgeGate() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasConsented = localStorage.getItem('age-consent');
        if (!hasConsented) {
            setIsVisible(true);
        }
    }, []);

    const handleEnter = () => {
        localStorage.setItem('age-consent', 'true');
        setIsVisible(false);
    };

    const handleLeave = () => {
        window.location.href = 'https://google.com';
    };

    if (!isVisible) return null;

    return (
        <div className="age-gate-overlay">
            <div className="age-gate-modal glass">
                <h1 className="warning-title">18+ Content Warning</h1>
                <p className="warning-text">
                    This website contains material that is intended for adults only.
                    By entering, you certify that you are over 18 years of age and wish to view such content.
                </p>
                <div className="button-group">
                    <button onClick={handleLeave} className="btn btn-secondary">
                        Exit
                    </button>
                    <button onClick={handleEnter} className="btn btn-primary">
                        I am 18+ - Enter
                    </button>
                </div>
            </div>

            <style jsx>{`
        .age-gate-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .age-gate-modal {
          max-width: 500px;
          width: 100%;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          background: #111;
        }
        .warning-title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to right, #fff, #999);
          -webkit-background-clip: text;
          color: transparent;
        }
        .warning-text {
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        @media (max-width: 480px) {
          .button-group {
            flex-direction: column;
          }
          .btn {
            width: 100%;
          }
        }
      `}</style>
        </div>
    );
}
