import React from 'react';
import { SectionHeading } from '../ui/section-heading';
import { TestimonialCard } from './testimonials/testimonial-card';
import { testimonials } from './testimonials/testimonials-data';

export function TestimonialsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-[#0A0118]/50" id="testimonials">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="What Our Customers Say"
          description="Join hundreds of service businesses that never miss a call"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}