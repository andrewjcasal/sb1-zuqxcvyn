import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  className?: string;
  asLink?: boolean;
}

export function Logo({ className = '', asLink = false }: LogoProps) {
  const LogoContent = (
    <div className={`flex items-center gap-2 ${className}`}>
      <Sparkles className="h-8 w-8 text-cyan-400" />
      <span className="text-xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 text-transparent bg-clip-text">
        Service Genie
      </span>
    </div>
  );

  return LogoContent;
}