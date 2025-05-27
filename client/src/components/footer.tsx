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
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-br from-magware-purple via-blue-600 to-magware-blue p-4 rounded-xl shadow-lg mr-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <Building2 className="text-white h-10 w-10 relative z-10 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4 className="text-3xl font-bold bg-gradient-to-r from-magware-purple to-blue-600 bg-clip-text text-transparent">
                  MAGWARE
                </h4>
                <p className="text-sm text-gray-400 font-medium tracking-wide">Professional Hardware Store</p>
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
          <div>
            <h5 className="text-lg font-semibold mb-6">Contact Us</h5>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="text-magware-purple mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Shop 4, Avonlea Shopping Center</p>
                  <p className="text-gray-400">Greencroft Shops, Next to OK Supermarket</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-magware-purple mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">0779 656 666</p>
                  <p className="text-gray-400">0776 612 600</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="text-magware-purple mr-3 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">Mon - Sat: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-400">Sunday: Closed</p>
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
