import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { useWishlist } from "@/lib/wishlist-context";
import { Search, ShoppingCart, Building2, Menu, X, Phone, MapPin, Heart } from "lucide-react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Clear search after navigation
    }
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
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
              <div className="relative mr-4">
                <img 
                  src="/attached_assets/magware-logo.png" 
                  alt="MAGWARE Logo" 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl border-2 border-white/20 transform transition-all duration-300 group-hover:scale-105"
                />
                {/* Quality indicator dot */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-xl border-2 border-white animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                {/* Professional badge */}
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 bg-clip-text text-transparent tracking-tight leading-none drop-shadow-sm">
                  MAGWARE
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="h-1 w-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-full shadow-sm"></div>
                  <p className="text-xs md:text-sm text-gray-800 font-bold tracking-wider uppercase bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                    Professional Hardware Solutions
                  </p>
                </div>
                <div className="flex items-center space-x-1 mt-0.5">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-orange-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                    ))}
                  </div>

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

              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  className="flex items-center text-gray-700 hover:text-purple-600 hover:bg-purple-50 relative transition-all duration-200 rounded-lg px-4 py-2"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  <span className="hidden md:inline font-semibold">Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white rounded-full px-2.5 py-1 text-xs ml-2 min-w-[22px] text-center font-bold shadow-xl animate-pulse">
                      {wishlistCount}
                    </span>
                  )}
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

              <a 
                href="https://wa.me/263779656666?text=Hi%20MAGWARE%2C%20I%20need%20an%20instant%20quote%20for%20hardware%20items.%20Please%20help%20me%20with%20pricing."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button 
                  className="hidden md:flex bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  <FaWhatsapp className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </Button>
              </a>

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
                        location === link.href || location.includes(link.href)
                          ? "text-purple-600 bg-purple-50 shadow-sm"
                          : "text-gray-700 hover:text-purple-600 hover:bg-white/80"
                      }`}
                      onClick={() => {
                        if (link.href.includes('category=')) {
                          navigate(link.href);
                        }
                      }}
                    >
                      {link.label}
                      {(location === link.href || location.includes(link.href)) && (
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
                        location === link.href || location.includes(link.href)
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                      }`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        if (link.href.includes('category=')) {
                          navigate(link.href);
                        }
                      }}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <Link href="/wishlist">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50`}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist ({wishlistCount})
                  </Button>
                </Link>
                <a 
                  href="https://wa.me/263779656666?text=Hi%20MAGWARE%2C%20I%20need%20an%20instant%20quote%20for%20hardware%20items.%20Please%20help%20me%20with%20pricing."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                    <FaWhatsapp className="h-4 w-4 mr-2" />
                    WhatsApp Us
                  </Button>
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}