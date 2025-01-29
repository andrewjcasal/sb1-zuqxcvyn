import React from 'react';
import { MapPin, Clock, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface BusinessDetailsProps {
  data: {
    business: {
      name: string;
      industry: string;
      contact: {
        phone?: string;
        email?: string;
        address?: string;
      };
      services: Array<{
        name: string;
        description: string;
      }>;
      hours: {
        days: string;
        hours: string;
        emergencyService?: boolean;
      };
      serviceArea: {
        regions: string[];
        radius?: string;
      };
    };
  };
  onContinue?: () => void;
}

export function BusinessDetails({ data, onContinue }: BusinessDetailsProps) {
  const { business } = data;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold text-cyan-300 mb-2">
          {business.name}
        </h3>
        <p className="text-gray-400">
          {business.industry}
        </p>
      </div>

      <div className="space-y-4">
        {/* Contact Information */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-3">Contact Details</h4>
          <div className="space-y-2">
            {business.contact.phone && (
              <div className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3 text-cyan-400" />
                {business.contact.phone}
              </div>
            )}
            {business.contact.email && (
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3 text-cyan-400" />
                {business.contact.email}
              </div>
            )}
            {business.contact.address && (
              <div className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3 text-cyan-400" />
                {business.contact.address}
              </div>
            )}
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="flex items-center text-lg font-medium text-white mb-2">
            <Clock className="w-5 h-5 mr-2 text-cyan-400" />
            Business Hours
          </h4>
          <div className="space-y-1">
            <p className="text-gray-300">{business.hours.days}</p>
            <p className="text-gray-300">{business.hours.hours}</p>
            {business.hours.emergencyService && (
              <p className="text-cyan-400 mt-2">24/7 Emergency Service Available</p>
            )}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-3">Services</h4>
          <div className="space-y-3">
            {business.services.map((service, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-3 mt-1 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-200">{service.name}</div>
                  {service.description && (
                    <p className="text-sm text-gray-400">{service.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Area */}
        <div className="bg-white/5 rounded-lg p-4">
          <h4 className="text-lg font-medium text-white mb-2">Service Area</h4>
          <div className="flex flex-wrap gap-2">
            {business.serviceArea.regions.map((region, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm"
              >
                {region}
              </span>
            ))}
          </div>
          {business.serviceArea.radius && (
            <p className="text-gray-300 mt-2">Coverage radius: {business.serviceArea.radius}</p>
          )}
        </div>
      </div>

      {onContinue && (
        <Button
          onClick={onContinue}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
        >
          Continue
        </Button>
      )}
    </div>
  );
}