import React from 'react';
import { ApiKeyManager } from '@/components/admin/api-keys/api-key-manager';

export function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0A24] via-[#141034] to-[#1A1642]">
      <div className="max-w-6xl mx-auto py-16">
        <ApiKeyManager />
      </div>
    </div>
  );
}