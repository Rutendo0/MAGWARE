import { Link } from "wouter";
import { Building2, Phone, Clock, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const quickLinks = [
  { label: "Power Tools", href: "/products?category=Power Tools" },
  { label: "Building Materials", href: "/products?category=Building Materials" },
  { label: "Solar Equipment", href: "/products?category=Solar Equipment" },
  { label: "Plumbing Supplies", href: "/products?category=Plumbing" },
  { label: "B2B Portal", href: "/b2b-portal" }
];

const services = [
  "Solar Installation",
  "Bulk Procurement", 
  "Same-Day Delivery",
  "Technical Support",
  "Custom Quotes",
  "Installation Services"
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white py-16 border-t-4 border-orange-500">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative mr-4">
                <div className="bg-gradient-to-br from-magware-purple via-blue-600 to-magware-blue p-3 rounded-2xl shadow-xl border border-white/10">
                  <div className="absolute inset-0 bg-white/5 rounded-2xl"></div>
                  <Building2 className="text-white h-8 w-8 relative z-10 drop-shadow-2xl" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
              </div>
              <div>
                <h4 className="text-2xl font-black text-white mb-1">
                  MAGWARE
                </h4>
                <div className="flex items-center space-x-2">
                  <div className="h-0.5 w-6 bg-gradient-to-r from-magware-purple to-blue-600"></div>
                  <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
                    Professional Hardware
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for professional tools, building materials, and solar solutions in Zimbabwe.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61560829087243"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-magware-purple p-3 rounded-lg hover:bg-magware-purple-dark transition-colors"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-magware-purple p-3 rounded-lg hover:bg-magware-purple-dark transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-magware-purple p-3 rounded-lg hover:bg-magware-purple-dark transition-colors"
              >
                <FaWhatsapp className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-gray-400 hover:text-magware-purple transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-lg font-semibold mb-6">Services</h5>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-magware-purple transition-colors cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <h5 className="text-xl font-bold mb-6 text-orange-400">📞 Contact Us</h5>
            <div className="space-y-5">
              <div className="flex items-start">
                <MapPin className="text-orange-400 mt-1 mr-4 h-6 w-6 flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-lg">Shop 4, Avonlea Shopping Center</p>
                  <p className="text-gray-300 font-medium">Greencroft Shops, Next to OK Supermarket</p>
                  <p className="text-orange-300 text-sm mt-1">🚗 Easy parking available</p>
                </div>
              </div>
              <div className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                <div className="flex items-center mb-2">
                  <Phone className="text-green-400 mr-3 h-6 w-6 flex-shrink-0" />
                  <h6 className="text-white font-bold">Call Now for Quotes</h6>
                </div>
                <div className="space-y-1">
                  <p className="text-green-200 font-bold text-lg">📱 0779 656 666</p>
                  <p className="text-green-200 font-bold text-lg">📱 0776 612 600</p>
                  <p className="text-green-300 text-sm">💬 WhatsApp available</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="text-blue-400 mr-4 h-6 w-6 flex-shrink-0 mt-1" />
                <div>
                  <h6 className="text-white font-bold mb-2">Store Hours</h6>
                  <p className="text-blue-200 font-semibold">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  <p className="text-red-300 font-semibold">Sunday: Closed</p>
                  <p className="text-yellow-300 text-sm mt-1">⚡ Same-day delivery available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 MAGWARE Hardware Store. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 hover:text-magware-purple transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-gray-400 hover:text-magware-purple transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="text-gray-400 hover:text-magware-purple transition-colors cursor-pointer">Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
