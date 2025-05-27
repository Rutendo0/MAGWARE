import { 
  users, companies, products, solarPackages, bulkOrders, cartItems,
  type User, type InsertUser, type Company, type InsertCompany,
  type Product, type InsertProduct, type SolarPackage, type InsertSolarPackage,
  type BulkOrder, type InsertBulkOrder, type CartItem, type InsertCartItem
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createCompany(company: InsertCompany): Promise<Company>;
  getCompanyById(id: number): Promise<Company | undefined>;
  
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getSolarPackages(): Promise<SolarPackage[]>;
  getSolarPackageById(id: number): Promise<SolarPackage | undefined>;
  createSolarPackage(solarPackage: InsertSolarPackage): Promise<SolarPackage>;
  
  createBulkOrder(order: InsertBulkOrder): Promise<BulkOrder>;
  getBulkOrders(): Promise<BulkOrder[]>;
  
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private companies: Map<number, Company>;
  private products: Map<number, Product>;
  private solarPackages: Map<number, SolarPackage>;
  private bulkOrders: Map<number, BulkOrder>;
  private cartItems: Map<number, CartItem>;
  private currentId: number;
  private currentCompanyId: number;
  private currentProductId: number;
  private currentSolarPackageId: number;
  private currentBulkOrderId: number;
  private currentCartItemId: number;

  constructor() {
    this.users = new Map();
    this.companies = new Map();
    this.products = new Map();
    this.solarPackages = new Map();
    this.bulkOrders = new Map();
    this.cartItems = new Map();
    this.currentId = 1;
    this.currentCompanyId = 1;
    this.currentProductId = 1;
    this.currentSolarPackageId = 1;
    this.currentBulkOrderId = 1;
    this.currentCartItemId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize comprehensive product catalog based on MAGWARE's actual inventory
    const sampleProducts: InsertProduct[] = [
      // Ceiling Lights
      {
        name: "Modern LED Ceiling Lights",
        description: "Affordable ceiling lights with various modern designs",
        price: "45.00",
        category: "Electrical",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/IMG-20250419-WA0021.jpg",
        inStock: true,
        featured: true,
        specifications: "LED technology, multiple designs available, energy efficient"
      },
      
      // Paint & Varnish
      {
        name: "Splash Wood Varnish - Glossy Finish",
        description: "High-quality wood varnish for interior & exterior use",
        price: "18.50",
        category: "Paints & Finishes",
        brand: "Splash",
        imageUrl: "/attached_assets/IMG-20250419-WA0022.jpg",
        inStock: true,
        featured: true,
        specifications: "Weather resistant, glossy finish, suitable for all wood types"
      },
      
      // Tile Grout & Adhesives
      {
        name: "MAG-GRIP Tile Grout - Fast Set",
        description: "Fast-setting tile grout for easy application, 5kg bag",
        price: "12.00",
        category: "Building Materials",
        brand: "MAG-GRIP",
        imageUrl: "@assets/IMG-20250419-WA0011.jpg",
        inStock: true,
        featured: true,
        specifications: "Quick curing 2-4 hours, premixed powder form, smooth application"
      },
      
      {
        name: "MAG-GRIP Tile Grout - Red Fast Set",
        description: "Premium tile grout with fast-set formula, 5kg bag",
        price: "12.00",
        category: "Building Materials", 
        brand: "MAG-GRIP",
        imageUrl: "@assets/IMG-20250419-WA0012.jpg",
        inStock: true,
        featured: false,
        specifications: "Fast set easy application, bond strength for ceramic & stone"
      },
      
      {
        name: "MAG-GRIP Porcelain Epoxy Grout",
        description: "Professional epoxy grout for porcelain and ceramic installations",
        price: "15.00",
        category: "Building Materials",
        brand: "MAG-GRIP", 
        imageUrl: "@assets/IMG-20250419-WA0013.jpg",
        inStock: true,
        featured: false,
        specifications: "Incomparable strength, extremely low maintenance, easy to clean"
      },
      
      // Bulk Tile Tools
      {
        name: "Professional Tiling Tools Set",
        description: "Complete tiling tools for contractors - buy in bulk for big discounts",
        price: "85.00",
        originalPrice: "120.00",
        category: "Hand Tools",
        brand: "Professional",
        imageUrl: "@assets/IMG-20250419-WA0014.jpg",
        inStock: true,
        featured: true,
        specifications: "Bulk pricing available, professional grade tools"
      },
      
      // Power Tools - WADFOW Grass Trimmer
      {
        name: "WADFOW Gasoline Grass Trimmer 62cc",
        description: "Professional 2-stroke gasoline grass trimmer & brush cutter",
        price: "150.00",
        originalPrice: "180.00",
        category: "Power Tools",
        brand: "WADFOW",
        imageUrl: "@assets/IMG-20250419-WA0015.jpg",
        inStock: true,
        featured: true,
        specifications: "62cc displacement, 3.8HP, 9000rpm max speed, includes line spool & blade"
      },
      
      // Solar Equipment
      {
        name: "Complete Solar Equipment & Installation Package",
        description: "Professional solar installation packages with equipment",
        price: "850.00",
        category: "Solar Equipment",
        brand: "MAGWARE",
        imageUrl: "@assets/IMG-20250419-WA0016.jpg",
        inStock: true,
        featured: true,
        specifications: "Complete installation package, refer clients & earn cash back"
      },
      
      // TOTAL Power Tools
      {
        name: "TOTAL Professional Power Tools & Equipment",
        description: "Complete TOTAL power tools collection for professionals",
        price: "320.00",
        category: "Power Tools",
        brand: "TOTAL",
        imageUrl: "@assets/IMG-20250419-WA0017.jpg",
        inStock: true,
        featured: true,
        specifications: "Professional grade tools, refer clients & earn cash back"
      },
      
      // WADFOW Power Tools Set
      {
        name: "WADFOW Professional Power Tool Kit",
        description: "Complete WADFOW power tools set with drill, batteries and accessories",
        price: "195.00",
        category: "Power Tools",
        brand: "WADFOW",
        imageUrl: "@assets/IMG-20250419-WA0018.jpg",
        inStock: true,
        featured: true,
        specifications: "Impact function, 20V batteries, complete tool case, drill bits included"
      },
      
      // Plaster Products
      {
        name: "Rhi-Lite Ceiling Plaster 20kg",
        description: "Premium gypsum-based ceiling plaster for smooth finishes",
        price: "22.00",
        category: "Building Materials",
        brand: "Rhi-Lite",
        imageUrl: "@assets/IMG-20250419-WA0019.jpg",
        inStock: true,
        featured: false,
        specifications: "15 year warranty, 100% assurance, high strength interior/exterior"
      },
      
      {
        name: "Rhi-Bond Wall Plaster 20kg", 
        description: "Professional wall plaster for interior and exterior applications",
        price: "22.00",
        category: "Building Materials",
        brand: "Rhi-Bond",
        imageUrl: "/attached_assets/IMG-20250419-WA0026.jpg",
        inStock: true,
        featured: false,
        specifications: "15 year warranty, 100% assurance, suitable for all wall types"
      },

      // Additional WhatsApp Image Products from your collection
      {
        name: "Professional Hardware Tools Set",
        description: "Complete set of professional hardware tools for construction",
        price: "75.00",
        category: "Hand Tools",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.14.jpeg",
        inStock: true,
        featured: true,
        specifications: "High-quality steel construction, ergonomic handles"
      },

      {
        name: "Paint Brushes & Rollers Set",
        description: "Premium paint application tools for professional results",
        price: "28.00",
        category: "Paints & Finishes",
        brand: "Professional",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.15.jpeg",
        inStock: true,
        featured: false,
        specifications: "Various sizes, synthetic bristles, smooth finish rollers"
      },

      {
        name: "Electrical Wiring Components",
        description: "Complete electrical wiring supplies and components",
        price: "45.00",
        category: "Electrical",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.16.jpeg",
        inStock: true,
        featured: true,
        specifications: "Copper wiring, safety certified, various gauges available"
      },

      {
        name: "Plumbing Fittings & Pipes",
        description: "High-quality plumbing supplies for residential and commercial use",
        price: "65.00",
        category: "Plumbing",
        brand: "Professional",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.17.jpeg",
        inStock: true,
        featured: true,
        specifications: "PVC and metal fittings, various pipe sizes, leak-proof joints"
      },

      {
        name: "Construction Adhesives & Sealants",
        description: "Industrial-grade adhesives and sealants for construction",
        price: "32.00",
        category: "Building Materials",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.18.jpeg",
        inStock: true,
        featured: false,
        specifications: "Weather resistant, fast curing, multi-surface compatibility"
      },

      {
        name: "Security Hardware & Locks",
        description: "Premium security hardware for doors and windows",
        price: "85.00",
        category: "Security",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.19.jpeg",
        inStock: true,
        featured: true,
        specifications: "High-security locks, anti-pick technology, weather resistant"
      },

      {
        name: "Garden & Outdoor Tools",
        description: "Complete collection of garden and outdoor maintenance tools",
        price: "55.00",
        category: "Garden Tools",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.20.jpeg",
        inStock: true,
        featured: false,
        specifications: "Rust-resistant coating, ergonomic design, professional grade"
      },

      {
        name: "Measuring & Level Tools",
        description: "Precision measuring and leveling tools for accurate work",
        price: "42.00",
        category: "Hand Tools",
        brand: "Professional",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.31.21.jpeg",
        inStock: true,
        featured: false,
        specifications: "High accuracy, bubble levels, metric and imperial measurements"
      },

      {
        name: "Fasteners & Hardware Assortment",
        description: "Comprehensive assortment of bolts, screws, and fasteners",
        price: "38.00",
        category: "Fasteners",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.14.jpeg",
        inStock: true,
        featured: true,
        specifications: "Stainless steel, various sizes, corrosion resistant"
      },

      {
        name: "Insulation Materials",
        description: "High-performance insulation materials for energy efficiency",
        price: "48.00",
        category: "Building Materials",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.15.jpeg",
        inStock: true,
        featured: false,
        specifications: "Fire retardant, moisture resistant, easy installation"
      },

      {
        name: "Roofing Materials & Supplies",
        description: "Complete roofing solutions for residential and commercial buildings",
        price: "125.00",
        category: "Roofing",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.16.jpeg",
        inStock: true,
        featured: true,
        specifications: "Weather resistant, long-lasting, various materials available"
      },

      {
        name: "Concrete & Masonry Tools",
        description: "Professional tools for concrete and masonry work",
        price: "68.00",
        category: "Hand Tools",
        brand: "Professional",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.17.jpeg",
        inStock: true,
        featured: false,
        specifications: "Heavy-duty construction, precision finishing, ergonomic handles"
      },

      {
        name: "Safety Equipment & Gear",
        description: "Essential safety equipment for construction and workshop use",
        price: "52.00",
        category: "Safety",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.18.jpeg",
        inStock: true,
        featured: true,
        specifications: "Safety certified, protective gear, high-visibility options"
      },

      {
        name: "Flooring Installation Tools",
        description: "Specialized tools for professional flooring installation",
        price: "78.00",
        category: "Hand Tools",
        brand: "Professional",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.20.jpeg",
        inStock: true,
        featured: false,
        specifications: "Precision cutting, smooth installation, professional results"
      },

      {
        name: "Window & Door Hardware",
        description: "Complete hardware solutions for windows and doors",
        price: "62.00",
        category: "Hardware",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.21.jpeg",
        inStock: true,
        featured: true,
        specifications: "Smooth operation, weather sealed, adjustable fittings"
      },

      {
        name: "Ventilation & HVAC Supplies",
        description: "Ventilation and HVAC components for climate control",
        price: "95.00",
        category: "HVAC",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.22.jpeg",
        inStock: true,
        featured: false,
        specifications: "Energy efficient, quiet operation, easy installation"
      },

      {
        name: "Drainage & Gutter Systems",
        description: "Complete drainage solutions and gutter systems",
        price: "88.00",
        category: "Plumbing",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.23.jpeg",
        inStock: true,
        featured: true,
        specifications: "Corrosion resistant, efficient water flow, easy maintenance"
      },

      {
        name: "Lighting Fixtures & Electrical",
        description: "Modern lighting fixtures and electrical components",
        price: "72.00",
        category: "Electrical",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.24.jpeg",
        inStock: true,
        featured: true,
        specifications: "LED compatible, energy efficient, modern designs"
      },

      {
        name: "Storage & Organization Systems",
        description: "Professional storage and organization solutions",
        price: "58.00",
        category: "Storage",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.25.jpeg",
        inStock: true,
        featured: false,
        specifications: "Heavy-duty construction, modular design, space efficient"
      },

      {
        name: "Welding & Metal Work Supplies",
        description: "Complete welding and metalwork supplies for professionals",
        price: "145.00",
        category: "Welding",
        brand: "Professional",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.27.jpeg",
        inStock: true,
        featured: true,
        specifications: "Professional grade, various rod types, safety equipment included"
      },

      {
        name: "Automotive & Machinery Tools",
        description: "Specialized tools for automotive and machinery maintenance",
        price: "115.00",
        category: "Automotive Tools",
        brand: "MAGWARE",
        imageUrl: "/attached_assets/WhatsApp Image 2025-05-14 at 10.49.29.jpeg",
        inStock: true,
        featured: true,
        specifications: "Precision tools, heavy-duty construction, professional grade"
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });

    // Initialize solar packages
    const solarPackagesData: InsertSolarPackage[] = [
      {
        name: "1000watts Solar System",
        price: "600.00",
        description: "Basic solar system for small homes",
        components: [
          "1 x 1000watts Inverter",
          "2 x 150w solar panels", 
          "1 x 12v 100Ah Gel Battery",
          "30amp charge controller",
          "Solar Protection Kit + Accessories"
        ],
        powerOutput: "1000W",
        suitable: ["TV", "Decoder", "Phone charging", "6 lights"],
        popular: false
      },
      {
        name: "1KVA Solar System",
        price: "850.00",
        description: "Popular choice for residential use",
        components: [
          "1 x 1kva Hybrid Inverter",
          "3 x 150w solar panels",
          "1 x 12v 100Ah Gel Battery",
          "Solar Protection Kit + Accessories"
        ],
        powerOutput: "1KVA",
        suitable: ["TV", "Decoder", "Phone charging", "6 lights"],
        popular: true
      },
      {
        name: "3KVA Solar System", 
        price: "1900.00",
        description: "Enhanced system for larger homes",
        components: [
          "1 x 3kva Hybrid Inverter",
          "4 x 330w solar panels",
          "1 x 24v 100Ah Lithium Battery",
          "Solar Protection Kit + Accessories"
        ],
        powerOutput: "3KVA",
        suitable: ["Entertainment System", "Laptops", "1 Standard Fridge", "10 Lights"],
        popular: false
      },
      {
        name: "5KVA Solar System",
        price: "2700.00", 
        description: "Premium system for large homes and small businesses",
        components: [
          "1 x 5kva Hybrid Inverter",
          "8 x 330w solar panels (or Equivalent)",
          "1 x 48v 100Ah Lithium Battery",
          "Solar Protection Kit + Accessories"
        ],
        powerOutput: "5KVA",
        suitable: ["Entertainment System", "Borehole pump", "booster pump", "Laptops", "2 Standard Fridges", "Iron", "15 Lights"],
        popular: false
      }
    ];

    solarPackagesData.forEach(pkgData => {
      this.createSolarPackage(pkgData);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { 
      ...insertCompany,
      address: insertCompany.address || null,
      monthlyVolume: insertCompany.monthlyVolume || null,
      productsNeeded: insertCompany.productsNeeded || null,
      id, 
      isApproved: false,
      createdAt: new Date()
    };
    this.companies.set(id, company);
    return company;
  }

  async getCompanyById(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.featured
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm))
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { 
      ...insertProduct, 
      id,
      brand: insertProduct.brand || null,
      originalPrice: insertProduct.originalPrice || null,
      imageUrl: insertProduct.imageUrl || null,
      inStock: insertProduct.inStock || null,
      featured: insertProduct.featured || null,
      specifications: insertProduct.specifications || null
    };
    this.products.set(id, product);
    return product;
  }

  async getSolarPackages(): Promise<SolarPackage[]> {
    return Array.from(this.solarPackages.values());
  }

  async getSolarPackageById(id: number): Promise<SolarPackage | undefined> {
    return this.solarPackages.get(id);
  }

  async createSolarPackage(insertPackage: InsertSolarPackage): Promise<SolarPackage> {
    const id = this.currentSolarPackageId++;
    const solarPackage: SolarPackage = { 
      ...insertPackage, 
      id,
      components: insertPackage.components || null,
      powerOutput: insertPackage.powerOutput || null,
      suitable: insertPackage.suitable || null,
      popular: insertPackage.popular || null
    };
    this.solarPackages.set(id, solarPackage);
    return solarPackage;
  }

  async createBulkOrder(insertOrder: InsertBulkOrder): Promise<BulkOrder> {
    const id = this.currentBulkOrderId++;
    const order: BulkOrder = { 
      ...insertOrder,
      companyId: insertOrder.companyId || null,
      notes: insertOrder.notes || null,
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.bulkOrders.set(id, order);
    return order;
  }

  async getBulkOrders(): Promise<BulkOrder[]> {
    return Array.from(this.bulkOrders.values());
  }

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      item => item.sessionId === sessionId
    );
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists for this session
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertItem.sessionId && 
              item.productId === insertItem.productId
    );

    if (existingItem) {
      // Update quantity instead of creating new item
      const newQuantity = (existingItem.quantity || 1) + (insertItem.quantity || 1);
      return this.updateCartItemQuantity(existingItem.id, newQuantity) as Promise<CartItem>;
    }

    const id = this.currentCartItemId++;
    const cartItem: CartItem = { 
      sessionId: insertItem.sessionId,
      productId: insertItem.productId ?? null,
      quantity: insertItem.quantity ?? null,
      id,
      addedAt: new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (item) {
      const updatedItem = { ...item, quantity };
      this.cartItems.set(id, updatedItem);
      return updatedItem;
    }
    return undefined;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.entries()).filter(
      ([_, item]) => item.sessionId === sessionId
    );
    itemsToRemove.forEach(([id, _]) => this.cartItems.delete(id));
  }
}

export const storage = new MemStorage();
