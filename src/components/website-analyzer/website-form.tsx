"use client"

import React, { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Globe, Phone } from "lucide-react"
import { validateUrl } from "@/utils/validation"
import { normalizeUrl } from "@/utils/url"
import { analyzeSite } from "@/services/api"
import { formatPhoneE164 } from "@/utils/phone"

interface WebsiteFormProps {
  onSubmit: (data: { url: string; phone: string }) => void
  isLoading: boolean
}

export function WebsiteForm({ onSubmit, isLoading }: WebsiteFormProps) {
  const [url, setUrl] = useState("")
  const [phone, setPhone] = useState("")
  const [errors, setErrors] = useState<{ url?: string; phone?: string }>({})

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "")

    // Format the phone number as user types
    if (digits.length <= 3) {
      return digits
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    } else if (digits.length <= 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    }
    // If more than 10 digits, don't add more formatting
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(
      6,
      10
    )}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedNumber = formatPhoneNumber(e.target.value)
    setPhone(formattedNumber)
    setErrors((prev) => ({ ...prev, phone: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { url?: string; phone?: string } = {}

    // Validate URL
    if (!validateUrl(url)) {
      newErrors.url = "Please enter a valid website URL"
    }

    // Validate phone
    try {
      formatPhoneE164(phone)
    } catch (error) {
      newErrors.phone =
        error instanceof Error
          ? error.message
          : "Please enter a valid phone number"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Normalize the URL and format the phone number before submitting
      const normalizedUrl = normalizeUrl(url)
      const formattedPhone = formatPhoneE164(phone)
      onSubmit({ url: normalizedUrl, phone: formattedPhone })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setErrors((prev) => ({ ...prev, url: undefined }))
            }}
            className={`pl-10 ${
              errors.url ? "border-red-500" : "border-white/20"
            } bg-white/10 text-white placeholder:text-gray-400`}
            disabled={isLoading}
          />
        </div>
        {errors.url && <p className="text-sm text-red-400">{errors.url}</p>}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="tel"
            placeholder="(555) 555-5555"
            value={phone}
            onChange={handlePhoneChange}
            className={`pl-10 ${
              errors.phone ? "border-red-500" : "border-white/20"
            } bg-white/10 text-white placeholder:text-gray-400`}
            disabled={isLoading}
          />
        </div>
        {errors.phone && <p className="text-sm text-red-400">{errors.phone}</p>}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            Analyzing...
          </div>
        ) : (
          "Analyze Website"
        )}
      </Button>
    </form>
  )
}
