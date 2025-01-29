import React from 'react';
import { PhoneCall, MessageSquare, BarChart2, Bot } from 'lucide-react';

const features = [
  {
    icon: PhoneCall,
    title: "24/7 Call Handling",
    description: "Never miss a call with our AI-powered virtual receptionist that works around the clock."
  },
  {
    icon: MessageSquare,
    title: "Smart Lead Qualification",
    description: "Automatically qualify leads and collect essential information before they reach your team."
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Track call patterns, conversion rates, and ROI with detailed analytics and reporting."
  },
  {
    icon: Bot,
    title: "AI-Powered Conversations",
    description: "Natural language processing ensures every caller gets a human-like experience."
  }
];

export function Features() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Businesses
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to capture, qualify, and convert more leads from your incoming calls.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}