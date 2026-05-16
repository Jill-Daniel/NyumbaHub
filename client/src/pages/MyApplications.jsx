import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, formatKES, whatsappLink } from '../api';
import { getApplicationRefs } from '../utils/storage';
import './MyApplications.css';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [manualRef, setManualRef] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSaved();
  }, []);

  async function loadSaved() {
    setLoading(true);
    const refs = getApplicationRefs();
    const results = [];
    for (const id of refs) {
      try {
        const app = await api.getApplication(id);
        results.push(app);
      } catch {
        /* skip invalid */
      }
    }
    setApplications(results);
    setLoading(false);
  }

  async function lookupManual(e) {
    e.preventDefault();
    setError('');
    try {
      const app = await api.getApplication(manualRef.trim());
      setApplications((prev) => {
        if (prev.find((a) => a.id === app.id)) return prev;
        return [app, ...prev];
      });
      setManualRef('');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>My Applications</h1>
          <p>Track your housing applications and payment status.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="track-form card">
            <img
              src="https://images.unsplash.com/photo-1434030214721-735b9fbf4b9d?w=600&h=200&fit=crop"
              alt="Track application"
            />
            <form onSubmit={lookupManual} className="track-row">
              <input
                value={manualRef}
                onChange={(e) => setManualRef(e.target.value)}
                placeholder="Enter application reference (e.g. APP-ABC12345)"
                required
              />
              <button type="submit" className="btn btn-primary">
                Track
              </button>
            </form>
            {error && <div className="alert alert-error">{error}</div>}
          </div>

          {loading ? (
            <p className="loading">Loading your applications...</p>
          ) : applications.length === 0 ? (
            <div className="empty-state card">
              <p>No applications yet. Apply for a house to get started.</p>
              <Link to="/apply" className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          ) : (
            <div className="applications-list">
              {applications.map((app) => {
                const ll = app.listing?.landlord;
                const waMessage = `Hi, my NyumbaHub application ${app.id} for ${app.listingTitle}. I'd like an update.`;
                return (
                  <article key={app.id} className="card application-card">
                    {app.listing?.images?.[0] && (
                      <img src={app.listing.images[0]} alt={app.listingTitle} />
                    )}
                    <div className="application-body">
                      <div className="app-header">
                        <h3>{app.listingTitle}</h3>
                        <span className={`status-badge status-${app.status}`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="app-ref">Ref: {app.id}</p>
                      <p>Applied: {new Date(app.createdAt).toLocaleDateString('en-KE')}</p>
                      <p>Rent: {formatKES(app.monthlyRent)} · Deposit: {formatKES(app.depositAmount)}</p>
                      <div className="app-actions">
                        <Link to={`/pay?ref=${app.id}`} className="btn btn-primary btn-sm">
                          Pay Now
                        </Link>
                        {ll?.whatsapp && (
                          <a
                            href={whatsappLink(ll.whatsapp, waMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp btn-sm"
                          >
                            WhatsApp Landlord
                          </a>
                        )}
                        <Link to={`/listings/${app.listingId}`} className="btn btn-outline btn-sm">
                          View Property
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
