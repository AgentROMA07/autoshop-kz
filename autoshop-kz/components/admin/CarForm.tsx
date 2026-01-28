'use client';

import { useState } from 'react';
import { Car } from '@/lib/cars';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Plus, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { adminDictionary } from '@/lib/admin-dictionary';

type AdminDict = typeof adminDictionary['ru'];

interface CarFormProps {
  initialData?: Car;
  onSave: (car: Car) => void;
  onCancel: () => void;
  lang: 'ru' | 'kz';
  dict: AdminDict;
}

export function CarForm({ initialData, onSave, onCancel, lang, dict }: CarFormProps) {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  
  const [formData, setFormData] = useState<Partial<Car>>({
    make: initialData?.make || '',
    model: initialData?.model || '',
    year: initialData?.year || new Date().getFullYear(),
    price: initialData?.price || 0,
    mileage: initialData?.mileage || 0,
    condition: initialData?.condition || 'used',
    bodyType: initialData?.bodyType || 'sedan',
    fuelType: initialData?.fuelType || 'petrol',
    transmission: initialData?.transmission || 'automatic',
    driveType: initialData?.driveType || 'fwd',
    color: initialData?.color || '',
    features: initialData?.features || [],
    badges: initialData?.badges || [],
    description: initialData?.description || { kz: '', ru: '' }
  });

  const [featureInput, setFeatureInput] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newCar = {
        ...formData,
        id: initialData?.id || Date.now().toString(),
        images: images,
      } as Car;
      
      onSave(newCar);
    } catch (error) {
      console.error('Failed to save car:', error);
      alert('Ошибка при сохранении');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>{dict.form.make}</Label>
          <Input 
            required 
            value={formData.make} 
            onChange={e => setFormData({...formData, make: e.target.value})}
            placeholder="Toyota"
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.model}</Label>
          <Input 
            required 
            value={formData.model} 
            onChange={e => setFormData({...formData, model: e.target.value})}
            placeholder="Camry"
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.year}</Label>
          <Input 
            type="number" 
            required 
            value={formData.year} 
            onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.price}</Label>
          <Input 
            type="number" 
            required 
            value={formData.price} 
            onChange={e => setFormData({...formData, price: parseInt(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.mileage}</Label>
          <Input 
            type="number" 
            required 
            value={formData.mileage} 
            onChange={e => setFormData({...formData, mileage: parseInt(e.target.value)})}
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.color}</Label>
          <Input 
            required 
            value={formData.color} 
            onChange={e => setFormData({...formData, color: e.target.value})}
            placeholder={lang === 'ru' ? "Белый" : "Ақ"}
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.condition}</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={formData.condition}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={e => setFormData({...formData, condition: e.target.value as any})}
          >
            <option value="new">{dict.form.conditions.new}</option>
            <option value="used">{dict.form.conditions.used}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label>{dict.form.bodyType}</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={formData.bodyType}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={e => setFormData({...formData, bodyType: e.target.value as any})}
          >
            <option value="sedan">{dict.form.bodyTypes.sedan}</option>
            <option value="suv">{dict.form.bodyTypes.suv}</option>
            <option value="hatchback">{dict.form.bodyTypes.hatchback}</option>
            <option value="coupe">{dict.form.bodyTypes.coupe}</option>
            <option value="van">{dict.form.bodyTypes.minivan}</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>{dict.form.fuelType}</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={formData.fuelType}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={e => setFormData({...formData, fuelType: e.target.value as any})}
          >
            <option value="petrol">{dict.form.fuelTypes.petrol}</option>
            <option value="diesel">{dict.form.fuelTypes.diesel}</option>
            <option value="gas">{dict.form.fuelTypes.gas}</option>
            <option value="electric">{dict.form.fuelTypes.electric}</option>
            <option value="hybrid">{dict.form.fuelTypes.hybrid}</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>{dict.form.transmission}</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={formData.transmission}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={e => setFormData({...formData, transmission: e.target.value as any})}
          >
            <option value="automatic">{dict.form.transmissions.automatic}</option>
            <option value="manual">{dict.form.transmissions.manual}</option>
            <option value="robot">{dict.form.transmissions.robot}</option>
            <option value="cvt">{dict.form.transmissions.variator}</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>{dict.form.driveType}</Label>
          <select 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            value={formData.driveType}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={e => setFormData({...formData, driveType: e.target.value as any})}
          >
            <option value="fwd">{dict.form.driveTypes.fwd}</option>
            <option value="rwd">{dict.form.driveTypes.rwd}</option>
            <option value="awd">{dict.form.driveTypes.awd}</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>{dict.form.engineVolume}</Label>
          <Input 
            type="number" 
            step="0.1"
            value={formData.engineVolume || ''} 
            onChange={e => setFormData({...formData, engineVolume: parseFloat(e.target.value)})}
            placeholder="2.5"
          />
        </div>
        <div className="space-y-2">
          <Label>{dict.form.power}</Label>
          <Input 
            type="number" 
            value={formData.power || ''} 
            onChange={e => setFormData({...formData, power: parseInt(e.target.value)})}
            placeholder="200"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>{dict.form.descriptionRu}</Label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={typeof formData.description === 'object' ? formData.description.ru : formData.description || ''}
              onChange={e => setFormData({
                ...formData, 
                description: { 
                  ru: e.target.value, 
                  kz: typeof formData.description === 'object' ? formData.description.kz : '' 
                }
              })}
            />
          </div>
          <div className="space-y-2">
            <Label>{dict.form.descriptionKz}</Label>
            <textarea 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={typeof formData.description === 'object' ? formData.description.kz : ''}
              onChange={e => setFormData({
                ...formData, 
                description: { 
                  ru: typeof formData.description === 'object' ? formData.description.ru : (formData.description as unknown as string || ''), 
                  kz: e.target.value 
                }
              })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>{dict.form.images}</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden group">
              <Image src={img} alt={`Preview ${idx}`} fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <label className="flex flex-col items-center justify-center aspect-[3/2] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors bg-gray-50">
            <Upload className="h-8 w-8 text-gray-400" />
            <span className="text-xs text-gray-500 mt-2">{dict.form.uploadImages}</span>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <Label>{dict.form.features}</Label>
        <div className="flex gap-2">
          <Input 
            value={featureInput}
            onChange={e => setFeatureInput(e.target.value)}
            placeholder={dict.form.featurePlaceholder}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())}
          />
          <Button type="button" onClick={addFeature} variant="outline">
            <Plus className="h-4 w-4" /> {dict.form.addFeature}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.features?.map((feat, idx) => (
            <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {feat}
              <button type="button" onClick={() => removeFeature(idx)} className="text-gray-500 hover:text-red-500">
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          {dict.form.cancel}
        </Button>
        <Button type="submit" disabled={loading} className="bg-primary text-black hover:bg-yellow-500">
          {loading ? dict.form.saving : dict.form.save}
        </Button>
      </div>
    </form>
  );
}
