import React from 'react';

interface SectionHeadingProps {
  title: string;
  description: string;
  alignment?: 'left' | 'center';
}

export function SectionHeading({ 
  title, 
  description, 
  alignment = 'center' 
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${alignment === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-gray-400 text-lg">{description}</p>
    </div>
  );
}