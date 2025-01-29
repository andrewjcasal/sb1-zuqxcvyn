import React from 'react';
import { HeroSection } from '../components/sections/hero-section';
import { BenefitsSection } from '../components/sections/benefits-section';
import { FeaturesSection } from '../components/sections/features-section';
import { TestimonialsSection } from '../components/sections/testimonials-section';
import { PricingSection } from '../components/sections/pricing-section';
import { FaqSection } from '../components/sections/faq-section';
import { CtaSection } from '../components/sections/cta-section';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <BenefitsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}