"use client"

import React from "react"
import { PhoneCall, CheckCircle } from "lucide-react"

export function HeroSection() {
  const benefits = [
    "Never miss another sales opportunity",
    "24/7 AI-powered call handling",
    "Instant lead capture & qualification",
  ]

  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto pt-24 pb-16 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <PhoneCall className="w-4 h-4 mr-2 text-cyan-400" />
              <span className="text-sm text-cyan-200">
                Never Miss A Call Again
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 text-transparent bg-clip-text leading-tight">
              Transform Missed Calls Into Captured Leads
            </h1>

            <p className="text-lg text-gray-400">
              Service Genie uses AI to handle your missed calls 24/7, ensuring
              every potential customer gets an immediate response and qualified
              leads land directly in your inbox.
            </p>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 mr-3 text-cyan-400" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border border-white/10 hover:bg-white/5 text-white rounded-lg font-medium transition-all">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-3xl blur-xl" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-6">
              <img
                src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&q=80"
                alt="Business Communication"
                className="rounded-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
