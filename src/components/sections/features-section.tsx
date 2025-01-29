import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { FeatureCard } from './features/feature-card';
import { features } from './features/features-data';

export function FeaturesSection() {
  return (
    <section className="py-24 px-4" id="features">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Powerful Features Built for Service Pros"
          description="Everything you need to capture, qualify, and convert more leads from your incoming calls"
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}