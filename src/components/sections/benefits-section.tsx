import React from 'react';
import { Shield, Clock, BarChart2 } from 'lucide-react';
import { SectionHeading } from '../ui/section-heading';

const benefits = [
  {
    icon: Shield,
    title: '24/7 Call Coverage',
    description: 'Service Genie ensures no call goes unanswered, even on nights and weekends.'
  },
  {
    icon: Clock,
    title: 'Instant Lead Capture',
    description: 'Every inbound call is automatically logged, so you never scramble for missed opportunities.'
  },
  {
    icon: BarChart2,
    title: 'Increased Revenue',
    description: 'More answered calls mean more booked jobs, leading to higher profits for your service business.'
  }
];

export function BenefitsSection() {
  return (
    <section className="py-24 px-4" id="benefits">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Why Choose Service Genie?"
          description="Maximize your business potential with our intelligent call handling solution"
        />

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <benefit.icon className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}