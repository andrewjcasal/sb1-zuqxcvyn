import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../../ui/button';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export function PricingCard({ name, price, features, popular }: PricingCardProps) {
  return (
    <div className={`relative ${popular ? 'scale-105' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl" />
      <div className="relative bg-white/5 border border-white/10 rounded-xl p-8 hover:border-cyan-500/50 transition-all">
        {popular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </span>
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold">${price}</span>
          {price !== "Custom" && <span className="text-gray-400">/month</span>}
        </div>
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-300">
              <Check className="w-5 h-5 mr-3 text-cyan-400" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full">Get Started</Button>
      </div>
    </div>
  );
}