import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatar: string;
}

export function TestimonialCard({ quote, author, role, company, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <div className="relative bg-[#1A1642]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group-hover:border-cyan-500/50 transition-all duration-300">
        <div className="space-y-6">
          <div className="flex">
            {Array.from({ length: rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          
          <blockquote className="text-lg text-white/90">"{quote}"</blockquote>
          
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-md" />
              <img
                src={avatar}
                alt={author}
                className="relative w-full h-full object-cover rounded-full ring-2 ring-white/20"
              />
            </div>
            <div>
              <div className="font-semibold text-white">{author}</div>
              <div className="text-sm text-gray-400">{role} at {company}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}