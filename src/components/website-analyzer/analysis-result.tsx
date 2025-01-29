import React from 'react';
import { FirecrawlResponse } from '@/services/firecrawl';
import { Clock, MapPin, Phone, Mail, Award, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import { validateBusinessData } from '@/utils/business';
import { Button } from '../ui/button';

interface AnalysisResultProps {
  data: FirecrawlResponse;
  onContinue: () => void;
}

export function AnalysisResult({ data, onContinue }: AnalysisResultProps) {
  const business = validateBusinessData(data.business);

  const renderSection = (title: string, content: React.ReactNode, icon?: React.ReactNode) => (
    <div className="bg-white/10 rounded-lg p-4 transition-all duration-300 hover:bg-white/20">
      {icon && title && (
        <div className="flex items-center mb-3">
          {icon}
          <h3 className="text-lg font-medium text-cyan-300 ml-2">{title}</h3>
        </div>
      )}
      {content}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-cyan-300">
          Analysis Complete
        </h3>
        <p className="text-gray-300 mt-2">
          Here's what we found about your business
        </p>
      </div>

      <div className="max-h-[50vh] overflow-y-auto space-y-4 pr-2">
        {/* Business Info */}
        {renderSection('', (
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {business.name}
            </h3>
            <p className="text-cyan-400">{business.industry}</p>
          </div>
        ))}

        {/* Services */}
        {renderSection('Services', (
          <div className="space-y-2">
            {business.services.map((service, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-white">{service.name}</h4>
                  <p className="text-gray-300 text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Contact & Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderSection('Contact', (
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-cyan-400" />
                {business.contact.phone}
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                {business.contact.email}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                {business.contact.address}
              </div>
            </div>
          ))}

          {renderSection('Hours', (
            <div className="space-y-2">
              <p className="text-gray-300">{business.hours.days}</p>
              <p className="text-gray-300">{business.hours.hours}</p>
              {business.hours.emergencyService && (
                <p className="text-cyan-400">24/7 Emergency Service Available</p>
              )}
            </div>
          ))}
        </div>

        {/* Service Area */}
        {renderSection('Coverage Area', (
          <div>
            <div className="flex flex-wrap gap-2">
              {business.serviceArea.regions.map((region, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
            {business.serviceArea.radius && (
              <p className="text-gray-300 mt-2">
                Coverage radius: {business.serviceArea.radius}
              </p>
            )}
          </div>
        ))}
      </div>

      <Button
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        Create AI Voice Agent
      </Button>
    </div>
  );
}