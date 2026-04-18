export interface MaizeListing {
  id: string;
  type: 'White Maize' | 'Yellow Maize' | 'Dry Maize' | 'Green Maize';
  quantity: string;
  location: string;
  pricePerTon: number;
  seller: string;
  sellerInitials: string;
  date: string;
}

export const MAIZE_LISTINGS: MaizeListing[] = [
  {
    id: 'MC-101',
    type: 'White Maize',
    quantity: '50 Tons',
    location: 'Mashonaland West, Chegutu',
    pricePerTon: 350,
    seller: 'Kuda Munyaradzi',
    sellerInitials: 'KM',
    date: '2h ago'
  },
  {
    id: 'MC-102',
    type: 'Yellow Maize',
    quantity: '20 Tons',
    location: 'Midlands, Gweru',
    pricePerTon: 310,
    seller: 'Tinashe Moyo',
    sellerInitials: 'TM',
    date: '4h ago'
  },
  {
    id: 'MC-103',
    type: 'White Maize',
    quantity: '100 Bags (50kg)',
    location: 'Harare, Mbare',
    pricePerTon: 360,
    seller: 'Farai Chidzero',
    sellerInitials: 'FC',
    date: '1d ago'
  },
  {
    id: 'MC-104',
    type: 'Dry Maize',
    quantity: '15 Tons',
    location: 'Masvingo, Chiredzi',
    pricePerTon: 325,
    seller: 'Grace Mukaro',
    sellerInitials: 'GM',
    date: '6h ago'
  },
  {
    id: 'MC-105',
    type: 'Green Maize',
    quantity: '500 Dozen',
    location: 'Mutare, Manicaland',
    pricePerTon: 280,
    seller: 'Chengetai Shumba',
    sellerInitials: 'CS',
    date: 'Just now'
  },
  {
    id: 'MC-106',
    type: 'White Maize',
    quantity: '12 Tons',
    location: 'Bulawayo, Mat South',
    pricePerTon: 355,
    seller: 'Blessing Sibanda',
    sellerInitials: 'BS',
    date: '12h ago'
  }
];
