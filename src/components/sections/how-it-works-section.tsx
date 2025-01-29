import React from 'react';
import { PhoneCall, MessageSquare, BarChart2, Bot } from 'lucide-react';
import { SectionHeading } from '../ui/section-heading';

const steps = [
  {
    icon: PhoneCall,
    title: "Forward Your Calls",
    description: "Seamlessly route your existing business phone number through our system."
  },
  {
    icon: MessageSquare,
    title: "We Answer Every Inquiry",
    description: "Our platform ensures every call is either answered live by your team or automatically handled if you're unavailable."
  },
  {
    icon: BarChart2,
    title: "Capture and Notify",
    description: "Caller information is instantly logged, and notifications are pushed via email or SMS."
  },
  {
    icon: Bot,
    title: "Book Appointments",
    description: "Service Genie can automatically schedule appointments and send quotes based on your availability."
  }
];

export function HowItWorksSection() {
  return (
    <section className="py-24 px-4" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Simple, Automated, and Effective"
          description="Get started in minutes and never miss another opportunity"
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                <step.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}