import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { saveApplicationRef } from '../utils/storage';
import './Apply.css';

export default function Apply() {
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('listing') || '';

  const [listings, setListings] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getListings().then(setListings).catch(console.error);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const fd = new FormData(e.target);

    try {
      const res = await api.submitApplication({
        listingId: fd.get('listingId'),
        fullName: fd.get('fullName'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        regNumber: fd.get('regNumber'),
        course: fd.get('course'),
        yearOfStudy: fd.get('yearOfStudy'),
        gender: fd.get('gender'),
        parentName: fd.get('parentName'),
        parentPhone: fd.get('parentPhone'),
        moveInDate: fd.get('moveInDate'),
        message: fd.get('message'),
      });
      saveApplicationRef(res.application.id);
      setResult(res.application);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <section className="section apply-success">
        <div className="container apply-success-card">
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=600&h=300&fit=crop"
            alt="Application submitted"
          />
          <h1>Application Submitted!</h1>
          <p>Your reference number is:</p>
          <code className="ref-number">{result.id}</code>
          <p className="success-note">
            Save this number to track your application and pay your deposit once approved.
          </p>
          <div className="success-actions">
            <Link to={`/pay?ref=${result.id}`} className="btn btn-primary">
              Go to Payment
            </Link>
            <Link to="/my-applications" className="btn btn-outline">
              Track Application
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero apply-hero">
        <div className="container">
          <h1>Apply for Housing</h1>
          <p>Complete the form below — takes less than 3 minutes for Meru University freshers.</p>
        </div>
      </section>

      <section className="section">
        <div className="container apply-layout">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=700&fit=crop"
            alt="Meru University students"
            className="apply-side-img"
          />

          <form className="apply-form card" onSubmit={handleSubmit}>
            <h2>Student Application Form</h2>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="form-group">
              <label>Select Property *</label>
              <select name="listingId" required defaultValue={preselected}>
                <option value="">Choose a house...</option>
                {listings.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title} — KES {l.price.toLocaleString()}/mo
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input name="fullName" required placeholder="John Kamau" />
              </div>
              <div className="form-group">
                <label>Registration Number *</label>
                <input name="regNumber" required placeholder="MU/2025/12345" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone (M-Pesa) *</label>
                <input name="phone" required placeholder="0712345678" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" placeholder="student@students.mku.ac.ke" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Course / Programme</label>
                <input name="course" placeholder="BSc Computer Science" />
              </div>
              <div className="form-group">
                <label>Year of Study</label>
                <select name="yearOfStudy" defaultValue="1">
                  <option value="1">Year 1 (Fresher)</option>
                  <option value="2">Year 2</option>
                  <option value="3">Year 3</option>
                  <option value="4">Year 4+</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender</label>
                <select name="gender">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Preferred Move-in Date</label>
                <input name="moveInDate" type="date" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Parent / Guardian Name</label>
                <input name="parentName" placeholder="Jane Kamau" />
              </div>
              <div className="form-group">
                <label>Parent / Guardian Phone</label>
                <input name="parentPhone" placeholder="0722345678" />
              </div>
            </div>

            <div className="form-group">
              <label>Message to Landlord</label>
              <textarea name="message" rows={3} placeholder="Any special requests or questions..." />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
