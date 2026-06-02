import { useEffect, useState } from 'react';

export interface Provider {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export interface Coverage {
  prevention: boolean;
  basicRestoration: boolean;
  endodontics: boolean;
  periodontics: boolean;
  prosthetics: boolean;
  orthodontics: boolean;
  implants: boolean;
  urgencyEmergency: boolean;
}

export interface Plan {
  id: string;
  operatorId: string;
  name: string;
  category: 'individual' | 'family' | 'corporate';
  monthlyPrice: number;
  coparticipation: boolean;
  orthodontics: boolean;
  implants: boolean;
  urgencyEmergency: boolean;
  ansCode: string;
  accreditedNetworkCount: number;
  coverage: Coverage;
  highlights: string[];
  accreditedProviders: Provider[];
}

export interface Operator {
  id: string;
  name: string;
  logoUrl: string;
}

export interface MockData {
  operators: Operator[];
  plans: Plan[];
}

export const COVERAGE_LABELS: Record<keyof Coverage, string> = {
  prevention:       'Prevenção',
  basicRestoration: 'Restauração',
  endodontics:      'Endodontia (canal)',
  periodontics:     'Periodontia (gengiva)',
  prosthetics:      'Prótese',
  orthodontics:     'Ortodontia (aparelho)',
  implants:         'Implante',
  urgencyEmergency: 'Urgência / Emergência',
};

export function useMockData() {
  const [data, setData] = useState<MockData | null>(null);

  useEffect(() => {
    fetch('/mock-data.json')
      .then(r => r.json())
      .then(setData);
  }, []);

  return data;
}
