// export default function Footer() {
//   return (
//     <footer className="border-t border-line bg-cream">
//       <div className="mx-auto max-w-6xl px-5 py-10">
//         <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          // <div className="flex items-center gap-2">
          //   <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-cream font-display text-base">
          //     U
          //   </span>
          //   <span className="font-display text-lg text-navy">
          //     Urban<span className="text-brass-dark">Care</span>
          //   </span>
          // </div>
//           <p className="max-w-sm text-sm text-ink-soft">
            // Six services, done properly. Cleaning · Salon · AC Repair ·
            // Plumbing · Electrician · Painting.
//           </p>
//         </div>
//         <div className="perforation mt-8 pt-6 text-xs text-ink-soft">
//           © {new Date().getFullYear()} UrbanCare. A demo project, not an actual booking service.
//         </div>
//       </div>
//     </footer>
//   );
// }










import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand-col">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black font-display text-base">
              U
            </span>
            <span className="font-display text-lg text-white">
              Urban<span className="text-brass-light">Care</span>
            </span>
          </div>
          <p className="muted">
            Several services, done properly. Cleaning · Salon · AC Repair ·
            Plumbing · Electrician · Painting.
          </p>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <Link to="/">All products</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My orders</Link>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About us</Link>
          {/* <a href="mailto:support@kartly.example">Contact support</a> */}
          <Link to="/support">Contact Support</Link>
          {/* <a href="#">Careers</a> */}
          <Link to="/careers">Careers</Link>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          {/* <a href="#">Shipping info</a> */}
          <Link to="/orders">Shipping info</Link>
          <a href="#returns" aria-label="Returns & refunds">Returns &amp; refunds</a>
          {/* <a href="#faqs" aria-label="FAQs">FAQs</a> */}
          <Link to="/support">FAQs</Link>
           <Link to="/rider">Delivery partner login</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Kartly. All rights reserved.</span>
        <div className="footer-socials">
          <a href="https://www.linkedin.com/in/raeesali-qureshi-192300256" aria-label="Twitter" target='_blank' rel="noopener noreferrer">LinkedIn</a>
          <a href="https://x.com/IraqiRaeesAli92" aria-label="Twitter" target='_blank' rel="noopener noreferrer">Twitter</a>
          <a href="https://www.instagram.com/raeesali_30_01" aria-label="Instagram" target='_blank' rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61569239480554" aria-label="Facebook" target='_blank' rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
}