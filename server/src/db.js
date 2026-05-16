import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');

const IS_SERVERLESS = Boolean(process.env.VERCEL);

/** On Vercel, file writes are not persistent — keep mutable data in memory. */
const memory = {
  applications: null,
  payments: null,
};

function readJSON(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJSON(filename, data) {
  if (IS_SERVERLESS) {
    if (filename === 'applications.json') memory.applications = data;
    if (filename === 'payments.json') memory.payments = data;
    return;
  }
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getMutable(filename) {
  if (IS_SERVERLESS) {
    if (filename === 'applications.json') {
      if (memory.applications === null) memory.applications = readJSON(filename);
      return memory.applications;
    }
    if (filename === 'payments.json') {
      if (memory.payments === null) memory.payments = readJSON(filename);
      return memory.payments;
    }
  }
  return readJSON(filename);
}

export const db = {
  getLandlords: () => readJSON('landlords.json'),
  getLandlord: (id) => readJSON('landlords.json').find((l) => l.id === id),
  getListings: () => readJSON('listings.json'),
  getListing: (id) => readJSON('listings.json').find((l) => l.id === id),
  getApplications: () => getMutable('applications.json'),
  saveApplications: (data) => writeJSON('applications.json', data),
  getPayments: () => getMutable('payments.json'),
  savePayments: (data) => writeJSON('payments.json', data),
  getTestimonials: () => readJSON('testimonials.json'),
  getFaqs: () => readJSON('faqs.json'),
};
