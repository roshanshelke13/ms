import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for getting started",
    price: "₹999",
    amount: "999",
    features: ["5 Projects", "Basic Support", "10GB Storage"],
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Most popular choice",
    price: "₹1999",
    amount: "1999",
    features: ["Unlimited Projects", "Priority Support", "100GB Storage", "Advanced Analytics"],
    popular: true,
  },
];

export const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const { refetchUser } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan) return;

    setIsProcessing(true);
    try {
      // Create payment order
      const response = await apiRequest("POST", "/api/v1/payment/capturePayment", {
        plan: plan.id,
        amount: plan.amount,
      });

      const result = await response.json();

      if (result.success) {
        // In a real implementation, you would integrate with Razorpay here
        // For now, we'll simulate a successful payment
        
        // Simulate Razorpay payment process
        setTimeout(async () => {
          try {
            // Verify payment
            await apiRequest("POST", "/api/v1/payment/verify", {
              razorpayOrderId: result.payment.razorpayOrderId,
              razorpayPaymentId: "pay_" + Date.now(),
              plan: plan.id,
            });

            await refetchUser();
            onClose();
            
            toast({
              title: "Payment Successful!",
              description: `You have successfully upgraded to ${plan.name}`,
            });
          } catch (error: any) {
            toast({
              title: "Payment Verification Failed",
              description: error.message || "Please contact support",
              variant: "destructive",
            });
          }
        }, 2000);
      } else {
        throw new Error(result.message || "Payment initiation failed");
      }
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">Upgrade Your Plan</DialogTitle>
          <p className="text-center text-gray-600">
            Choose a plan that works for you
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? "border-primary bg-orange-50"
                  : "border-gray-200 hover:border-primary"
              } ${plan.popular ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
              data-testid={`card-plan-${plan.id}`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      {plan.popular && (
                        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-secondary">{plan.price}</p>
                    <p className="text-gray-600 text-sm">/month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isProcessing}
            data-testid="button-cancel-payment"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            className="flex-1"
            disabled={isProcessing}
            data-testid="button-proceed-payment"
          >
            {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isProcessing ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
