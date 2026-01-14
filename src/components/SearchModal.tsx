import { useState } from 'react';

interface FilterState {
    ageRange: [number, number];
    ethnicity: string;
    nationality: string;
    bodyType: string;
    serviceType: string;
    attentionTo: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
}

export default function SearchModal({ isOpen, onClose, onApply }: Props) {
    const [filters, setFilters] = useState<FilterState>({
        ageRange: [18, 50],
        ethnicity: '',
        nationality: '',
        bodyType: '',
        serviceType: '',
        attentionTo: ''
    });

    if (!isOpen) return null;

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content glass" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Advanced Search</h2>
                    <button className="close-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="modal-body">
                    {/* Age Range */}
                    <div className="filter-group">
                        <label>Age Range</label>
                        <div className="range-inputs">
                            <input
                                type="number"
                                min="18" max="60"
                                value={filters.ageRange[0]}
                                onChange={e => setFilters({ ...filters, ageRange: [Number(e.target.value), filters.ageRange[1]] })}
                                className="input"
                            />
                            <span>to</span>
                            <input
                                type="number"
                                min="18" max="60"
                                value={filters.ageRange[1]}
                                onChange={e => setFilters({ ...filters, ageRange: [filters.ageRange[0], Number(e.target.value)] })}
                                className="input"
                            />
                        </div>
                    </div>

                    {/* Ethnicity */}
                    <div className="filter-group">
                        <label>Ethnicity</label>
                        <select
                            value={filters.ethnicity}
                            onChange={e => setFilters({ ...filters, ethnicity: e.target.value })}
                            className="select"
                        >
                            <option value="">Any</option>
                            <option value="Indian">Indian</option>
                            <option value="Asian">Asian</option>
                            <option value="Russian">Russian</option>
                            <option value="Latina">Latina</option>
                        </select>
                    </div>

                    {/* Body Type */}
                    <div className="filter-group">
                        <label>Body Type</label>
                        <div className="chips">
                            {['Slim', 'Curvy', 'Athletic', 'Petite', 'BBW'].map(type => (
                                <button
                                    key={type}
                                    className={`chip ${filters.bodyType === type ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, bodyType: filters.bodyType === type ? '' : type })}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Service Type */}
                    <div className="filter-group">
                        <label>Service Type</label>
                        <div className="chips">
                            {['Incall', 'Outcall', 'Both'].map(type => (
                                <button
                                    key={type}
                                    className={`chip ${filters.serviceType === type ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, serviceType: filters.serviceType === type ? '' : type })}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Attention To */}
                    <div className="filter-group">
                        <label>Attention To</label>
                        <select
                            value={filters.attentionTo}
                            onChange={e => setFilters({ ...filters, attentionTo: e.target.value })}
                            className="select"
                        >
                            <option value="">Any</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Couples">Couples</option>
                        </select>
                    </div>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleApply}>Apply Filters</button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
        }
        .modal-content {
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            border: 1px solid var(--border);
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 1rem;
        }
        .close-btn {
            background: none;
            border: none;
            color: var(--text-muted);
            font-size: 2rem;
            cursor: pointer;
        }
        
        .filter-group {
            margin-bottom: 1.5rem;
        }
        .filter-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-muted);
            font-size: 0.9rem;
        }

        .input, .select {
            width: 100%;
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--border);
            padding: 0.75rem;
            border-radius: var(--radius-md);
            color: var(--text-main);
        }
        .range-inputs {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .chips {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }
        .chip {
            background: rgba(255,255,255,0.05);
            border: 1px solid var(--border);
            padding: 0.5rem 1rem;
            border-radius: 100px;
            color: var(--text-muted);
            cursor: pointer;
            transition: all 0.2s;
        }
        .chip.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .modal-footer {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            border-top: 1px solid var(--border);
            padding-top: 1rem;
        }
      `}</style>
        </div>
    );
}
