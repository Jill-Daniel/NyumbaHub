const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  getStats: () => request('/stats'),
  getListings: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return request(`/listings${q ? `?${q}` : ''}`);
  },
  getListing: (id) => request(`/listings/${id}`),
  getLandlords: () => request('/landlords'),
  getLandlord: (id) => request(`/landlords/${id}`),
  submitApplication: (body) =>
    request('/applications', { method: 'POST', body: JSON.stringify(body) }),
  getApplication: (id) => request(`/applications/${id}`),
  approveApplication: (id) =>
    request(`/applications/${id}/approve`, { method: 'PATCH' }),
  submitPayment: (body) =>
    request('/payments', { method: 'POST', body: JSON.stringify(body) }),
  getPayments: (applicationId) => request(`/payments/${applicationId}`),
  getTestimonials: () => request('/testimonials'),
  getFaqs: () => request('/faqs'),
};

export function whatsappLink(number, message) {
  const text = encodeURIComponent(message || 'Hello, I found you on NyumbaHub and I am interested in your property.');
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${text}`;
}

export function formatKES(amount) {
  return `KES ${Number(amount).toLocaleString('en-KE')}`;
}
