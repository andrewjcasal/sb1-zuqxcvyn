import React from 'react';

interface ResultCardProps {
  title: string;
  content: React.ReactNode;
}

export function ResultCard({ title, content }: ResultCardProps) {
  return (
    <div className="bg-white/5 border border-purple-500/20 rounded-xl p-4">
      <h3 className="text-lg font-medium text-purple-200 mb-3">{title}</h3>
      <div className="text-gray-300">{content}</div>
    </div>
  );
}