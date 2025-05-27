import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Building2, Users, TrendingUp, Clock, CheckCircle, Webhook } from "lucide-react";

const bulkOrderSchema = z.object({
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  monthlyVolume: z.string().min(1, "Monthly volume is required"),
  productsNeeded: z.string().min(10, "Please describe the products you need"),
});

export default function B2BPortal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
