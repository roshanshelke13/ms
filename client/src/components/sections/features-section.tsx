import { GraduationCap, Users, BarChart3, Check } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Student Management",
    description: "Comprehensive student tracking system with enrollment, attendance, and progress monitoring designed specifically for NGO education programs.",
    features: ["Student enrollment", "Attendance tracking", "Progress reports"],
  },
  {
    icon: GraduationCap,
    title: "Program Administration",
    description: "Powerful tools to manage educational programs, curriculum, and resources with streamlined workflows for NGO operations.",
    features: ["Curriculum planning", "Resource allocation", "Teacher management"],
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Data-driven insights and comprehensive reporting to demonstrate educational impact and support funding applications.",
    features: ["Performance metrics", "Impact reports", "Donor dashboards"],
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Empowering Educational Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete suite of tools designed specifically for NGOs to manage educational programs, track student progress, and demonstrate meaningful impact.
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
