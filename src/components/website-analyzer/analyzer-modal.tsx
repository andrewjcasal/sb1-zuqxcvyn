import React, { useState } from 'react';
import { X } from 'lucide-react';
import { WebsiteForm } from './website-form';
import { LoadingAnimation } from './loading-animation';
import { BusinessDetails } from './business-details';
import { ErrorDisplay } from './error-display';
import { analyzeSite } from "@/services/api"
import { CallDemo } from './call-demo';
import { APIError } from '@/utils/errors';

interface AnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyzerModal({ isOpen, onClose }: AnalyzerModalProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businessData, setBusinessData] = useState<any>(null)

  const handleSubmit = async (data: { url: string; phone: string }) => {
    setIsAnalyzing(true)
    setError(null)
    setBusinessData(null)

    try {
      const result = await analyzeSite(data.url)
      setBusinessData({
        ...result,
        contact: {
          ...result.business.contact,
          phone: data.phone,
        },
      })
    } catch (err) {
      console.error("Analysis error:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze website")
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1A1642] to-[#141034] rounded-2xl shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {isAnalyzing ? (
            <LoadingAnimation />
          ) : error ? (
            <ErrorDisplay error={error} onRetry={() => setError(null)} />
          ) : businessData ? (
            businessData.business ? (
              <CallDemo
                business={businessData.business}
                phoneNumber={businessData.contact?.phone}
              />
            ) : (
              <BusinessDetails data={businessData} />
            )
          ) : (
            <WebsiteForm onSubmit={handleSubmit} isLoading={isAnalyzing} />
          )}
        </div>
      </div>
    </div>
  )
}