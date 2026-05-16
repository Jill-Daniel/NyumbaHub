import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Landlords from './pages/Landlords';
import LandlordDetail from './pages/LandlordDetail';
import Apply from './pages/Apply';
import Pay from './pages/Pay';
import MyApplications from './pages/MyApplications';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="listings" element={<Listings />} />
        <Route path="listings/:id" element={<ListingDetail />} />
        <Route path="landlords" element={<Landlords />} />
        <Route path="landlords/:id" element={<LandlordDetail />} />
        <Route path="apply" element={<Apply />} />
        <Route path="pay" element={<Pay />} />
        <Route path="my-applications" element={<MyApplications />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
