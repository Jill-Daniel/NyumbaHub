import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import { db } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

function enrichListing(listing) {
  const landlord = db.getLandlord(listing.landlordId);
  return { ...listing, landlord };
}

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', name: 'NyumbaHub API', version: '1.0.0' });
});

app.get('/api/listings', (req, res) => {
  let listings = db.getListings().map(enrichListing);
  const { type, gender, minPrice, maxPrice, featured, search } = req.query;

  if (type) listings = listings.filter((l) => l.type === type);
  if (gender && gender !== 'any') {
    listings = listings.filter((l) => l.gender === gender || l.gender === 'any');
  }
  if (minPrice) listings = listings.filter((l) => l.price >= Number(minPrice));
  if (maxPrice) listings = listings.filter((l) => l.price <= Number(maxPrice));
  if (featured === 'true') listings = listings.filter((l) => l.featured);
  if (search) {
    const q = search.toLowerCase();
    listings = listings.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
    );
  }

  res.json(listings);
});

app.get('/api/listings/:id', (req, res) => {
  const listing = db.getListing(req.params.id);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  res.json(enrichListing(listing));
});

app.get('/api/landlords', (_, res) => {
  const landlords = db.getLandlords().map((ll) => ({
    ...ll,
    listings: db.getListings().filter((l) => l.landlordId === ll.id),
  }));
  res.json(landlords);
});

app.get('/api/landlords/:id', (req, res) => {
  const landlord = db.getLandlord(req.params.id);
  if (!landlord) return res.status(404).json({ error: 'Landlord not found' });
  const listings = db.getListings().filter((l) => l.landlordId === landlord.id);
  res.json({ ...landlord, listings: listings.map(enrichListing) });
});

app.post('/api/applications', (req, res) => {
  const {
    listingId,
    fullName,
    email,
    phone,
    regNumber,
    course,
    yearOfStudy,
    gender,
    parentName,
    parentPhone,
    moveInDate,
    message,
  } = req.body;

  if (!listingId || !fullName || !phone || !regNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const listing = db.getListing(listingId);
  if (!listing) return res.status(404).json({ error: 'Listing not found' });
  if (listing.available < 1) {
    return res.status(400).json({ error: 'No rooms available for this listing' });
  }

  const application = {
    id: `APP-${uuidv4().slice(0, 8).toUpperCase()}`,
    listingId,
    listingTitle: listing.title,
    landlordId: listing.landlordId,
    fullName,
    email: email || '',
    phone,
    regNumber,
    course: course || '',
    yearOfStudy: yearOfStudy || '1',
    gender: gender || '',
    parentName: parentName || '',
    parentPhone: parentPhone || '',
    moveInDate: moveInDate || '',
    message: message || '',
    status: 'pending',
    depositAmount: listing.deposit,
    monthlyRent: listing.price,
    createdAt: new Date().toISOString(),
  };

  const applications = db.getApplications();
  applications.push(application);
  db.saveApplications(applications);

  res.status(201).json({
    message: 'Application submitted successfully',
    application,
  });
});

app.get('/api/applications/:id', (req, res) => {
  const app_ = db.getApplications().find((a) => a.id === req.params.id);
  if (!app_) return res.status(404).json({ error: 'Application not found' });
  const listing = enrichListing(db.getListing(app_.listingId));
  res.json({ ...app_, listing });
});

app.patch('/api/applications/:id/approve', (req, res) => {
  const applications = db.getApplications();
  const idx = applications.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Application not found' });
  applications[idx].status = 'approved';
  applications[idx].approvedAt = new Date().toISOString();
  db.saveApplications(applications);
  res.json(applications[idx]);
});

app.post('/api/payments', (req, res) => {
  const { applicationId, phone, amount, paymentType } = req.body;

  if (!applicationId || !phone || !amount) {
    return res.status(400).json({ error: 'Missing required payment fields' });
  }

  const application = db.getApplications().find((a) => a.id === applicationId);
  if (!application) return res.status(404).json({ error: 'Application not found' });

  const payment = {
    id: `PAY-${uuidv4().slice(0, 8).toUpperCase()}`,
    applicationId,
    phone,
    amount: Number(amount),
    paymentType: paymentType || 'deposit',
    status: 'completed',
    method: 'M-Pesa',
    receiptNumber: `NH${Date.now().toString().slice(-8)}`,
    createdAt: new Date().toISOString(),
  };

  const payments = db.getPayments();
  payments.push(payment);
  db.savePayments(payments);

  if (payment.paymentType === 'deposit') {
    const applications = db.getApplications();
    const idx = applications.findIndex((a) => a.id === applicationId);
    if (idx !== -1) {
      applications[idx].status = 'deposit_paid';
      applications[idx].depositPaidAt = new Date().toISOString();
      db.saveApplications(applications);
    }
  }

  res.status(201).json({
    message: 'Payment processed successfully',
    payment,
    mpesaMessage: `M-Pesa STK push sent to ${phone}. (Demo mode: payment auto-confirmed)`,
  });
});

app.get('/api/payments/:applicationId', (req, res) => {
  const payments = db.getPayments().filter((p) => p.applicationId === req.params.applicationId);
  res.json(payments);
});

app.get('/api/testimonials', (_, res) => {
  res.json(db.getTestimonials());
});

app.get('/api/faqs', (_, res) => {
  res.json(db.getFaqs());
});

app.get('/api/stats', (_, res) => {
  const listings = db.getListings();
  const landlords = db.getLandlords();
  const applications = db.getApplications();
  res.json({
    totalListings: listings.length,
    availableRooms: listings.reduce((sum, l) => sum + l.available, 0),
    verifiedLandlords: landlords.filter((l) => l.verified).length,
    studentsHelped: applications.length + 127,
    avgPrice: Math.round(listings.reduce((s, l) => s + l.price, 0) / listings.length),
  });
});

export default app;
