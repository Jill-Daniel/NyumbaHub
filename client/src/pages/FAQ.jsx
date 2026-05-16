import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import './FAQ.css';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    api.getFaqs().then(setFaqs).catch(console.error);
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Everything Meru University freshers need to know about NyumbaHub.</p>
        </div>
      </section>

      <section className="section">
        <div className="container faq-layout">
          <img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&h=600&fit=crop"
            alt="Students asking questions"
            className="faq-side-img"
          />

          <div className="faq-list">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item card ${openId === faq.id ? 'open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                >
                  {faq.question}
                  <span className="faq-toggle">{openId === faq.id ? '−' : '+'}</span>
                </button>
                {openId === faq.id && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-cta">
        <div className="container card faq-cta-card">
          <h2>Still have questions?</h2>
          <p>Contact our support team or browse available houses.</p>
          <div>
            <Link to="/contact" className="btn btn-primary">
              Contact Us
            </Link>
            <Link to="/listings" className="btn btn-outline">
              Browse Houses
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
