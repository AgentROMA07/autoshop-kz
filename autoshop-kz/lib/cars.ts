export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number; // in km
  bodyType: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'van' | 'pickup' | 'wagon';
  condition: 'new' | 'used';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid' | 'gas';
  transmission: 'automatic' | 'manual' | 'robot' | 'cvt';
  driveType: 'fwd' | 'rwd' | 'awd';
  engineVolume?: number; // e.g. 2.5
  power?: number; // hp
  color: string;
  images: string[];
  features: string[];
  description: {
    kz: string;
    ru: string;
  };
  badges: ('new' | 'verified' | 'warranty' | 'sale')[];
  vin?: string;
}

const CAR_IMAGES = {
  camry: [
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  ],
  landcruiser: [
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
  ],
  bmw: [
    'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  ],
  hyundai: [
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  ],
  kia: [
    'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  ],
  mercedes: [
    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
  ]
};

export const cars: Car[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Camry',
    year: 2024,
    price: 15500000,
    mileage: 0,
    bodyType: 'sedan',
    condition: 'new',
    fuelType: 'petrol',
    transmission: 'automatic',
    driveType: 'fwd',
    engineVolume: 2.5,
    power: 203,
    color: 'Pearl White',
    images: CAR_IMAGES.camry,
    features: ['Leather Seats', 'Adaptive Cruise Control', 'Lane Keeping Assist', 'Apple CarPlay', 'Android Auto', 'Heated Seats'],
    description: {
      kz: 'Toyota Camry 2024 - жайлылық пен сенімділіктің тамаша үйлесімі. Жаңа дизайн, жетілдірілген қауіпсіздік жүйелері және қуатты қозғалтқыш. Қалалық жүріс үшін де, ұзақ сапарлар үшін де өте қолайлы.',
      ru: 'Toyota Camry 2024 - идеальное сочетание комфорта и надежности. Новый дизайн, улучшенные системы безопасности и мощный двигатель. Отлично подходит как для городской езды, так и для дальних поездок.'
    },
    badges: ['new', 'warranty']
  },
  {
    id: '2',
    make: 'Toyota',
    model: 'Land Cruiser 300',
    year: 2023,
    price: 45000000,
    mileage: 15000,
    bodyType: 'suv',
    condition: 'used',
    fuelType: 'petrol',
    transmission: 'automatic',
    driveType: 'awd',
    engineVolume: 3.5,
    power: 415,
    color: 'Black',
    images: CAR_IMAGES.landcruiser,
    features: ['4WD', 'Leather Interior', 'Sunroof', '360 Camera', 'JBL Sound System', 'Cool Box'],
    description: {
      kz: 'Аңызға айналған жол талғамайтын көлік. Кез келген жол жағдайында сенімділік пен жайлылықты қамтамасыз етеді. Премиум класты жабдықтар және ең заманауи технологиялар.',
      ru: 'Легендарный внедорожник. Обеспечивает уверенность и комфорт в любых дорожных условиях. Премиальное оснащение и самые современные технологии.'
    },
    badges: ['verified', 'sale']
  },
  {
    id: '3',
    make: 'BMW',
    model: '5 Series',
    year: 2023,
    price: 28000000,
    mileage: 5000,
    bodyType: 'sedan',
    condition: 'used',
    fuelType: 'petrol',
    transmission: 'automatic',
    driveType: 'rwd',
    engineVolume: 2.0,
    power: 249,
    color: 'Grey Metallic',
    images: CAR_IMAGES.bmw,
    features: ['M Sport Package', 'Head-up Display', 'Laser Lights', 'Harman Kardon', 'Gesture Control'],
    description: {
      kz: 'Бизнес-кластағы спорттық седан. Динамикалық жүріс пен жоғары деңгейдегі жайлылық. M Sport пакеті көліктің спорттық мінезін айқындай түседі.',
      ru: 'Спортивный седан бизнес-класса. Динамичная езда и высокий уровень комфорта. Пакет M Sport подчеркивает спортивный характер автомобиля.'
    },
    badges: ['new']
  },
  {
    id: '4',
    make: 'Hyundai',
    model: 'Sonata',
    year: 2022,
    price: 12500000,
    mileage: 25000,
    bodyType: 'sedan',
    condition: 'used',
    fuelType: 'petrol',
    transmission: 'automatic',
    driveType: 'fwd',
    engineVolume: 2.5,
    power: 180,
    color: 'Silver',
    images: CAR_IMAGES.hyundai,
    features: ['Digital Dashboard', 'Wireless Charging', 'Blind Spot Monitoring', 'Keyless Entry'],
    description: {
      kz: 'Заманауи және стильді седан. Кең салон, бай жабдықталу және үнемді қозғалтқыш. Күнделікті қолдануға өте ыңғайлы.',
      ru: 'Современный и стильный седан. Просторный салон, богатое оснащение и экономичный двигатель. Очень удобен для повседневного использования.'
    },
    badges: ['verified']
  },
  {
    id: '5',
    make: 'Kia',
    model: 'K5',
    year: 2023,
    price: 13800000,
    mileage: 8000,
    bodyType: 'sedan',
    condition: 'used',
    fuelType: 'petrol',
    transmission: 'automatic',
    driveType: 'fwd',
    engineVolume: 2.5,
    power: 194,
    color: 'Blue',
    images: CAR_IMAGES.kia,
    features: ['GT Line', 'Panoramic Roof', 'Bose Audio', 'Ventilated Seats'],
    description: {
      kz: 'Жастарға арналған жарқын дизайн. GT Line жиынтығы, спорттық көрініс және озық технологиялар. Жолда назар аудартады.',
      ru: 'Яркий дизайн для молодежи. Комплектация GT Line, спортивный вид и передовые технологии. Привлекает внимание на дороге.'
    },
    badges: ['sale']
  },
  {
    id: '6',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2021,
    price: 24000000,
    mileage: 35000,
    bodyType: 'sedan',
    condition: 'used',
    fuelType: 'diesel',
    transmission: 'automatic',
    driveType: 'awd',
    engineVolume: 2.0,
    power: 194,
    color: 'Black',
    images: CAR_IMAGES.mercedes,
    features: ['AMG Line', 'Burmester Audio', 'Air Suspension', 'Massage Seats', 'Night Package'],
    description: {
      kz: 'Интеллектуалды бизнес-седан. Ең жоғары деңгейдегі жайлылық пен қауіпсіздік. Дизельді қозғалтқыш үнемділік пен қуатты қамтамасыз етеді.',
      ru: 'Интеллектуальный бизнес-седан. Высочайший уровень комфорта и безопасности. Дизельный двигатель обеспечивает экономичность и мощь.'
    },
    badges: ['verified', 'warranty']
  }
];

export function getAllCars(): Car[] {
  return cars;
}

export function getCarById(id: string): Car | undefined {
  return cars.find(car => car.id === id);
}

export function getFeaturedCars(): Car[] {
  return cars.slice(0, 3);
}
