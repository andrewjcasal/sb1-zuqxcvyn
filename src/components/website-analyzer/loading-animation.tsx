import React from 'react';

export function LoadingAnimation() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative w-16 h-16 mx-auto border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="text-lg text-cyan-200">
        Processing service details...
      </p>
    </div>
  );
}