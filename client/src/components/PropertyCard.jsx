import { Link } from 'react-router-dom';
import { formatKES, whatsappLink } from '../api';
import './PropertyCard.css';

export default function PropertyCard({ listing }) {
  const landlord = listing.landlord;
  const waMessage = `Hi ${landlord?.name}, I'm interested in "${listing.title}" on NyumbaHub (Ref: ${listing.id}).`;

  return (
    <article className="card property-card">
      <Link to={`/listings/${listing.id}`} className="property-image-wrap">
        <img src={listing.images[0]} alt={listing.title} loading="lazy" />
        {listing.featured && <span className="badge badge-featured">Featured</span>}
        <span className="property-price">{formatKES(listing.price)}/mo</span>
      </Link>

      <div className="property-body">
        <div className="property-meta">
          <span className="badge badge-type">{listing.type}</span>
          <span className="badge badge-available">{listing.available} rooms left</span>
        </div>

        <Link to={`/listings/${listing.id}`}>
          <h3>{listing.title}</h3>
        </Link>

        <p className="property-location">📍 {listing.location}</p>
        <p className="property-distance">{listing.distanceToCampus}</p>

        {landlord && (
          <div className="property-landlord">
            <img src={landlord.photo} alt={landlord.name} />
            <span>{landlord.name}</span>
            {landlord.verified && <span className="verified">✓ Verified</span>}
          </div>
        )}

        <div className="property-actions">
          <Link to={`/listings/${listing.id}`} className="btn btn-primary btn-sm">
            View Details
          </Link>
          {landlord?.whatsapp && (
            <a
              href={whatsappLink(landlord.whatsapp, waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
