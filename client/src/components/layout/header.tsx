import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/auth-modal";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuth = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const handleDashboard = () => {
    setLocation("/dashboard");
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2" data-testid="link-home">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-bold text-secondary">EduConnect</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-primary transition-colors" data-testid="link-features">
                Programs
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors" data-testid="link-pricing">
                Plans
              </a>
              <a href="#docs" className="text-gray-600 hover:text-primary transition-colors" data-testid="link-docs">
                Resources
              </a>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleDashboard}
                    className="text-gray-600 hover:text-primary transition-colors font-medium"
                    data-testid="button-dashboard"
                  >
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-primary transition-colors font-medium"
                    data-testid="button-logout"
                  >
                    Logout
                  </Button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 hidden sm:block">
                      {user?.name}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleAuth("login")}
                    className="text-gray-600 hover:text-primary transition-colors font-medium"
                    data-testid="button-signin"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => handleAuth("signup")}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    data-testid="button-signup"
                  >
                    Sign Up
                  </Button>
                </>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-primary transition-colors">
                  Programs
                </a>
                <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">
                  Plans
                </a>
                <a href="#docs" className="text-gray-600 hover:text-primary transition-colors">
                  Resources
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};
