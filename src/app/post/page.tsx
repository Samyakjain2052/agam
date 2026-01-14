'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PostAd() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: 'Bangalore',
    whatsapp: '',
    description: '',
    ethnicity: '',
    nationality: '',
    bodyType: '',
    serviceType: 'Both',
    attentionTo: 'All',
    height: '',
    bust: '',
  });

  // File States
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setGalleryFiles(Array.from(e.target.files));
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('listings')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('listings')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!mainImageFile) {
        alert("Please select a main profile photo.");
        setLoading(false);
        return;
      }

      setUploading(true);

      // 1. Upload Main Image
      const mainImageUrl = await uploadImage(mainImageFile);

      // 2. Upload Gallery Images
      const galleryUrls = await Promise.all(
        galleryFiles.map(file => uploadImage(file))
      );

      // 3. Save to Database
      const { error } = await supabase.from('listings').insert({
        name: formData.name,
        age: parseInt(formData.age),
        location: formData.city,
        description: formData.description,
        whatsapp: formData.whatsapp,
        // Stats
        height: formData.height,
        bust: formData.bust,
        // Oklute Attributes
        ethnicity: formData.ethnicity,
        nationality: formData.nationality,
        body_type: formData.bodyType,
        service_type: formData.serviceType,
        attention_to: formData.attentionTo,
        // Images
        image: mainImageUrl,
        gallery: galleryUrls,
        is_vip: false
      });

      if (error) throw error;

      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (error: any) {
      console.error('Error posting ad:', error);
      alert('Failed to submit ad: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="success-card glass">
          <div className="icon">✓</div>
          <h1>Ad Submitted Successfully!</h1>
          <p>Your listing is now live on the site.</p>
          <button onClick={() => window.location.href = '/'} className="btn btn-primary" style={{ marginTop: '2rem' }}>
            Return Home
          </button>
        </div>
        <style jsx>{`
          .success-card {
            max-width: 500px;
            margin: 0 auto;
            padding: 3rem;
            border-radius: var(--radius-lg);
          }
          .icon {
            font-size: 4rem;
            color: var(--primary);
            margin-bottom: 1rem;
          }
          h1 { margin-bottom: 1rem; }
          p { color: var(--text-muted); }
        `}</style>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <h1 className="page-title">Post Your Ad</h1>
      <p className="subtitle">Join the premium directory. Fill out the details below.</p>

      <form onSubmit={handleSubmit} className="form glass">
        <div className="form-group">
          <label>Display Name</label>
          <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Natasha" className="input" />
        </div>

        <div className="row">
          <div className="form-group">
            <label>City</label>
            <select name="city" value={formData.city} onChange={handleChange} className="input">
              <option>Bangalore</option>
              <option>Delhi</option>
              <option>Mumbai</option>
              <option>Chennai</option>
            </select>
          </div>
          <div className="form-group">
            <label>Age</label>
            <input required name="age" value={formData.age} onChange={handleChange} type="number" min="18" max="60" className="input" />
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Ethnicity</label>
            <select name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="input">
              <option value="">Select...</option>
              <option value="Indian">Indian</option>
              <option value="Asian">Asian</option>
              <option value="Russian">Russian</option>
              <option value="Latina">Latina</option>
            </select>
          </div>
          <div className="form-group">
            <label>Body Type</label>
            <select name="bodyType" value={formData.bodyType} onChange={handleChange} className="input">
              <option value="">Select...</option>
              <option value="Slim">Slim</option>
              <option value="Curvy">Curvy</option>
              <option value="Athletic">Athletic</option>
              <option value="BBW">BBW</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Nationality</label>
            <input name="nationality" value={formData.nationality} onChange={handleChange} className="input" placeholder="e.g. Indian" />
          </div>
          <div className="form-group">
            <label>Attention To</label>
            <select name="attentionTo" value={formData.attentionTo} onChange={handleChange} className="input">
              <option value="All">All</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Couples">Couples</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="form-group">
            <label>Height</label>
            <input name="height" value={formData.height} onChange={handleChange} className="input" placeholder="e.g. 5'6" />
          </div>
          <div className="form-group">
            <label>Bust</label>
            <input name="bust" value={formData.bust} onChange={handleChange} className="input" placeholder="e.g. 34C" />
          </div>
        </div>

        <div className="form-group">
          <label>WhatsApp Number</label>
          <input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" placeholder="919999999999" className="input" />
          <p className="hint">Include country code (e.g. 91)</p>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} placeholder="Describe your services..." className="input textarea"></textarea>
        </div>

        <hr style={{ borderColor: 'var(--border)', margin: '2rem 0' }} />

        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Photos</h3>

        <div className="form-group">
          <label>Main Profile Photo (Thumbnail)</label>
          <div className="file-drop">
            <input
              type="file"
              accept="image/*"
              onChange={handleMainImageChange}
              required
              className="file-input"
            />
            <p>{mainImageFile ? `Selected: ${mainImageFile.name}` : 'Click to select Main Photo'}</p>
          </div>
        </div>

        <div className="form-group">
          <label>Gallery Photos</label>
          <div className="file-drop">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryChange}
              className="file-input"
            />
            <p>{galleryFiles.length > 0 ? `Selected: ${galleryFiles.length} photos` : 'Click to select Gallery Photos (Multiple)'}</p>
          </div>
        </div>

        <div className="actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (uploading ? 'Uploading Images...' : 'Submitting...') : 'Submit Listing'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .page-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          text-align: center;
          color: var(--text-muted);
          margin-bottom: 3rem;
        }
        .form {
          max-width: 700px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: var(--radius-lg);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        .input {
          width: 100%;
          padding: 0.875rem;
          background: rgba(0,0,0,0.3);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          color: white;
          font-family: inherit;
        }
        .input:focus {
          border-color: var(--primary);
          outline: none;
        }
        .input option {
            background-color: black;
            color: white;
        }
        .textarea { resize: vertical; }
        .hint {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }
        .file-drop {
          border: 2px dashed var(--border);
          padding: 2rem;
          text-align: center;
          border-radius: var(--radius-md);
          cursor: pointer;
          position: relative;
          background: rgba(255,255,255,0.05);
        }
        .file-drop:hover { border-color: var(--primary); }
        .file-input {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        .actions {
          margin-top: 2rem;
        }
        .actions .btn {
          width: 100%;
          font-size: 1.1rem;
        }
        @media(max-width: 600px) {
          .row { grid-template-columns: 1fr; }
          .form { padding: 1.5rem; }
        }
      `}</style>
    </div>
  );
}
