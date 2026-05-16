import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're here to help Meru University students find their perfect home.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <img
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=600&h=350&fit=crop"
              alt="Contact NyumbaHub"
            />
            <h2>Get in Touch</h2>
            <div className="contact-detail">
              <strong>Email</strong>
              <a href="mailto:hello@nyumbahub.co.ke">hello@nyumbahub.co.ke</a>
            </div>
            <div className="contact-detail">
              <strong>WhatsApp Support</strong>
              <a
                href="https://wa.me/254700000000?text=Hello%20NyumbaHub%2C%20I%20need%20help%20with%20housing."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div className="contact-detail">
              <strong>Location</strong>
              <p>Nchiru, Near Meru University Main Gate<br />Meru County, Kenya</p>
            </div>
            <div className="contact-detail">
              <strong>Hours</strong>
              <p>Mon – Sat: 8:00 AM – 6:00 PM<br />Sunday: 10:00 AM – 2:00 PM</p>
            </div>
          </div>

          <form className="contact-form card" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            {sent ? (
              <div className="alert alert-success">
                Thank you! Your message has been received. We'll respond within 24 hours.
              </div>
            ) : (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input name="name" required placeholder="Your name" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" required placeholder="0712345678" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select name="subject" required>
                    <option value="">Select topic</option>
                    <option value="application">Application Help</option>
                    <option value="payment">Payment Issue</option>
                    <option value="landlord">Landlord Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea name="message" rows={5} required placeholder="How can we help?" />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
