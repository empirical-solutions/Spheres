export type ElementType = 'Fire' | 'Earth' | 'Air' | 'Water' | 'Void';

export type ZodiacSign = 
  | 'Aries' 
  | 'Taurus' 
  | 'Gemini' 
  | 'Cancer' 
  | 'Leo' 
  | 'Virgo' 
  | 'Libra' 
  | 'Scorpio' 
  | 'Sagittarius' 
  | 'Capricorn' 
  | 'Aquarius' 
  | 'Pisces'
  | 'Ophiuchus';

export interface AngelData {
  name: string;
  hebrew: string;
  choir: string;
  sphere: string;
  frequencyHz: number;
  divineAttribute: string;
  lightManifestation: string;
}

export interface DemonData {
  name: string;
  goetiaNumber: number;
  rank: string;
  legions: number;
  metal: string;
  frequencyHz: number;
  chthonicTitle: string;
  shadowManifestation: string;
}

export interface GateData {
  id: number; // 1 - 72
  actNumber: number; // 1 - 12
  startDegree: number; // e.g. 0, 5, 10...
  endDegree: number; // e.g. 5, 10, 15...
  startTime: number; // seconds (0, 8.33, 16.66...)
  endTime: number; // seconds
  sign: ZodiacSign;
  decanIndex: number; // 1, 2, or 3 (0-10°, 10-20°, 20-30°)
  quinanceIndex: number; // 1 - 6 within the sign
  element: ElementType;
  angel: AngelData;
  demon: DemonData;
  harmonicInteraction: string;
  isBreachPoint?: boolean; // Gate 48: 240° seam breach
}

export interface ActData {
  actNumber: number; // 1 - 12
  sign: ZodiacSign;
  symbol: string;
  latinName: string;
  subtitle: string;
  element: ElementType;
  startDegree: number;
  endDegree: number;
  startTime: number; // in seconds (e.g. 0, 50, 100...)
  endTime: number; // in seconds (e.g. 50, 100, 150...)
  globalVisualEnvironment: string;
  audioEngineProfile: string;
  audioDescription: string;
  harmonicExchange: string;
  gateIds: number[];
  colorPalette: {
    primary: string;
    secondary: string;
    border: string;
    glow: string;
    bgGradient: string;
  };
}

export interface VideoGenerationJob {
  operationName: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  status: 'pending' | 'polling' | 'completed' | 'failed';
  videoUrl?: string;
  createdAt: number;
  gateId?: number;
  actNumber?: number;
  error?: string;
}
