'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, Car } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  carModel?: string;
}

export function BookingModal({ isOpen, onClose, carModel }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    // In a real app, send data to backend
  };

  const reset = () => {
    setStep(1);
    setDate('');
    setTime('');
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={reset} title={step === 1 ? "Book an Appointment" : "Booking Confirmed"}>
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {carModel && (
            <div className="p-3 bg-neutral-50 rounded-lg flex items-center gap-3 border border-neutral-100">
              <Car className="w-5 h-5 text-primary" />
              <span className="font-medium text-neutral-900">Viewing: {carModel}</span>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <input 
                  type="date" 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-neutral-700">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                <select 
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-700">Name</label>
            <input 
              type="text" 
              required
              placeholder="Your name"
              className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-neutral-700">Phone</label>
            <input 
              type="tel" 
              required
              placeholder="+7 (___) ___-__-__"
              className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full bg-primary text-black font-bold hover:bg-yellow-400 h-12 mt-4 text-lg">
            Confirm Booking
          </Button>
        </form>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h4 className="text-2xl font-bold mb-2">Booking Confirmed!</h4>
          <p className="text-neutral-600 mb-6">
            We&apos;ll expect you on <strong>{date}</strong> at <strong>{time}</strong>.
            <br />
            Our manager will contact you shortly.
          </p>
          <Button onClick={reset} variant="outline" className="w-full border-2 font-bold">
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}
