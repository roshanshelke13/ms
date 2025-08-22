// client/src/components/sections/hero-section.tsx
import React, { useState } from "react";
import eduImg from "@/assets/educational-resources.jpg"; // Vite import
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/auth-modal";
import { ArrowRight, Check } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleDeploy = () => {
    if (isAuthenticated) {
      setLocation("/dashboard");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s steps(2,start) infinite; }
      `}</style>

      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3">
                <h1 className="text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                  Transform Education
                  <span className="text-primary block">Through Technology</span>
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                  Empower NGOs and educational initiatives with comprehensive
                  management tools. Track students, manage programs, process
                  payments, and create meaningful impact.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button
                  onClick={handleDeploy}
                  className="gradient-bg text-white px-6 py-3 rounded-lg font-semibold text-base hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
                  data-testid="button-deploy"
                >
                  <span>{isAuthenticated ? "Go to Dashboard" : "Start Your Mission"}</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  className="btn-secondary px-5 py-3 rounded-lg font-semibold text-base"
                  data-testid="button-demo"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>NGO-focused</span>
                </div>
              </div>
            </div>

            {/* Right: image card — use object-contain so full image shows */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-50 to-white">
                {/* Taller container + center the image */}
                <div className="flex items-center justify-center h-72 md:h-96 lg:h-[520px] w-full bg-white">
                  {/* object-contain ensures the whole image is visible (no cropping) */}
                  <img
                    src={eduImg}
                    alt="Open book with icons representing ideas and learning"
                    className="max-w-full max-h-full object-contain"
                    style={{ display: "block" }}
                  />
                </div>

                {/* Metrics panel placed below the image within the card */}
                <div className="px-5 py-5 md:px-6 md:py-6">
                  <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-inner border">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 text-blue-600" fill="currentColor" aria-hidden>
                          <path d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.3 0-9.8 1.7-9.8 5v1.7h19.6V19.2c0-3.3-6.5-5-9.8-5z" />
                        </svg>
                      </div>

                      <div className="flex-1">
                        <div className="h-2.5 bg-slate-100 rounded-full w-24 mb-2" />
                        <div className="h-2.5 bg-slate-100 rounded-full w-16" />
                      </div>
                    </div>

                    <div className="mt-3 md:mt-4 grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-xl md:text-2xl font-bold text-slate-900">1.2k</div>
                        <div className="text-xs text-slate-500">Students</div>
                      </div>

                      <div>
                        <div className="text-xl md:text-2xl font-bold text-slate-900">42</div>
                        <div className="text-xs text-slate-500">Programs</div>
                      </div>

                      <div>
                        <div className="text-xl md:text-2xl font-bold text-slate-900">₹1.3M</div>
                        <div className="text-xs text-slate-500">Donations</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-6 bg-white px-3 py-1 rounded-full shadow border text-sm text-slate-600">
                Trusted by NGOs · Pilot-ready
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} mode="signup" onModeChange={() => {}} />
    </>
  );
};

export default HeroSection;
