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
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="magware-gradient p-3 rounded-lg mr-4">
                <Building2 className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-magware-purple">MAGWARE</h1>
                <p className="text-sm text-magware-gray">Hardware Store</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for tools, equipment, materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 focus:ring-2 focus:ring-magware-purple"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-0 top-0 h-full rounded-l-none bg-magware-purple hover:bg-magware-purple-dark"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <Link href="/b2b-portal">
                <Button variant="ghost" className="hidden md:flex items-center text-magware-gray hover:text-magware-purple">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>B2B Portal</span>
                </Button>
              </Link>
              
              <Button 
                variant="ghost" 
                onClick={() => setIsCartOpen(true)}
                className="flex items-center text-magware-gray hover:text-magware-purple relative"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-magware-purple text-white rounded-full px-2 py-1 text-xs ml-2 min-w-[20px] text-center">
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
          <nav className="hidden md:block border-t border-gray-200 py-4">
            <ul className="flex items-center justify-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Button
                      variant="ghost"
                      className={`font-medium transition-colors ${
                        location === link.href
                          ? "text-magware-purple"
                          : "text-magware-gray hover:text-magware-purple"
                      }`}
                    >
                      {link.label}
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
                      className={`w-full justify-start ${
                        location === link.href
                          ? "text-magware-purple bg-purple-50"
                          : "text-magware-gray"
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
