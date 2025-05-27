import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { Search, ShoppingCart, Building2, Menu, X, Phone, MapPin } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/products?category=Power Tools", label: "Power Tools" },
    { href: "/products?category=Building Materials", label: "Building Materials" },
    { href: "/products?category=Plumbing", label: "Plumbing" },
    { href: "/products?category=Solar Equipment", label: "Solar Equipment" },
    { href: "/b2b-portal", label: "B2B Portal" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-magware-purple-dark text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              0779 656 666 | 0776 612 600
            </span>
            <span className="hidden md:flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Shop 4, Avonlea Shopping Center
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61560829087243" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-yellow-300 transition-colors"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <span className="hidden md:inline">Follow us for updates!</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between py-3 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative mr-3">
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-3 rounded-2xl shadow-2xl border border-purple-300/30 backdrop-blur-sm transform transition-all duration-300 group-hover:scale-105">
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <Building2 className="text-white h-7 w-7 md:h-8 md:w-8 drop-shadow-2xl" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-xl animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 bg-clip-text text-transparent tracking-tight leading-none">
                  MAGWARE
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="h-0.5 w-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
                  <p className="text-xs md:text-sm text-gray-700 font-bold tracking-wider uppercase">
                    Hardware & Building Supplies
                  </p>
                </div>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative w-full group">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search for tools, equipment, materials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-14 pl-4 py-3 rounded-xl border-2 border-gray-200 focus:border-magware-purple focus:ring-4 focus:ring-magware-purple/10 transition-all duration-200 bg-gray-50/50 focus:bg-white"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1 h-[calc(100%-8px)] px-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg transition-all duration-200"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link href="/b2b-portal">
                <Button variant="ghost" className="hidden lg:flex items-center text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-200 rounded-lg px-4 py-2">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span className="font-semibold">B2B Portal</span>
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center text-gray-700 hover:text-purple-600 hover:bg-purple-50 relative transition-all duration-200 rounded-lg px-4 py-2"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden md:inline font-semibold">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-2.5 py-1 text-xs ml-2 min-w-[22px] text-center font-bold shadow-xl animate-pulse">
                    {cartCount}
                  </span>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-magware-gray"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block border-t border-gray-100 py-3 bg-gray-50/30">
            <ul className="flex items-center justify-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      className={`font-semibold transition-all duration-200 rounded-lg px-4 py-2 relative ${
                        location === link.href
                          ? "text-purple-600 bg-purple-50 shadow-sm"
                          : "text-gray-700 hover:text-purple-600 hover:bg-white/80"
                      }`}
                    >
                      {link.label}
                      {location === link.href && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-magware-purple to-blue-600 rounded-full"></div>
                      )}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="flex">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="ml-2 bg-magware-purple hover:bg-magware-purple-dark"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start font-medium ${
                        location === link.href
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
