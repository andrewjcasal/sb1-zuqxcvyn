"use client"

import React from "react"

interface HeroFeatureIconProps {
  icon: string
  title: string
  description: string
}

export function HeroFeatureIcon({
  icon,
  title,
  description,
}: HeroFeatureIconProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}
