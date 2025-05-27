import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address"),
  monthlyVolume: text("monthly_volume"),
  productsNeeded: text("products_needed"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  category: text("category").notNull(),
  brand: text("brand"),
  imageUrl: text("image_url"),
  inStock: boolean("in_stock").default(true),
  featured: boolean("featured").default(false),
  specifications: text("specifications"),
});

export const solarPackages = pgTable("solar_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description").notNull(),
  components: text("components").array(),
  powerOutput: text("power_output"),
  suitable: text("suitable").array(),
  popular: boolean("popular").default(false),
});

export const bulkOrders = pgTable("bulk_orders", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  monthlyVolume: text("monthly_volume").notNull(),
  productsNeeded: text("products_needed").notNull(),
  status: text("status").default("pending"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").default(1),
  addedAt: timestamp("added_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  isApproved: true,
  createdAt: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertSolarPackageSchema = createInsertSchema(solarPackages).omit({
  id: true,
});

export const insertBulkOrderSchema = createInsertSchema(bulkOrders).omit({
  id: true,
  status: true,
  createdAt: true,
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({
  id: true,
  addedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type SolarPackage = typeof solarPackages.$inferSelect;
export type InsertSolarPackage = z.infer<typeof insertSolarPackageSchema>;
export type BulkOrder = typeof bulkOrders.$inferSelect;
export type InsertBulkOrder = z.infer<typeof insertBulkOrderSchema>;
export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;
