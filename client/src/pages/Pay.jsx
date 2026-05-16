import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, formatKES } from '../api';
import './Pay.css';

export default function Pay() {
  const [searchParams] = useSearchParams();
  const refFromUrl = searchParams.get('ref') || '';

  const [applicationId, setApplicationId] = useState(refFromUrl);
  const [application, setApplication] = useState(null);
  const [phone, setPhone] = useState('');
  const [paymentType, setPaymentType] = useState('deposit');
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (refFromUrl) lookupApplication(refFromUrl);
  }, [refFromUrl]);

  async function lookupApplication(id) {
    if (!id) return;
    setLookupLoading(true);
    setError('');
    setApplication(null);
    try {
      const app = await api.getApplication(id);
      setApplication(app);
      setPhone(app.phone || '');
    } catch (err) {
      setError(err.message);
    } finally {
      setLookupLoading(false);
    }
  }

  async function handlePay(e) {
    e.preventDefault();
    if (!application) return;
    setLoading(true);
    setError('');
    const amount =
      paymentType === 'deposit' ? application.depositAmount : application.monthlyRent;

    try {
      const res = await api.submitPayment({
        applicationId: application.id,
        phone,
        amount,
        paymentType,
      });
      setPayment(res.payment);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove() {
    if (!application) return;
    setLookupLoading(true);
    try {
      const updated = await api.approveApplication(application.id);
      setApplication((prev) => ({ ...prev, ...updated }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLookupLoading(false);
    }
  }

  if (payment) {
    return (
      <section className="section pay-success">
        <div className="container pay-receipt card">
          <img
            src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=500&h=200&fit=crop"
            alt="Payment successful"
          />
          <h1>Payment Successful</h1>
          <div className="receipt-details">
            <p><span>Receipt No:</span> <strong>{payment.receiptNumber}</strong></p>
            <p><span>Amount:</span> <strong>{formatKES(payment.amount)}</strong></p>
            <p><span>Method:</span> <strong>{payment.method}</strong></p>
            <p><span>Phone:</span> <strong>{payment.phone}</strong></p>
            <p><span>Status:</span> <strong className="status-paid">{payment.status}</strong></p>
          </div>
          <p className="mpesa-note">A confirmation SMS has been sent to your M-Pesa number.</p>
          <Link to="/my-applications" className="btn btn-primary">
            View My Applications
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero pay-hero">
        <div className="container">
          <h1>Pay Rent & Deposit</h1>
          <p>Secure M-Pesa payments for your NyumbaHub housing application.</p>
        </div>
      </section>

      <section className="section">
        <div className="container pay-layout">
          <div className="pay-info card">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop"
              alt="M-Pesa payment"
            />
            <h3>M-Pesa Payment</h3>
            <ul>
              <li>Enter your application reference number</li>
              <li>Confirm the amount (deposit or monthly rent)</li>
              <li>Receive STK push on your phone</li>
              <li>Enter M-Pesa PIN to complete</li>
            </ul>
            <p className="demo-note">
              Demo mode: payments are simulated for testing. Connect Safaricom Daraja API for production.
            </p>
          </div>

          <div className="pay-form-wrap card">
            <h2>Make a Payment</h2>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="lookup-row">
              <input
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                placeholder="Application ref e.g. APP-ABC12345"
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => lookupApplication(applicationId)}
                disabled={lookupLoading}
              >
                {lookupLoading ? 'Loading...' : 'Lookup'}
              </button>
            </div>

            {application && (
              <div className="application-summary">
                <h3>{application.listingTitle}</h3>
                <p>Applicant: {application.fullName}</p>
                <p>Status: <span className={`status-${application.status}`}>{application.status}</span></p>
                <p>Deposit: {formatKES(application.depositAmount)}</p>
                <p>Monthly Rent: {formatKES(application.monthlyRent)}</p>

                {application.status === 'pending' && (
                  <div className="alert alert-info">
                    <p>Demo: Click to simulate landlord approval before paying deposit.</p>
                    <button type="button" className="btn btn-sm btn-primary" onClick={handleApprove}>
                      Simulate Approval
                    </button>
                  </div>
                )}

                <form onSubmit={handlePay} className="pay-form">
                  <div className="form-group">
                    <label>Payment Type</label>
                    <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
                      <option value="deposit">Deposit</option>
                      <option value="rent">Monthly Rent</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>M-Pesa Phone Number</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="0712345678"
                    />
                  </div>

                  <div className="amount-display">
                    Amount:{' '}
                    <strong>
                      {formatKES(
                        paymentType === 'deposit'
                          ? application.depositAmount
                          : application.monthlyRent
                      )}
                    </strong>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading || application.status === 'pending'}
                  >
                    {loading ? 'Processing...' : 'Pay with M-Pesa'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
