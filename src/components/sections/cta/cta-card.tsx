import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../../ui/button';

interface CtaCardProps {
  features: string[];
}

export function CtaCard({ features }: CtaCardProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl" />
      <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">Ready to Never Miss a Call?</h3>
            <p className="text-gray-400">
              Start capturing more leads and growing your business today with our 14-day free trial.
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-3 text-cyan-400" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <Button size="lg" className="w-full">Start Free Trial</Button>
            <p className="text-center text-sm text-gray-400">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}