
import { Link } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartSidebar from "@/components/cart-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/lib/wishlist-context";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (productId: number, productName: string) => {
    try {
      await addToCart(productId, 1);
      toast({
        title: "Added to cart",
        description: `${productName} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-magware-purple hover:text-magware-purple-dark"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            {wishlistItems.length > 0 && (
              <Button
                variant="outline"
                onClick={clearWishlist}
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Wishlist
              </Button>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            My Wishlist
            {wishlistItems.length > 0 && (
              <Badge variant="secondary" className="ml-4 bg-magware-purple text-white">
                {wishlistItems.length} items
              </Badge>
            )}
          </h1>
          <p className="text-xl text-magware-gray">Your saved products for later</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h3>
            <p className="text-magware-gray mb-8">Start adding products you love to your wishlist!</p>
            <Link href="/products">
              <Button className="bg-magware-purple hover:bg-magware-purple-dark">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {wishlistItems.map((product) => (
              <Card key={product.id} className="hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.imageUrl?.replace('@assets/', '/attached_assets/') || "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.inStock && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                      In Stock
                    </Badge>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 left-4 bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-lg mb-2">{product.name}</h4>
                  <p className="text-magware-gray text-sm mb-4">{product.description}</p>
                  <div className="text-2xl font-bold text-magware-purple mb-4">
                    ${product.price}
                  </div>
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      className="w-full bg-magware-purple hover:bg-magware-purple-dark"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
      <CartSidebar />
    </div>
  );
}
