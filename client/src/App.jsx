import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LocationBar from "./components/LocationBar";
import CategoryStrip from "./components/CategoryStrip";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ServiceDetail from "./pages/ServiceDetail";
import PaintingBooking from "./pages/PaintingBooking";
import SalonBooking from "./pages/SalonBooking";
import PromoOrder from "./pages/PromoOrder";
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatWidget from "./components/ChatWidget";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <ScrollToTop />
      <Navbar />
      <LocationBar />
      <CategoryStrip />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services/painting" element={<PaintingBooking />} />
          <Route path="/services/salon-for-women" element={<SalonBooking />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/order/:slug" element={<PromoOrder />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
