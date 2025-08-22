import { Shield, CreditCard, Code, Check } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Next.js and React",
    description: "Leverage the power of modern web technologies for building faster, more reliable applications with enhanced user experience.",
    features: ["Modern React patterns", "Server-side rendering", "Optimized performance"],
  },
  {
    icon: CreditCard,
    title: "Postgres and Drizzle ORM",
    description: "Robust database solution with an intuitive ORM for seamless data management and powerful query capabilities.",
    features: ["Type-safe queries", "Database migrations", "Relationship management"],
  },
  {
    icon: Code,
    title: "Stripe Integration",
    description: "Seamless payment processing and subscription management with industry-leading security and reliability.",
    features: ["Secure payments", "Subscription billing", "Webhook support"],
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Everything You Need to Launch
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built with modern technologies and essential integrations to get you from idea to production in days, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg card-hover"
              data-testid={`card-feature-${index}`}
            >
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="text-white text-2xl" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-secondary mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                {feature.features.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
