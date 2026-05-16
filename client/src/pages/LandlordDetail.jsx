import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, whatsappLink } from '../api';
import PropertyCard from '../components/PropertyCard';
import './LandlordDetail.css';

export default function LandlordDetail() {
  const { id } = useParams();
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLandlord(id).then(setLandlord).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Loading profile...</p>;
  if (!landlord) {
    return (
      <div className="container section">
        <p className="alert alert-error">Landlord not found</p>
        <Link to="/landlords" className="btn btn-primary">Back</Link>
      </div>
    );
  }

  const waMessage = `Hello ${landlord.name}, I'm a Meru University student. I found you on NyumbaHub and would like to inquire about housing.`;

  return (
    <>
      <section className="page-hero landlord-detail-hero">
        <div className="container landlord-profile-header">
          <img src={landlord.photo} alt={landlord.name} className="profile-photo" />
          <div>
            <h1>{landlord.name}</h1>
            <p className="company">{landlord.company}</p>
            {landlord.verified && <span className="verified-pill">✓ Verified Landlord</span>}
            <p className="bio">{landlord.bio}</p>
            <div className="profile-meta">
              <span>⭐ {landlord.rating} rating</span>
              <span>📞 {landlord.phone}</span>
              <span>✉️ {landlord.email}</span>
            </div>
            <a
              href={whatsappLink(landlord.whatsapp, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-lg"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Properties by {landlord.name}</h2>
          <div className="grid-3">
            {(landlord.listings || []).map((l) => (
              <PropertyCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
