import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { PricingCard } from './pricing/pricing-card';
import { plans } from './pricing/pricing-data';

export function PricingSection() {
  return (
    <section className="py-24 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Simple, Transparent Pricing"
          description="Choose the perfect plan for your business needs"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
}