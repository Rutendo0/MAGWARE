import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { CheckCircle } from "lucide-react";

const quickQuoteSchema = z.object({
  contactPerson: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  monthlyVolume: z.string().min(1),
  productsNeeded: z.string().min(10),
});

export default function B2BSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof quickQuoteSchema>>({
    resolver: zodResolver(quickQuoteSchema),
    defaultValues: {
      contactPerson: "",
      email: "",
      phone: "",
      monthlyVolume: "",
      productsNeeded: "",
    },
  });

  const submitQuickQuote = useMutation({
    mutationFn: async (data: z.infer<typeof quickQuoteSchema>) => {
      const response = await apiRequest("POST", "/api/bulk-orders", data);
      return response.json();
    },
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Quote Request Submitted",
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

  const onSubmit = (data: z.infer<typeof quickQuoteSchema>) => {
    submitQuickQuote.mutate(data);
  };

  return (
    <section className="py-16 bg-magware-purple text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-5xl font-bold mb-8 text-white drop-shadow-2xl">Business Solutions for Construction Companies</h3>
            <p className="text-2xl mb-10 text-white font-medium leading-relaxed drop-shadow-lg">
              Get exclusive wholesale pricing and automated procurement for construction companies. 
              Seamlessly integrate with your existing systems like SAP, QuickBooks, and Coupa for effortless ordering.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CheckCircle className="text-yellow-400 mr-5 h-7 w-7 flex-shrink-0" />
                <span className="text-xl font-semibold text-white">Volume discounts up to 25% off</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CheckCircle className="text-yellow-400 mr-5 h-7 w-7 flex-shrink-0" />
                <span className="text-xl font-semibold text-white">SAP, QuickBooks & Coupa integration</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CheckCircle className="text-yellow-400 mr-5 h-7 w-7 flex-shrink-0" />
                <span className="text-xl font-semibold text-white">PunchOut catalog support</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CheckCircle className="text-yellow-400 mr-5 h-7 w-7 flex-shrink-0" />
                <span className="text-xl font-semibold text-white">Email-to-order automation</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CheckCircle className="text-yellow-400 mr-5 h-7 w-7 flex-shrink-0" />
                <span className="text-xl font-semibold text-white">Same-day delivery for bulk orders</span>
              </div>
              <div className="flex items-center bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                <CheckCircle className="text-yellow-400 mr-5 h-7 w-7 flex-shrink-0" />
                <span className="text-xl font-semibold text-white">30-day credit terms available</span>
              </div>
            </div>

            <Link href="/b2b-portal">
              <Button 
                size="lg"
                className="bg-yellow-500 text-black hover:bg-yellow-400 font-semibold px-8"
              >
                Register for B2B Account
              </Button>
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            {isSubmitted ? (
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h4 className="text-2xl font-bold mb-4">Request Submitted!</h4>
                <p className="text-purple-100 mb-6">
                  Thank you for your interest. We'll contact you within 24 hours.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <>
                <h4 className="text-2xl font-bold mb-6">Quick Bulk Quote Request</h4>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Contact Person</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. John Mukamuri" 
                              className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-yellow-400"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="email@company.com" 
                              className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-yellow-400"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Phone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="+263 77X XXX XXX" 
                              className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-yellow-400"
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="monthlyVolume"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Monthly Order Volume (USD)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/20 border-white/30 text-white">
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
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productsNeeded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Products Needed</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List the main product categories or specific items you need regularly..."
                              rows={3}
                              className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-yellow-400"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-semibold"
                      disabled={submitQuickQuote.isPending}
                    >
                      {submitQuickQuote.isPending ? "Submitting..." : "Request Quote & Setup Meeting"}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
