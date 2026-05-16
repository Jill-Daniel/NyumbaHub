import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <span className="logo-icon">🏠</span>
              <span className="logo-text">
                Nyumba<span>Hub</span>
              </span>
            </Link>
            <p>
              Your trusted housing platform for Meru University freshers. Find verified
              rooms in Nchiru, apply online, and pay securely.
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/listings">Browse Houses</Link></li>
              <li><Link to="/landlords">Landlords</Link></li>
              <li><Link to="/apply">Apply Now</Link></li>
              <li><Link to="/pay">Pay Rent</Link></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/about">About NyumbaHub</Link></li>
              <li><Link to="/my-applications">Track Application</Link></li>
            </ul>
          </div>

          <div>
            <h4>Meru University</h4>
            <p className="footer-address">
              Nchiru, Meru County<br />
              Kenya
            </p>
            <a href="mailto:hello@nyumbahub.co.ke" className="footer-email">
              hello@nyumbahub.co.ke
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} NyumbaHub. Built for Meru University students.</p>
        </div>
      </div>
    </footer>
  );
}
