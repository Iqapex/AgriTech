import { useState } from 'react';
import { CheckCircle2, Star, Zap, HeartPulse, BadgeCheck } from 'lucide-react';

const PremiumPage = () => {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handleSubscription = async (planType: 'monthly' | 'yearly') => {
    setLoadingPlan(planType);
    
    try {
      const amount = planType === 'monthly' ? 2900 : 24900;
      
      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          planType
        })
      });

      const orderData = await orderResponse.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MediCare Pro',
        description: `${planType} Subscription`,
        order_id: orderData.id,
        handler: async (response: any) => {
          const verificationResponse = await fetch('/api/payments/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          const verificationData = await verificationResponse.json();
          if (verificationData.status === 'success') {
            alert('Subscription activated successfully!');
            // Redirect user or update global state
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: { color: '#2563eb' }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="text-center pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-6">
            <Zap className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-medium text-green-600">Join 5000+ Trusted Farmers Worldwide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium AgreTech Plans
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the plan that best fits your needs and get instant access to top specialists.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Basic Care</h3>
              <div className="my-6">
                <span className="text-4xl font-bold text-gray-900">Free</span>
              </div>
              <button 
                className="w-full bg-blue-50 text-green-600 py-3 rounded-lg cursor-default"
                disabled
              >
                Current Plan
              </button>
            </div>
            <div className="space-y-4">
              <FeatureItem text="2 Consultations/Month" />
              <FeatureItem text="Email Support" />
              <FeatureItem text="Basic Health Tracking" />
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-green-200">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <BadgeCheck className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-green-600">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Care</h3>
              <div className="my-6">
                <span className="text-4xl font-bold text-gray-900">₹299</span>
                <span className="text-gray-500 ml-2">/ month</span>
              </div>
              <button
                onClick={() => handleSubscription('monthly')}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50"
                disabled={loadingPlan === 'monthly'}
              >
                {loadingPlan === 'monthly' ? 'Processing...' : 'Start Free Trial'}
              </button>
            </div>
            <div className="space-y-4">
              <FeatureItem text="10 Consultations/Month" checked />
              <FeatureItem text="24/7 Priority Support" checked />
              <FeatureItem text="Advanced Analytics" checked />
            </div>
          </div>

          {/* Yearly Plan */}
          <div className="bg-green-900 text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 text-sm font-medium transform rotate-45 translate-x-8 -translate-y-2">
              Save 30%
            </div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <HeartPulse className="w-6 h-6 text-white" />
                <span className="text-sm font-medium">Best Value</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Annual Care</h3>
              <div className="my-6">
                <span className="text-4xl font-bold">₹2,999</span>
                <span className="text-green-300 ml-2">/ year</span>
              </div>
              <button
                onClick={() => handleSubscription('yearly')}
                className="w-full bg-yellow-400 text-green-900 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium disabled:opacity-50"
                disabled={loadingPlan === 'yearly'}
              >
                {loadingPlan === 'yearly' ? 'Processing...' : 'Get Full Access'}
              </button>
            </div>
            <div className="space-y-4">
              <FeatureItem text="Unlimited Consultations" checked white />
              <FeatureItem text="VIP Priority Queue" checked white />
              <FeatureItem text="Personal Health Assistant" checked white />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ text, checked = true, white = false }: { 
  text: string; 
  checked?: boolean;
  white?: boolean;
}) => (
  <div className="flex items-center">
    {checked ? (
      <CheckCircle2 className={`w-5 h-5 mr-3 ${white ? 'text-white' : 'text-green-500'}`} />
    ) : (
      <span className="w-5 h-5 mr-3 text-gray-300">•</span>
    )}
    <span className={white ? 'text-green-50' : 'text-gray-700'}>{text}</span>
  </div>
);

export default PremiumPage;