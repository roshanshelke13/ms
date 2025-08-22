import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PaymentModal } from "@/components/payment/payment-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, Settings, CreditCard } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getSubscriptionBadge = (subscription: string) => {
    const badgeMap = {
      free: { label: "Free", variant: "secondary" as const },
      starter: { label: "Starter", variant: "default" as const },
      pro: { label: "Pro", variant: "default" as const },
    };
    
    return badgeMap[subscription as keyof typeof badgeMap] || badgeMap.free;
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-secondary">Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.name}! Here's your account overview.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* User Profile */}
              <Card data-testid="card-profile">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {user ? getInitials(user.name) : "U"}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-secondary" data-testid="text-user-name">
                        {user?.name}
                      </p>
                      <p className="text-gray-600" data-testid="text-user-email">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-edit-profile"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Subscription Status */}
              <Card data-testid="card-subscription">
                <CardHeader>
                  <CardTitle>Subscription</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Plan</span>
                    <Badge {...getSubscriptionBadge(user?.subscription || "free")}>
                      {getSubscriptionBadge(user?.subscription || "free").label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <Badge variant="outline" className="text-green-800 border-green-300">
                      Active
                    </Badge>
                  </div>
                  <Button
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full"
                    data-testid="button-upgrade"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Upgrade Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card data-testid="card-actions">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    data-testid="button-upload"
                  >
                    <Upload className="mr-3 h-4 w-4" />
                    Upload Files
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    data-testid="button-settings"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Usage Stats */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">5</div>
                      <p className="text-gray-600">Projects Created</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">2.4GB</div>
                      <p className="text-gray-600">Storage Used</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">12</div>
                      <p className="text-gray-600">API Requests Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      />
    </>
  );
}
