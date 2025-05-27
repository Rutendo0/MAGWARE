import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Building2, Users, TrendingUp, Clock, CheckCircle, Webhook, ArrowLeft, CreditCard, Truck, Shield, Zap, Settings, Mail, Database } from "lucide-react";

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
  const [location, setLocation] = useLocation();
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
      icon: Database,
      title: "ERP Integration",
      description: "SAP, QuickBooks, Coupa connectivity"
    },
    {
      icon: Settings,
      title: "PunchOut Catalog",
      description: "Direct procurement system integration"
    },
    {
      icon: Mail,
      title: "Email-to-Order",
      description: "Automated order processing from emails"
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
    }
  ];

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
            <h1 className="text-6xl font-bold mb-8 text-white drop-shadow-2xl">Business Portal</h1>
            <p className="text-2xl mb-10 text-white font-semibold leading-relaxed drop-shadow-lg max-w-4xl mx-auto">
              Join hundreds of construction companies and contractors across Zimbabwe who trust MAGWARE for their bulk hardware procurement needs
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

      {/* Procurement Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Streamlined Procurement Integration</h2>
            <p className="text-xl text-gray-600">
              Connect your existing procurement systems seamlessly with MAGWARE's automated ordering platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <CardContent>
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">ERP System Integration</h3>
                <p className="text-gray-600 mb-4">Direct connection to SAP, Oracle, QuickBooks, and other enterprise systems</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Real-time inventory sync</li>
                  <li>• Automated purchase orders</li>
                  <li>• Budget approval workflows</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Email-to-Order Automation</h3>
                <p className="text-gray-600 mb-4">Send orders via email and let our system process them automatically</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Smart order parsing</li>
                  <li>• Automatic price calculations</li>
                  <li>• Instant order confirmations</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">PunchOut Catalog</h3>
                <p className="text-gray-600 mb-4">Browse and order directly from your procurement platform</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Coupa integration ready</li>
                  <li>• Ariba network compatible</li>
                  <li>• Custom catalog configurations</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-magware-purple/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-magware-purple">1</span>
                </div>
                <h4 className="font-semibold mb-2">Connect Systems</h4>
                <p className="text-gray-600">We integrate with your existing procurement workflow using industry-standard APIs</p>
              </div>
              <div className="text-center">
                <div className="bg-magware-purple/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-magware-purple">2</span>
                </div>
                <h4 className="font-semibold mb-2">Automate Orders</h4>
                <p className="text-gray-600">Orders flow automatically from your system to ours, with real-time confirmations</p>
              </div>
              <div className="text-center">
                <div className="bg-magware-purple/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-magware-purple">3</span>
                </div>
                <h4 className="font-semibold mb-2">Fast Fulfillment</h4>
                <p className="text-gray-600">Same-day processing and delivery for all integrated bulk orders</p>
              </div>
            </div>
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