import React from 'react';

interface HeroFeatureIconProps {
  icon: string;
  title: string;
  description: string;
}

export function HeroFeatureIcon({ icon, title, description }: HeroFeatureIconProps) {
  return (
    <div className="group flex flex-col items-center text-center space-y-3">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="relative w-full h-full flex items-center justify-center text-3xl bg-[#1A1642]/80 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300">
          {icon}
        </div>
      </div>
      <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-sm text-gray-400 max-w-[180px]">{description}</p>
    </div>
  );
}