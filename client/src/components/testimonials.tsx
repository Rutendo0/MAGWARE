import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Mukamuri",
    role: "Site Manager, Masimba Holdings",
    initials: "JM",
    rating: 5,
    text: "MAGWARE has been our go-to supplier for 3 years. Their bulk pricing and quick delivery help us stay on schedule with all our projects."
  },
  {
    name: "Sarah Phiri", 
    role: "Electrical Contractor",
    initials: "SP",
    rating: 5,
    text: "Excellent quality tools at competitive prices. The solar packages are comprehensive and installation was professional."
  },
  {
    name: "David Mpofu",
    role: "Procurement Manager", 
    initials: "DM",
    rating: 5,
    text: "Their B2B portal saves us hours every month. The API integration with our procurement system is seamless."
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h3>
          <p className="text-xl text-magware-gray">Trusted by professionals across Zimbabwe</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-magware-purple rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-magware-gray">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
