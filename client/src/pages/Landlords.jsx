import { useEffect, useState } from 'react';
import { api } from '../api';
import LandlordCard from '../components/LandlordCard';
import './Landlords.css';

export default function Landlords() {
  const [landlords, setLandlords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLandlords().then(setLandlords).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Verified Landlords</h1>
          <p>Connect directly with trusted landlords near Meru University via WhatsApp.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="landlords-banner">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=300&fit=crop"
              alt="Landlords meeting students"
            />
            <div className="landlords-banner-text">
              <h2>Direct Landlord Connection</h2>
              <p>Every landlord on NyumbaHub has a WhatsApp link for instant communication.</p>
            </div>
          </div>

          {loading ? (
            <p className="loading">Loading landlords...</p>
          ) : (
            <div className="grid-3">
              {landlords.map((ll) => (
                <LandlordCard key={ll.id} landlord={ll} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
