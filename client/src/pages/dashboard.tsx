import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PaymentModal } from "@/components/payment/payment-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, BookOpen, CreditCard, BarChart3, Settings } from "lucide-react";

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
              <h1 className="text-3xl font-bold text-secondary">Education Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.name}! Manage your educational programs and track student progress.
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
                    <span className="text-gray-600">Program Plan</span>
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
                    Expand Programs
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
                    data-testid="button-students"
                  >
                    <Users className="mr-3 h-4 w-4" />
                    Manage Students
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    data-testid="button-programs"
                  >
                    <BookOpen className="mr-3 h-4 w-4" />
                    View Programs
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Usage Stats */}
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Impact Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">142</div>
                      <p className="text-gray-600">Students Enrolled</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">8</div>
                      <p className="text-gray-600">Active Programs</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">94%</div>
                      <p className="text-gray-600">Completion Rate</p>
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
