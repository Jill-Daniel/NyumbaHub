import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import PropertyCard from '../components/PropertyCard';
import './Listings.css';

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = {
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    gender: searchParams.get('gender') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  };

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.type) params.type = filters.type;
    if (filters.gender) params.gender = filters.gender;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    api
      .getListings(params)
      .then(setListings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchParams]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const next = new URLSearchParams();
    ['search', 'type', 'gender', 'minPrice', 'maxPrice'].forEach((k) => {
      const v = fd.get(k);
      if (v) next.set(k, v);
    });
    setSearchParams(next);
  }

  return (
  <>
    <section className="page-hero listings-hero">
      <div className="container">
        <h1>Browse Student Houses</h1>
        <p>
          {listings.length} verified listings — Green House, Blue House, White House, Kianjai, and more.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container listings-layout">
        <aside className="filters-panel">
          <img
            src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&h=200&fit=crop"
            alt="Student housing"
            className="filters-img"
          />
          <h3>Filter Listings</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Search</label>
              <input name="search" defaultValue={filters.search} placeholder="Location, title..." />
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <select name="type" defaultValue={filters.type}>
                <option value="">All types</option>
                <option value="single">Single Room</option>
                <option value="shared">Shared</option>
                <option value="hostel">Hostel</option>
                <option value="bedsitter">Bedsitter</option>
                <option value="flat">Flat</option>
                <option value="studio">Studio</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select name="gender" defaultValue={filters.gender}>
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min (KES)</label>
                <input name="minPrice" type="number" defaultValue={filters.minPrice} placeholder="3000" />
              </div>
              <div className="form-group">
                <label>Max (KES)</label>
                <input name="maxPrice" type="number" defaultValue={filters.maxPrice} placeholder="15000" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Apply Filters
            </button>
          </form>
        </aside>

        <div className="listings-results">
          {loading ? (
            <p className="loading">Loading houses...</p>
          ) : listings.length === 0 ? (
            <div className="empty-state">
              <p>No listings match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            <div className="grid-3">
              {listings.map((l) => (
                <PropertyCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  </>
  );
}
