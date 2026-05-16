import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About NyumbaHub</h1>
          <p>The official housing platform built for Meru University freshers.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-content">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=700&h=450&fit=crop"
              alt="Meru University students"
              className="about-main-img"
            />
            <h2>Our Mission</h2>
            <p>
              NyumbaHub was created to solve a real problem faced by every fresher at Meru
              University — finding safe, affordable housing near Nchiru without scams, middlemen,
              or endless WhatsApp group searches.
            </p>
            <p>
              We connect students directly with verified landlords. Browse real photos, compare
              prices, apply online, pay via M-Pesa, and chat on WhatsApp — all from one
              professional platform.
            </p>
            <h2>Why Meru University Students Choose Us</h2>
            <ul className="about-list">
              <li>Verified landlords with WhatsApp direct contact</li>
              <li>Transparent pricing — no hidden fees</li>
              <li>Online applications with instant reference numbers</li>
              <li>M-Pesa deposit and rent payments</li>
              <li>Listings near campus: Nchiru, MIT, main gate area</li>
            </ul>
            <Link to="/listings" className="btn btn-primary btn-lg">
              Browse Houses
            </Link>
          </div>

          <aside className="about-sidebar">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3e?w=400&h=500&fit=crop"
              alt="Campus life"
            />
            <div className="about-stat-card">
              <h3>Meru University</h3>
              <p>Nchiru, Meru County, Kenya</p>
              <p>Home to thousands of students seeking quality off-campus housing every year.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section about-team">
        <div className="container">
          <div className="section-header">
            <h2>Built for Students, by Students</h2>
            <p>Understanding the fresher experience at Meru University</p>
          </div>
          <div className="values-grid">
            {[
              {
                title: 'Trust',
                text: 'Every landlord is verified before listing on NyumbaHub.',
                img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop',
              },
              {
                title: 'Simplicity',
                text: 'Apply in minutes, not days. No complicated paperwork.',
                img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=200&fit=crop',
              },
              {
                title: 'Connection',
                text: 'WhatsApp links put you in direct contact with landlords.',
                img: 'https://images.unsplash.com/photo-1611746872915-64342b5a446a?w=300&h=200&fit=crop',
              },
            ].map((v) => (
              <div key={v.title} className="value-card">
                <img src={v.img} alt={v.title} />
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
