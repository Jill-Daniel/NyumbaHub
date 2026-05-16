import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import PropertyCard from '../components/PropertyCard';
import './Home.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getListings({ featured: 'true' }).then(setFeatured).catch(console.error);
    api.getTestimonials().then(setTestimonials).catch(console.error);
    api.getStats().then(setStats).catch(console.error);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <span className="hero-badge">Meru University · Nchiru Housing</span>
          <h1>
            Find Your <span>Perfect Room</span> Near Campus
          </h1>
          <p>
            NyumbaHub connects freshers with verified landlords in Nchiru. Browse houses,
            apply online, pay via M-Pesa, and chat on WhatsApp — all in one place.
          </p>
          <div className="hero-actions">
            <Link to="/listings" className="btn btn-gold btn-lg">
              Browse Available Houses
            </Link>
            <Link to="/apply" className="btn btn-outline btn-lg hero-outline">
              Apply for a Room
            </Link>
          </div>
          {stats && (
            <div className="hero-stats">
              <div>
                <strong>{stats.totalListings}+</strong>
                <span>Listings</span>
              </div>
              <div>
                <strong>{stats.availableRooms}+</strong>
                <span>Rooms Available</span>
              </div>
              <div>
                <strong>{stats.verifiedLandlords}</strong>
                <span>Verified Landlords</span>
              </div>
              <div>
                <strong>{stats.studentsHelped}+</strong>
                <span>Students Helped</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How NyumbaHub Works</h2>
            <p>Four simple steps from browsing to moving in</p>
          </div>
          <div className="steps-grid">
            {[
              {
                step: '01',
                title: 'Browse Houses',
                text: 'Explore verified listings near Meru University with photos and prices.',
                img: 'https://images.unsplash.com/photo-1560448204-e02f07c08d3b?w=400&h=280&fit=crop',
              },
              {
                step: '02',
                title: 'Apply Online',
                text: 'Submit your application with student details in under 3 minutes.',
                img: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=280&fit=crop',
              },
              {
                step: '03',
                title: 'Pay Securely',
                text: 'Pay deposit and rent through M-Pesa directly on the portal.',
                img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=280&fit=crop',
              },
              {
                step: '04',
                title: 'Connect via WhatsApp',
                text: 'Chat with your landlord instantly to arrange viewing and move-in.',
                img: 'https://images.unsplash.com/photo-1611746872915-64342b5a446a?w=400&h=280&fit=crop',
              },
            ].map((item) => (
              <div key={item.step} className="step-card">
                <img src={item.img} alt={item.title} />
                <span className="step-num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Houses</h2>
            <p>Green House, Blue House, Pink House Kianjai, and other comrade favourites</p>
          </div>
          <div className="grid-3">
            {featured.slice(0, 6).map((l) => (
              <PropertyCard key={l.id} listing={l} />
            ))}
          </div>
          <div className="section-cta">
            <Link to="/listings" className="btn btn-primary btn-lg">
              View All Listings
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <img
          src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&h=400&fit=crop"
          alt="Student houses near Meru University"
          className="cta-banner-img"
        />
        <div className="container cta-banner-content">
          <h2>Ready to Secure Your Room?</h2>
          <p>Don't wait until campus is full. Apply today and connect with landlords instantly.</p>
          <Link to="/apply" className="btn btn-gold btn-lg">
            Start Your Application
          </Link>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Students Say</h2>
            <p>Real experiences from Meru University students</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="testimonial-card">
                <div className="testimonial-stars">{'★'.repeat(t.rating)}</div>
                <p>"{t.text}"</p>
                <footer>
                  <img src={t.avatar} alt={t.name} />
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.course}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
