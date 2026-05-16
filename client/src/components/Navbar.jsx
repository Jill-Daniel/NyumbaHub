import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/listings', label: 'Browse Houses' },
  { to: '/landlords', label: 'Landlords' },
  { to: '/apply', label: 'Apply' },
  { to: '/pay', label: 'Pay Rent' },
  { to: '/my-applications', label: 'My Applications' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-icon">🏠</span>
          <span className="logo-text">
            Nyumba<span>Hub</span>
          </span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <Link to="/listings" className="btn btn-gold btn-sm hide-mobile">
            Find a Room
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
