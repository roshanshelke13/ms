import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/auth-modal";
import { ArrowRight, Check } from "lucide-react";

export const HeroSection = () => {
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
      <section className="relative py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                  Build Your SaaS
                  <span className="text-primary block">Faster Than Ever</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Launch your SaaS product in record time with our powerful, 
                  ready-to-use template. Packed with modern technologies and 
                  essential integrations.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleDeploy}
                  className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all inline-flex items-center justify-center space-x-2"
                  data-testid="button-deploy"
                >
                  <span>{isAuthenticated ? "Go to Dashboard" : "Deploy your own"}</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="btn-secondary px-8 py-4 rounded-lg font-semibold text-lg"
                  data-testid="button-demo"
                >
                  View Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Open source</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="terminal-bg rounded-xl p-6 shadow-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-green-400 font-mono space-y-3 text-sm">
                  <div>$ git clone https://github.com/nextjs/saas-starter</div>
                  <div>$ pnpm install</div>
                  <div>$ pnpm db:setup</div>
                  <div>$ pnpm db:migrate</div>
                  <div>$ pnpm db:seed</div>
                  <div className="flex items-center">
                    $ pnpm dev 
                    <span className="ml-2 border-r-2 border-green-400 animate-blink"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode="signup"
        onModeChange={() => {}}
      />
    </>
  );
};
