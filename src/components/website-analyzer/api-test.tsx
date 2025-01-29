"use client"

import React, { useState } from "react"
import { AlertCircle, CheckCircle, Loader } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { analyzeSite } from "@/services/api"
import type { AnalyzeResponse } from "@/services/api"

export function ApiTest() {
  const [url, setUrl] = useState("https://example.com")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalyzeResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testApi = async () => {
    if (!url.trim()) {
      setError("Please enter a valid URL")
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await analyzeSite(url)
      console.debug("API Response:", {
        ...data,
        business: {
          ...data.business,
          name: data.business.name || "No name found",
          industry: data.business.industry || "Unknown industry",
        },
      })
      setResult(data)
    } catch (err) {
      console.error("API Test Error:", err)
      setError(err instanceof Error ? err.message : "Failed to analyze site")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Test Utility</h2>

        {/* Test Form */}
        <div className="flex gap-4">
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL to test"
            className="flex-1"
          />
          <Button
            onClick={testApi}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Test API"
            )}
          </Button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-2 text-red-400">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div>
                <h4 className="font-medium">Error</h4>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="space-y-4">
            <h3 className="font-medium">API Response</h3>

            {/* Business Info */}
            <div className="p-4 rounded-lg bg-white/5 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">
                  Business Name
                </h4>
                <p>{result.business.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Industry</h4>
                <p>{result.business.industry}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Contact</h4>
                <ul className="list-disc list-inside">
                  <li>Phone: {result.business.contact.phone || "N/A"}</li>
                  <li>Email: {result.business.contact.email || "N/A"}</li>
                  <li>Address: {result.business.contact.address || "N/A"}</li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Services</h4>
                <ul className="list-disc list-inside">
                  {result.business.services.map((service, index) => (
                    <li key={index}>{service.name}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">Hours</h4>
                <p>{result.business.hours.days}</p>
                <p>{result.business.hours.hours}</p>
                {result.business.hours.emergencyService && (
                  <p className="text-cyan-400">
                    24/7 Emergency Service Available
                  </p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-400">
                  Service Area
                </h4>
                <ul className="list-disc list-inside">
                  {result.business.serviceArea.regions.map((region, index) => (
                    <li key={index}>{region}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Metadata */}
            <div className="p-4 rounded-lg bg-white/5">
              <h4 className="text-sm font-medium text-gray-400 mb-2">
                Metadata
              </h4>
              <ul className="space-y-1 text-sm">
                <li>URL: {result.metadata.url}</li>
                <li>
                  Last Updated:{" "}
                  {new Date(result.metadata.lastUpdated).toLocaleString()}
                </li>
                <li>
                  Confidence: {(result.metadata.confidence * 100).toFixed(1)}%
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
