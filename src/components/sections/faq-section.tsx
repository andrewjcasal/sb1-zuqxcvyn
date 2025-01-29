import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { FaqItem } from './faq/faq-item';
import { faqItems } from './faq/faq-data';

export function FaqSection() {
  return (
    <section className="py-24 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          description="Find answers to common questions about Service Genie"
        />

        <div className="mt-16 space-y-4">
          {faqItems.map((item, index) => (
            <FaqItem
              key={index}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}