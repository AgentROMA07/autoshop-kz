'use client';

import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { getBrandConfig } from '@/lib/brand';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

interface ContactSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
  withTitle?: boolean;
}

export function ContactSection({ dictionary, withTitle = true }: ContactSectionProps) {
  const content = dictionary.contact;
  const brand = getBrandConfig();

  return (
    <section className="py-24 bg-[#0B0B0D]" id="contact">
      <Container>
        {withTitle && (
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">{content.title}</h2>
            </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="h-full border border-white/10 bg-[#16161A] shadow-none">
                <CardContent className="p-8 md:p-10 space-y-10 flex flex-col justify-center h-full">
                    <div className="flex items-start space-x-6">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-1">{content.form_phone}</h3>
                            <p className="text-2xl font-bold text-white">{brand.contact.phone}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start space-x-6">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-1">{dictionary.nav.contacts}</h3>
                            <p className="text-xl text-white font-medium leading-relaxed">{brand.contact.address}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-6">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-1">{content.workingHoursLabel}</h3>
                            <p className="text-xl text-white font-medium">{content.workingHoursValue}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-6">
                        <div className="bg-primary/10 p-4 rounded-xl text-primary shrink-0">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-neutral-400 mb-1">{content.emailLabel}</h3>
                            <p className="text-xl text-white font-medium">{brand.contact.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
          </div>

          <div className="w-full h-[400px] lg:h-auto min-h-[400px] bg-[#16161A] rounded-2xl overflow-hidden relative border border-white/10">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="map" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?width=100%25&height=600&hl=ru&q=42.350449,69.635514&ie=UTF8&t=&z=16&iwloc=B&output=embed"
              style={{ filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.8)' }}
              className="absolute inset-0"
            ></iframe>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
              <a
                href={brand.contact.mapLink}
                target="_blank"
                rel="noreferrer"
                className="pointer-events-auto px-6 py-3 rounded-full bg-black/80 backdrop-blur-md text-sm font-bold text-white border border-white/20 hover:bg-primary hover:text-black transition-all duration-300 shadow-xl"
              >
                {content.openIn2GIS}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
