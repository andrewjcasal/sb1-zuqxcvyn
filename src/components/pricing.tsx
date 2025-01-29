import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: "49",
    features: [
      "Up to 100 calls/month",
      "Basic lead qualification",
      "Email notifications",
      "Standard support"
    ]
  },
  {
    name: "Professional",
    price: "99",
    popular: true,
    features: [
      "Up to 500 calls/month",
      "Advanced lead qualification",
      "Real-time notifications",
      "Priority support",
      "Custom call scripts"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited calls",
      "Custom AI training",
      "API access",
      "24/7 dedicated support",
      "Custom integration"
    ]
  }
];

export function Pricing() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl" />
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all">
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-400">/month</span>}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 mr-3 text-cyan-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}