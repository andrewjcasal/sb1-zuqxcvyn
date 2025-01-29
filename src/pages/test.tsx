import React from 'react';
import { ApiTest } from '@/components/website-analyzer/api-test';

export function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0A24] via-[#141034] to-[#1A1642] text-white py-12">
      <ApiTest />
    </div>
  );
}