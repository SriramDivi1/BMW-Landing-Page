export interface BMWModel {
  id: string
  name: string
  fullName: string
  year: number
  modelPath: string
  headline: string
  placard: string
  curatorNote: string
  specs: {
    power: string
    torque: string
    acceleration: string
    drivetrain: string
    transmission: string
    body: string
  }
  character: string
}

export const models: BMWModel[] = [
  {
    id: 'm2',
    name: 'M2',
    fullName: 'BMW M2 Coupe',
    year: 2023,
    modelPath: '/assets/BMW3DHero/2023_bmw_m2_coupe.glb',
    headline: 'Pure.',
    placard: 'The compact coupe that started a new chapter. Rear-wheel drive. A six-speed manual option. 453 horsepower from a twin-turbocharged inline-six. The M2 strips away everything unnecessary and keeps only what matters: the connection between driver and road.',
    curatorNote: 'The M2 represents BMW M\'s return to its roots — a driver\'s car in its most essential form. Every surface, every control, every response calibrated for engagement.',
    specs: {
      power: '453 hp',
      torque: '406 lb-ft',
      acceleration: '4.1s',
      drivetrain: 'RWD',
      transmission: '6MT / 8AT',
      body: '2-door Coupe',
    },
    character: 'Purist',
  },
  {
    id: 'm4',
    name: 'M4',
    fullName: 'BMW M4 Competition',
    year: 2024,
    modelPath: '/assets/BMW3DHero/bmw_m4_widebody__www.vecarz.com.glb',
    headline: 'Statement.',
    placard: 'Presence before it moves. The M4\'s widebody stance announces intent from every angle. 503 horsepower. Available all-wheel drive. A grand touring coupe engineered to dominate both track days and coastal highways with equal composure.',
    curatorNote: 'The M4 Competition\'s aggressive kidney grille sparked debate — and that\'s precisely the point. M has never sought consensus. It seeks reaction.',
    specs: {
      power: '503 hp',
      torque: '479 lb-ft',
      acceleration: '3.8s',
      drivetrain: 'RWD / AWD',
      transmission: '6MT / 8AT',
      body: '2-door Coupe',
    },
    character: 'Expressive',
  },
  {
    id: 'm5',
    name: 'M5',
    fullName: 'BMW M5 Sedan',
    year: 2018,
    modelPath: '/assets/BMW3DHero/2018_bmw_m5.glb',
    headline: 'Duality.',
    placard: 'The executive athlete. 600 horsepower beneath a sedan\'s silhouette. The M5 maintains the poise expected in a boardroom while harboring the capability to embarrass sports cars. All-wheel drive with a rear-bias character. Comfort and fury, unified.',
    curatorNote: 'Since 1984, the M5 has defined the super sedan category it created. Four generations later, the formula remains: invisible performance, available on demand.',
    specs: {
      power: '600 hp',
      torque: '553 lb-ft',
      acceleration: '3.4s',
      drivetrain: 'AWD',
      transmission: '8AT',
      body: '4-door Sedan',
    },
    character: 'Executive',
  },
  {
    id: 'm8',
    name: 'M8',
    fullName: 'BMW M8 Coupe',
    year: 2020,
    modelPath: '/assets/BMW3DHero/2020_bmw_m8_coupe.glb',
    headline: 'Pinnacle.',
    placard: 'The flagship. 617 horsepower channeled through BMW\'s most sophisticated chassis. The M8 exists where grand touring meets motorsport — a continent-crossing machine that loses nothing on a race circuit. Carbon ceramic brakes. Adaptive suspension. The culmination of M.',
    curatorNote: 'The M8\'s twin-turbocharged V8 descends directly from the engine that powered BMW\'s return to Le Mans. Racing heritage, refined for the road.',
    specs: {
      power: '617 hp',
      torque: '553 lb-ft',
      acceleration: '3.0s',
      drivetrain: 'AWD',
      transmission: '8AT',
      body: '2-door Coupe',
    },
    character: 'Flagship',
  },
]

export const comparisonSpecs = [
  { label: 'Power', key: 'power' },
  { label: 'Torque', key: 'torque' },
  { label: '0-60 mph', key: 'acceleration' },
  { label: 'Drivetrain', key: 'drivetrain' },
  { label: 'Transmission', key: 'transmission' },
  { label: 'Body', key: 'body' },
] as const

export type SpecKey = keyof BMWModel['specs']
