import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBulkOrderSchema, insertCartItemSchema } from "@shared/schema";
import { z } from "zod";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const search = req.query.search as string;

      // Get products from storage
      let products = await storage.getProducts();

      // Filter by search query if provided
      if (search && typeof search === "string") {
        const searchLower = search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
        );
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/featured", async (req, res) => {
    try {
      // Get featured products from storage
      const products = await storage.getProducts();
      const featuredProducts = products.filter(product => product.featured);

      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const search = req.query.search as string;
      const decodedCategory = decodeURIComponent(category);
      
      // Get products from storage
      let products = await storage.getProducts();

      // Filter by category
      products = products.filter(product => 
        product.category.toLowerCase() === decodedCategory.toLowerCase()
      );

      // Filter by search query if provided
      if (search && typeof search === "string") {
        const searchLower = search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        );
      }

      res.json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ message: "Failed to fetch products by category" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== "string") {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products = await storage.searchProducts(q);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Solar packages routes
  app.get("/api/solar-packages", async (req, res) => {
    try {
      const packages = await storage.getSolarPackages();
      res.json(packages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch solar packages" });
    }
  });

  app.get("/api/solar-packages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const solarPackage = await storage.getSolarPackageById(id);
      if (!solarPackage) {
        return res.status(404).json({ message: "Solar package not found" });
      }
      res.json(solarPackage);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch solar package" });
    }
  });

  // Bulk order routes
  app.post("/api/bulk-orders", async (req, res) => {
    try {
      const { contactPerson, email, phone, monthlyVolume, productsNeeded } = req.body;

      // In a real app, you would save this to a database
      console.log("Bulk order request received:", {
        contactPerson,
        email,
        phone,
        monthlyVolume,
        productsNeeded,
        timestamp: new Date().toISOString()
      });

      res.json({ success: true, message: "Quote request submitted successfully" });
    } catch (error) {
      console.error("Error processing bulk order:", error);
      res.status(500).json({ error: "Failed to submit bulk order request" });
    }
  });

  app.post("/api/b2b-registration", async (req, res) => {
    try {
      const { 
        companyName, 
        contactPerson, 
        email, 
        phone, 
        address, 
        businessType, 
        monthlyVolume, 
        productsNeeded, 
        taxNumber 
      } = req.body;

      // In a real app, you would save this to a database
      console.log("B2B registration received:", {
        companyName,
        contactPerson,
        email,
        phone,
        address,
        businessType,
        monthlyVolume,
        productsNeeded,
        taxNumber,
        timestamp: new Date().toISOString()
      });

      res.json({ success: true, message: "B2B registration submitted successfully" });
    } catch (error) {
      console.error("Error processing B2B registration:", error);
      res.status(500).json({ error: "Failed to submit B2B registration" });
    }
  });

  app.get("/api/bulk-orders", async (req, res) => {
    try {
      const orders = await storage.getBulkOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bulk orders" });
    }
  });

  // Cart routes
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const cartItems = await storage.getCartItems(sessionId);

      // Enrich cart items with product details
      const enrichedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId!);
          return {
            ...item,
            product
          };
        })
      );

      res.json(enrichedItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addCartItem(validatedData);
      res.status(201).json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;

      if (!quantity || quantity < 1) {
        return res.status(400).json({ message: "Valid quantity is required" });
      }

      const updatedItem = await storage.updateCartItemQuantity(id, quantity);
      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.removeCartItem(id);

      if (!success) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}