import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Building2, Users, TrendingUp, Clock, CheckCircle, Webhook, ArrowLeft } from "lucide-react";

const bulkOrderSchema = z.object({
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  monthlyVolume: z.string().min(1, "Monthly volume is required"),
  productsNeeded: z.string().min(10, "Please describe the products you need"),
});

export default function B2BPortal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof bulkOrderSchema>>({
    resolver: zodResolver(bulkOrderSchema),
    defaultValues: {
      contactPerson: "",
      email: "",
      phone: "",
      monthlyVolume: "",
      productsNeeded: "",
    },
  });

  const submitBulkOrder = useMutation({
    mutationFn: async (data: z.infer<typeof bulkOrderSchema>) => {
      const response = await apiRequest("POST", "/api/bulk-orders", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: "Bulk Order Request Submitted",
        description: "We'll contact you within 24 hours to discuss your requirements.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof bulkOrderSchema>) => {
    submitBulkOrder.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="magware-gradient text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Button
                variant="ghost"
                onClick={() => setLocation('/')}
                className="text-white hover:text-yellow-400 hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <h1 className="text-5xl font-bold mb-6">B2B Portal</h1>
            <p className="text-xl mb-8 text-purple-100">
              Streamlined procurement solutions for construction companies and contractors
            </p>
            <div className="flex justify-center items-center space-x-8 text-sm">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-yellow-400" />
                <span>Volume Discounts</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-yellow-400" />
                <span>Dedicated Support</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-yellow-400" />
                <span>API Integration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Benefits Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose MAGWARE for Bulk Orders?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-magware-purple p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Volume Discounts up to 25%</h3>
                  <p className="text-magware-gray">
                    Special pricing tiers based on your monthly order volume. The more you order, the more you save.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-magware-blue p-3 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dedicated Account Manager</h3>
                  <p className="text-magware-gray">
                    Your dedicated point of contact who understands your business needs and ensures smooth operations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-magware-secondary p-3 rounded-lg">
                  <Webhook className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">API Integration</h3>
                  <p className="text-magware-gray">
                    Connect your procurement system directly to MAGWARE for automated ordering and inventory management.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-500 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Same-Day Delivery</h3>
                  <p className="text-magware-gray">
                    Priority fulfillment and same-day delivery for bulk orders within Harare and surrounding areas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-yellow-500 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">30-Day Credit Terms</h3>
                  <p className="text-magware-gray">
                    Flexible payment terms for approved business accounts to help with your cash flow management.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <h4 className="text-lg font-semibold mb-2">Success Story</h4>
              <p className="text-magware-gray italic">
                "MAGWARE's B2B portal has streamlined our procurement process significantly. We've reduced ordering time by 60% 
                and saved over $50,000 annually through their volume discounts."
              </p>
              <p className="text-sm font-medium mt-2">- John Mukamuri, Site Manager, Masimba Holdings</p>
            </div>
          </div>

          {/* Order Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-magware-purple">
                  {isSubmitted ? "Request Submitted!" : "Request Bulk Quote"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Thank you for your interest!</h3>
                    <p className="text-magware-gray mb-6">
                      We've received your bulk order request and will contact you within 24 hours to discuss your requirements 
                      and provide a customized quote.
                    </p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-magware-purple text-magware-purple"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+263 77X XXX XXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="monthlyVolume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Order Volume (USD)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                                <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                                <SelectItem value="25000+">$25,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="productsNeeded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Products Needed</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the main product categories or specific items you need regularly..."
                                className="min-h-[120px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-magware-purple hover:bg-magware-purple-dark"
                        disabled={submitBulkOrder.isPending}
                      >
                        {submitBulkOrder.isPending ? "Submitting..." : "Request Quote & Setup Meeting"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle, Building2, Users, Truck, CreditCard, Shield, Zap } from "lucide-react";

const b2bRegistrationSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  businessType: z.string().min(1, "Please select a business type"),
  monthlyVolume: z.string().min(1, "Please select monthly volume"),
  productsNeeded: z.string().min(10, "Please describe your product needs"),
  taxNumber: z.string().optional(),
});

export default function B2BPortal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof b2bRegistrationSchema>>({
    resolver: zodResolver(b2bRegistrationSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      businessType: "",
      monthlyVolume: "",
      productsNeeded: "",
      taxNumber: "",
    },
  });

  const submitRegistration = useMutation({
    mutationFn: async (data: z.infer<typeof b2bRegistrationSchema>) => {
      const response = await apiRequest("POST", "/api/b2b-registration", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Registration Submitted",
        description: "We'll review your application and contact you within 48 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit registration. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof b2bRegistrationSchema>) => {
    submitRegistration.mutate(data);
  };

  const benefits = [
    {
      icon: CreditCard,
      title: "Volume Discounts",
      description: "Up to 25% off on bulk orders"
    },
    {
      icon: Users,
      title: "Dedicated Account Manager",
      description: "Personal support for your business needs"
    },
    {
      icon: Truck,
      title: "Priority Delivery",
      description: "Same-day delivery for bulk orders"
    },
    {
      icon: Shield,
      title: "Credit Terms",
      description: "30-day payment terms available"
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Connect your procurement systems"
    },
    {
      icon: Building2,
      title: "Custom Solutions",
      description: "Tailored product packages"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-magware-purple to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">B2B Portal</h1>
            <p className="text-xl mb-8 text-purple-100">
              Join hundreds of construction companies and contractors who trust MAGWARE for their bulk hardware needs
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose MAGWARE B2B?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="bg-magware-purple/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-magware-purple" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">Register for B2B Account</CardTitle>
              <CardDescription>
                Get access to wholesale pricing and dedicated business support
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Registration Submitted!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for your interest. We'll review your application and contact you within 48 hours.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-magware-purple hover:bg-magware-purple-dark"
                  >
                    Submit Another Registration
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Masimba Construction" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPerson"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact Person *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. John Mukamuri" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+263 77X XXX XXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Address *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Full business address including city and postal code"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="businessType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select business type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="construction">Construction Company</SelectItem>
                                <SelectItem value="contractor">General Contractor</SelectItem>
                                <SelectItem value="electrical">Electrical Contractor</SelectItem>
                                <SelectItem value="plumbing">Plumbing Contractor</SelectItem>
                                <SelectItem value="hardware">Hardware Retailer</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="monthlyVolume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Monthly Order Volume (USD) *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select volume range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                                <SelectItem value="10000-25000">$10,000 - $25,000</SelectItem>
                                <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                                <SelectItem value="50000+">$50,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="taxNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Registration Number (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="VAT/Tax registration number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productsNeeded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Products Needed *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the main product categories or specific items you need regularly (e.g., power tools, building materials, solar equipment)..."
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-magware-purple hover:bg-magware-purple-dark py-6 text-lg"
                      disabled={submitRegistration.isPending}
                    >
                      {submitRegistration.isPending ? "Submitting..." : "Submit B2B Registration"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
