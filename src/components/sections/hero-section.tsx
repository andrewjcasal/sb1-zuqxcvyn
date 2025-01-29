"use client"

import React, { useState } from "react"
import { Button } from "../ui/button"
import { HeroFeatureIcon } from "./hero/hero-feature-icon"
import { heroFeatures } from "./hero/hero-features"
import { AnalyzerModal } from "../website-analyzer/analyzer-modal"

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="relative pt-32 pb-24 px-4">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        <div className="space-y-8 mb-16">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Turn Missed Calls
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Into Booked Jobs
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Focus on growing your business while we handle incoming calls—never
            miss a lead again.
          </p>

          <Button
            size="lg"
            className="h-14 px-12 text-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Try it Now
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {heroFeatures.map((feature, index) => (
            <HeroFeatureIcon
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      <AnalyzerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
