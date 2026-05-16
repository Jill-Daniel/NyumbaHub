import { Link } from 'react-router-dom';
import { whatsappLink } from '../api';
import './LandlordCard.css';

export default function LandlordCard({ landlord }) {
  const waMessage = `Hello ${landlord.name}, I'm a Meru University student looking for housing via NyumbaHub.`;

  return (
    <article className="card landlord-card">
      <img src={landlord.photo} alt={landlord.name} className="landlord-photo" />
      <div className="landlord-body">
        <div className="landlord-header">
          <h3>{landlord.name}</h3>
          {landlord.verified && <span className="verified-badge">✓ Verified</span>}
        </div>
        <p className="landlord-company">{landlord.company}</p>
        <p className="landlord-bio">{landlord.bio}</p>
        <div className="landlord-stats">
          <span>⭐ {landlord.rating}</span>
          <span>{landlord.listings?.length || landlord.totalListings} listings</span>
        </div>
        <div className="landlord-actions">
          <Link to={`/landlords/${landlord.id}`} className="btn btn-primary btn-sm">
            View Profile
          </Link>
          <a
            href={whatsappLink(landlord.whatsapp, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-sm"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
