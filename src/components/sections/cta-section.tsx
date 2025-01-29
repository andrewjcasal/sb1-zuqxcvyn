import React from 'react';
import { CtaCard } from './cta/cta-card';
import { ctaFeatures } from './cta/cta-features';

export function CtaSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <CtaCard features={ctaFeatures} />
      </div>
    </section>
  );
}