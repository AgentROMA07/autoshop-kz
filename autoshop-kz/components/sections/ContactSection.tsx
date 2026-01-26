'use client';

import { Container } from '@/components/ui/Container';
import { Card, CardContent } from '@/components/ui/Card';
import { getBrandConfig } from '@/lib/brand';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

interface ContactSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictionary: any;
}

export function ContactSection({ dictionary }: ContactSectionProps) {
  const content = dictionary.contact;
  const brand = getBrandConfig();

  return (
    <section className="py-20 bg-background" id="contact">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-12">{content.title}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <Card className="h-full border-none shadow-md bg-card">
            <CardContent className="p-8 space-y-8 flex flex-col justify-center h-full">
              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{content.form_phone}</h3>
                  <p className="text-xl font-medium text-foreground">{brand.contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <MapPin className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{dictionary.nav.contacts}</h3>
                  <p className="text-muted-foreground text-lg">{brand.contact.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <Clock className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Working Hours</h3>
                  <p className="text-muted-foreground text-lg">{brand.contact.workingHours}</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="bg-primary/10 p-4 rounded-full text-primary shrink-0">
                  <Mail className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground text-lg">{brand.contact.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <div className="w-full h-[400px] lg:h-auto min-h-[400px] bg-muted rounded-xl overflow-hidden relative shadow-md border border-border">
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              title="map" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Shymkent, Erimbetova 159/1&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed"
              style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }}
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
}
