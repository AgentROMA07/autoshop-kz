'use server'

import { prisma } from '@/lib/prisma';
import { Car, cars as staticCars } from '@/lib/cars';
import { revalidatePath } from 'next/cache';

// Helper to map Prisma result to Car interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPrismaCarToCar(pCar: any): Car {
  return {
    ...pCar,
    description: {
      kz: pCar.descriptionKz,
      ru: pCar.descriptionRu,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images: pCar.images.map((i: any) => i.url),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    features: pCar.features.map((f: any) => f.name),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    badges: pCar.badges.map((b: any) => b.name),
    // Ensure enums match
    bodyType: pCar.bodyType,
    fuelType: pCar.fuelType,
    transmission: pCar.transmission,
    driveType: pCar.driveType,
  };
}

export async function getCars(): Promise<Car[]> {
  try {
    const cars = await prisma.car.findMany({
      include: {
        images: true,
        features: true,
        badges: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (cars.length === 0) {
      console.log('Database empty, seeding static cars...');
      // Seed data
      for (const car of staticCars) {
        await createCar(car);
      }
      return staticCars;
    }

    return cars.map(mapPrismaCarToCar);
  } catch (error) {
    console.error('Failed to fetch cars:', error);
    // Fallback to static cars if DB fails
    return staticCars;
  }
}

export async function createCar(car: Car): Promise<boolean> {
  try {
    // If ID is present and exists, it might throw error if we try to create.
    // We should ensure we don't conflict. 
    // Prisma create throws if ID exists.
    // We can use upsert or just create.
    
    await prisma.car.create({
      data: {
        id: car.id, // Use provided ID if available
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        mileage: car.mileage,
        bodyType: car.bodyType,
        fuelType: car.fuelType,
        transmission: car.transmission,
        driveType: car.driveType,
        engineVolume: car.engineVolume,
        power: car.power,
        color: car.color,
        vin: car.vin,
        descriptionKz: car.description.kz,
        descriptionRu: car.description.ru,
        images: {
          create: car.images.map(url => ({ url })),
        },
        features: {
          create: car.features.map(name => ({ name })),
        },
        badges: {
          create: car.badges.map(name => ({ name })),
        },
      },
    });
    revalidatePath('/inventory');
    revalidatePath('/admin');
    return true;
  } catch (error) {
    console.error('Failed to create car:', error);
    return false;
  }
}

export async function getCar(id: string): Promise<Car | null> {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        images: true,
        features: true,
        badges: true,
      },
    });

    if (!car) {
      // Check static cars if not found in DB (for backward compatibility during migration)
      const staticCar = staticCars.find(c => c.id === id);
      return staticCar || null;
    }

    return mapPrismaCarToCar(car);
  } catch (error) {
    console.error('Failed to fetch car:', error);
    const staticCar = staticCars.find(c => c.id === id);
    return staticCar || null;
  }
}

export async function updateCar(car: Car): Promise<boolean> {
  try {
    // Transaction to update car and replace arrays
    await prisma.$transaction(async (tx) => {
      // 1. Update scalar fields
      await tx.car.update({
        where: { id: car.id },
        data: {
          make: car.make,
          model: car.model,
          year: car.year,
          price: car.price,
          mileage: car.mileage,
          bodyType: car.bodyType,
          fuelType: car.fuelType,
          transmission: car.transmission,
          driveType: car.driveType,
          engineVolume: car.engineVolume,
          power: car.power,
          color: car.color,
          vin: car.vin,
          descriptionKz: car.description.kz,
          descriptionRu: car.description.ru,
        },
      });

      // 2. Replace relations (delete all and create new)
      // Images
      await tx.carImage.deleteMany({ where: { carId: car.id } });
      if (car.images.length > 0) {
        await tx.carImage.createMany({
          data: car.images.map(url => ({ url, carId: car.id })),
        });
      }

      // Features
      await tx.carFeature.deleteMany({ where: { carId: car.id } });
      if (car.features.length > 0) {
        await tx.carFeature.createMany({
          data: car.features.map(name => ({ name, carId: car.id })),
        });
      }

      // Badges
      await tx.carBadge.deleteMany({ where: { carId: car.id } });
      if (car.badges.length > 0) {
        await tx.carBadge.createMany({
          data: car.badges.map(name => ({ name, carId: car.id })),
        });
      }
    });
    
    revalidatePath('/inventory');
    revalidatePath('/admin');
    return true;
  } catch (error) {
    console.error('Failed to update car:', error);
    return false;
  }
}

export async function deleteCar(id: string): Promise<boolean> {
  try {
    await prisma.car.delete({
      where: { id },
    });
    revalidatePath('/inventory');
    revalidatePath('/admin');
    return true;
  } catch (error) {
    console.error('Failed to delete car:', error);
    return false;
  }
}
