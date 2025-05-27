import { CartProvider } from "@/lib/cart-context";
import { WishlistProvider } from "@/lib/wishlist-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Route, Switch } from "wouter";
import Home from "@/pages/home";
import Products from "@/pages/products";
import B2BPortal from "@/pages/b2b-portal";
import Wishlist from "@/pages/wishlist";
import NotFound from "@/pages/not-found";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <WishlistProvider>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/b2b-portal" component={B2BPortal} />
                <Route path="/wishlist" component={Wishlist} />
                <Route component={NotFound} />
              </Switch>
            </WishlistProvider>
          </CartProvider>
        </TooltipProvider>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;