import type { AutoCertoProvider, AutoCertoVehicle } from './types';
import { randomUUID } from 'crypto';

const mockVehicles: AutoCertoVehicle[] = [
  {
    id: randomUUID(),
    brand: 'Toyota',
    model: 'Corolla XEi 2024',
    price: 132000,
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    brand: 'Honda',
    model: 'Civic Touring 2023',
    price: 156000,
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    brand: 'Jeep',
    model: 'Compass Longitude 2024',
    price: 178000,
    updatedAt: new Date().toISOString()
  },
  {
    id: randomUUID(),
    brand: 'Volkswagen',
    model: 'T-Cross Comfortline',
    price: 125000,
    updatedAt: new Date().toISOString()
  }
];

export const mockAutoCertoProvider: AutoCertoProvider = {
  async listVehicles() {
    return { vehicles: mockVehicles };
  },
  async upsertVehicle() {
    return;
  }
};

export function getMockVehicles() {
  return mockVehicles.map((vehicle) => ({
    ...vehicle,
    published: true
  }));
}
