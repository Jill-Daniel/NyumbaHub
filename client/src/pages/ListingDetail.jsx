import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api, formatKES, whatsappLink } from '../api';
import './ListingDetail.css';

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getListing(id)
      .then((data) => {
        setListing(data);
        setActiveImage(0);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading">Loading property...</p>;
  if (error || !listing) {
    return (
      <div className="container section">
        <div className="alert alert-error">{error || 'Listing not found'}</div>
        <Link to="/listings" className="btn btn-primary">Back to Listings</Link>
      </div>
    );
  }

  const ll = listing.landlord;
  const waMessage = `Hi ${ll?.name}, I'm interested in "${listing.title}" (${listing.id}) on NyumbaHub. Can we arrange a viewing?`;

  return (
    <>
      <section className="page-hero detail-hero">
        <div className="container">
          <Link to="/listings" className="back-link">← Back to listings</Link>
          <h1>{listing.title}</h1>
          <p>{listing.location}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout">
          <div className="detail-gallery">
            <img
              src={listing.images[activeImage]}
              alt={listing.title}
              className="detail-main-img"
            />
            <div className="detail-thumbs">
              {listing.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={i === activeImage ? 'active' : ''}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <aside className="detail-sidebar">
            <div className="price-box">
              <span className="price-label">Monthly Rent</span>
              <strong>{formatKES(listing.price)}</strong>
              <span className="deposit-text">Deposit: {formatKES(listing.deposit)}</span>
            </div>

            <ul className="detail-facts">
              <li><span>Type</span><strong>{listing.type}</strong></li>
              <li><span>Gender</span><strong>{listing.gender}</strong></li>
              <li><span>Distance</span><strong>{listing.distanceToCampus}</strong></li>
              <li><span>Available</span><strong>{listing.available} rooms</strong></li>
            </ul>

            <div className="amenities">
              <h4>Amenities</h4>
              <div className="amenity-tags">
                {listing.amenities.map((a) => (
                  <span key={a}>{a}</span>
                ))}
              </div>
            </div>

            {ll && (
              <div className="landlord-box">
                <img src={ll.photo} alt={ll.name} />
                <div>
                  <strong>{ll.name}</strong>
                  <span>{ll.company}</span>
                  <span className="rating">⭐ {ll.rating}</span>
                </div>
              </div>
            )}

            <div className="detail-actions">
              <Link to={`/apply?listing=${listing.id}`} className="btn btn-primary btn-lg">
                Apply Now
              </Link>
              {ll?.whatsapp && (
                <a
                  href={whatsappLink(ll.whatsapp, waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  Chat on WhatsApp
                </a>
              )}
              <Link to={`/landlords/${ll?.id}`} className="btn btn-outline">
                View Landlord Profile
              </Link>
            </div>
          </aside>
        </div>

        <div className="container detail-description">
          <h2>About This Property</h2>
          <p>{listing.description}</p>
        </div>
      </section>
    </>
  );
}
