export interface Hotel {
  id: number;
  name: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  type: 'economy' | 'standard' | 'premium' | 'luxury';
  coordinates: [number, number];
  rooms: {
    type: string;
    price: number;
    capacity: number;
  }[];
}

export const hotels: Hotel[] = [
  // Karachi Hotels
  {
    id: 1,
    name: 'Pearl Continental Karachi',
    location: 'Karachi, Sindh',
    city: 'Karachi',
    price: 12000,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
    images: [
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking', 'Room Service'],
    description: 'Experience luxury at Pearl Continental Karachi. Located in the heart of the city, this premium hotel offers world-class amenities and exceptional service.',
    type: 'premium',
    coordinates: [24.8607, 67.0011],
    rooms: [
      { type: 'Standard Room', price: 12000, capacity: 2 },
      { type: 'Deluxe Room', price: 15000, capacity: 2 },
      { type: 'Suite', price: 25000, capacity: 4 }
    ]
  },
  {
    id: 2,
    name: 'Avari Towers Karachi',
    location: 'Karachi, Sindh',
    city: 'Karachi',
    price: 10000,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
    images: [
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Gym', 'Spa'],
    description: 'Avari Towers offers premium accommodation in the heart of Karachi with stunning city views.',
    type: 'premium',
    coordinates: [24.8615, 67.0099],
    rooms: [
      { type: 'Standard Room', price: 10000, capacity: 2 },
      { type: 'Executive Room', price: 14000, capacity: 2 }
    ]
  },
  {
    id: 3,
    name: 'Regent Plaza Karachi',
    location: 'Karachi, Sindh',
    city: 'Karachi',
    price: 7000,
    rating: 4.0,
    image: 'https://images.pexels.com/photos/566073/pexels-photo-566073.jpeg',
    images: [
      'https://images.pexels.com/photos/566073/pexels-photo-566073.jpeg',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'AC', 'Room Service'],
    description: 'Comfortable stay at Regent Plaza with modern amenities and excellent service.',
    type: 'standard',
    coordinates: [24.8555, 67.0205],
    rooms: [
      { type: 'Standard Room', price: 7000, capacity: 2 }
    ]
  },

  // Lahore Hotels
  {
    id: 4,
    name: 'Faletti\'s Hotel Lahore',
    location: 'Lahore, Punjab',
    city: 'Lahore',
    price: 8000,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Parking', 'AC', 'Room Service'],
    description: 'Historic Faletti\'s Hotel in Lahore combines traditional charm with modern amenities.',
    type: 'standard',
    coordinates: [31.5497, 74.3436],
    rooms: [
      { type: 'Classic Room', price: 8000, capacity: 2 },
      { type: 'Superior Room', price: 12000, capacity: 2 },
      { type: 'Heritage Suite', price: 20000, capacity: 4 }
    ]
  },
  {
    id: 5,
    name: 'Pearl Continental Lahore',
    location: 'Lahore, Punjab',
    city: 'Lahore',
    price: 14000,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Spa'],
    description: 'Luxury accommodation in the heart of Lahore with world-class facilities.',
    type: 'luxury',
    coordinates: [31.5204, 74.3587],
    rooms: [
      { type: 'Deluxe Room', price: 14000, capacity: 2 },
      { type: 'Executive Suite', price: 25000, capacity: 4 }
    ]
  },

  // Islamabad Hotels
  {
    id: 6,
    name: 'Serena Hotel Islamabad',
    location: 'Islamabad, Punjab',
    city: 'Islamabad',
    price: 15000,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg'
    ],
    amenities: ['WiFi', 'Spa', 'Restaurant', 'Room Service', 'Pool', 'Gym'],
    description: 'Serena Hotel Islamabad offers a perfect blend of luxury and comfort in the capital city.',
    type: 'luxury',
    coordinates: [33.6844, 73.0479],
    rooms: [
      { type: 'Standard Room', price: 15000, capacity: 2 },
      { type: 'Executive Room', price: 20000, capacity: 2 },
      { type: 'Presidential Suite', price: 35000, capacity: 4 }
    ]
  },
  {
    id: 7,
    name: 'Marriott Islamabad',
    location: 'Islamabad, Punjab',
    city: 'Islamabad',
    price: 18000,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
    images: [
      'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg'
    ],
    amenities: ['WiFi', 'Spa', 'Pool', 'Restaurant', 'Gym'],
    description: 'International luxury at Marriott Islamabad with premium facilities.',
    type: 'luxury',
    coordinates: [33.6973, 73.0515],
    rooms: [
      { type: 'Deluxe Room', price: 18000, capacity: 2 },
      { type: 'Executive Suite', price: 30000, capacity: 4 }
    ]
  },

  // Gilgit Hotels
  {
    id: 8,
    name: 'Serena Hotel Gilgit',
    location: 'Gilgit, Gilgit-Baltistan',
    city: 'Gilgit',
    price: 12000,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Mountain View', 'Heating'],
    description: 'Experience the beauty of Gilgit with comfortable accommodation and stunning mountain views.',
    type: 'premium',
    coordinates: [35.9197, 74.3078],
    rooms: [
      { type: 'Standard Room', price: 12000, capacity: 2 },
      { type: 'Mountain View Suite', price: 18000, capacity: 4 }
    ]
  },
  {
    id: 9,
    name: 'PTDC Motel Gilgit',
    location: 'Gilgit, Gilgit-Baltistan',
    city: 'Gilgit',
    price: 6000,
    rating: 3.8,
    image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
    images: [
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Parking', 'Mountain View'],
    description: 'Budget-friendly accommodation in Gilgit with basic amenities and mountain views.',
    type: 'economy',
    coordinates: [35.9050, 74.3095],
    rooms: [
      { type: 'Standard Room', price: 6000, capacity: 2 }
    ]
  },
  {
    id: 10,
    name: 'Gilgit Inn',
    location: 'Gilgit, Gilgit-Baltistan',
    city: 'Gilgit',
    price: 4500,
    rating: 3.5,
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    images: [
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Heating'],
    description: 'Simple and comfortable stay in the heart of Gilgit city.',
    type: 'economy',
    coordinates: [35.9215, 74.3025],
    rooms: [
      { type: 'Basic Room', price: 4500, capacity: 2 }
    ]
  },

  // Skardu Hotels
  {
    id: 11,
    name: 'Shangrila Resort Skardu',
    location: 'Skardu, Gilgit-Baltistan',
    city: 'Skardu',
    price: 15000,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    images: [
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Lake View', 'Boat Rides', 'Garden'],
    description: 'Paradise on earth at Shangrila Resort with breathtaking lake views and luxury amenities.',
    type: 'luxury',
    coordinates: [35.2971, 75.6333],
    rooms: [
      { type: 'Lake View Room', price: 15000, capacity: 2 },
      { type: 'Luxury Suite', price: 25000, capacity: 4 }
    ]
  },
  {
    id: 12,
    name: 'PTDC Motel Skardu',
    location: 'Skardu, Gilgit-Baltistan',
    city: 'Skardu',
    price: 7000,
    rating: 4.0,
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    images: [
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Mountain View', 'Heating'],
    description: 'Comfortable accommodation in Skardu with mountain views and modern facilities.',
    type: 'standard',
    coordinates: [35.2978, 75.6372],
    rooms: [
      { type: 'Standard Room', price: 7000, capacity: 2 }
    ]
  },
  {
    id: 13,
    name: 'Baltistan Continental',
    location: 'Skardu, Gilgit-Baltistan',
    city: 'Skardu',
    price: 5500,
    rating: 3.7,
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Parking', 'Mountain View'],
    description: 'Budget-friendly hotel in Skardu with basic amenities and mountain views.',
    type: 'economy',
    coordinates: [35.2945, 75.6405],
    rooms: [
      { type: 'Standard Room', price: 5500, capacity: 2 }
    ]
  },

  // Hunza Hotels
  {
    id: 14,
    name: 'Serena Inn Hunza',
    location: 'Hunza, Gilgit-Baltistan',
    city: 'Hunza',
    price: 14000,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
    images: [
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Valley View', 'Garden', 'Heating'],
    description: 'Luxury accommodation in the stunning Hunza Valley with panoramic mountain views.',
    type: 'luxury',
    coordinates: [36.3167, 74.6500],
    rooms: [
      { type: 'Valley View Room', price: 14000, capacity: 2 },
      { type: 'Mountain Suite', price: 22000, capacity: 4 }
    ]
  },
  {
    id: 15,
    name: 'Hunza Embassy Hotel',
    location: 'Hunza, Gilgit-Baltistan',
    city: 'Hunza',
    price: 8000,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Mountain View', 'Garden'],
    description: 'Comfortable stay in Hunza with beautiful mountain views and local hospitality.',
    type: 'standard',
    coordinates: [36.3145, 74.6478],
    rooms: [
      { type: 'Standard Room', price: 8000, capacity: 2 }
    ]
  },
  {
    id: 16,
    name: 'Karimabad Inn',
    location: 'Hunza, Gilgit-Baltistan',
    city: 'Hunza',
    price: 6000,
    rating: 3.9,
    image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
    images: [
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    ],
    amenities: ['WiFi', 'Restaurant', 'Valley View', 'Heating'],
    description: 'Budget-friendly accommodation in Karimabad with stunning valley views.',
    type: 'economy',
    coordinates: [36.3189, 74.6523],
    rooms: [
      { type: 'Basic Room', price: 6000, capacity: 2 }
    ]
  }
];

// Hotel types data for Gilgit-Baltistan section
export const hotelTypesByCategory = {
  economy: [
    {
      id: 10,
      name: 'Gilgit Inn',
      location: 'Gilgit',
      price: 4500,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'Restaurant']
    },
    {
      id: 13,
      name: 'Baltistan Continental',
      location: 'Skardu',
      price: 5500,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Mountain View']
    },
    {
      id: 16,
      name: 'Karimabad Inn',
      location: 'Hunza',
      price: 6000,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'Valley View']
    },
    {
      id: 17,
      name: 'Mountain View Lodge',
      location: 'Gilgit',
      price: 4200,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['WiFi', 'Heating']
    },
    {
      id: 18,
      name: 'Valley Rest House',
      location: 'Skardu',
      price: 4800,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Restaurant']
    },
    {
      id: 19,
      name: 'Apricot Guest House',
      location: 'Hunza',
      price: 5200,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Garden']
    },
    {
      id: 20,
      name: 'River Side Inn',
      location: 'Gilgit',
      price: 4600,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'River View']
    },
    {
      id: 21,
      name: 'Budget Palace',
      location: 'Skardu',
      price: 4000,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['WiFi', 'Parking']
    },
    {
      id: 22,
      name: 'Traveler\'s Rest',
      location: 'Hunza',
      price: 5800,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Mountain View']
    },
    {
      id: 23,
      name: 'Comfort Lodge',
      location: 'Gilgit',
      price: 4300,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Restaurant']
    }
  ],
  standard: [
    {
      id: 12,
      name: 'PTDC Motel Skardu',
      location: 'Skardu',
      price: 7000,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Mountain View']
    },
    {
      id: 15,
      name: 'Hunza Embassy Hotel',
      location: 'Hunza',
      price: 8000,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Mountain View']
    },
    {
      id: 24,
      name: 'Alpine Resort',
      location: 'Gilgit',
      price: 7500,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'Restaurant', 'Gym']
    },
    {
      id: 25,
      name: 'Crystal Palace',
      location: 'Skardu',
      price: 8200,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['WiFi', 'Lake View', 'Restaurant']
    },
    {
      id: 26,
      name: 'Eagle\'s Nest Hotel',
      location: 'Hunza',
      price: 7800,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Valley View', 'Restaurant']
    },
    {
      id: 27,
      name: 'Glacier View Hotel',
      location: 'Gilgit',
      price: 7200,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Mountain View', 'Parking']
    },
    {
      id: 28,
      name: 'Concordia Hotel',
      location: 'Skardu',
      price: 8500,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'Restaurant', 'Heating']
    },
    {
      id: 29,
      name: 'Rakaposhi View',
      location: 'Hunza',
      price: 7600,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['WiFi', 'Garden', 'Mountain View']
    },
    {
      id: 30,
      name: 'Heritage Inn',
      location: 'Gilgit',
      price: 7900,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Restaurant', 'Cultural Tours']
    },
    {
      id: 31,
      name: 'Mountain Breeze',
      location: 'Skardu',
      price: 7300,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Mountain View', 'Restaurant']
    }
  ],
  premium: [
    {
      id: 8,
      name: 'Serena Hotel Gilgit',
      location: 'Gilgit',
      price: 12000,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Restaurant']
    },
    {
      id: 32,
      name: 'Royal Mountain Resort',
      location: 'Skardu',
      price: 11500,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Spa', 'Lake View']
    },
    {
      id: 33,
      name: 'Paradise Valley Hotel',
      location: 'Hunza',
      price: 10800,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'Valley View', 'Spa']
    },
    {
      id: 34,
      name: 'Crown Plaza Gilgit',
      location: 'Gilgit',
      price: 11200,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant']
    },
    {
      id: 35,
      name: 'Lake Palace Resort',
      location: 'Skardu',
      price: 12500,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Lake View', 'Boat Rides', 'Spa']
    },
    {
      id: 36,
      name: 'Altit Fort Hotel',
      location: 'Hunza',
      price: 11800,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Historical Tours', 'Garden', 'Restaurant']
    },
    {
      id: 37,
      name: 'Karakoram Lodge',
      location: 'Gilgit',
      price: 10500,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['WiFi', 'Mountain View', 'Adventure Tours']
    },
    {
      id: 38,
      name: 'Deosai Plains Resort',
      location: 'Skardu',
      price: 11000,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['WiFi', 'Wildlife Tours', 'Restaurant']
    },
    {
      id: 39,
      name: 'Ultar Peak Hotel',
      location: 'Hunza',
      price: 12200,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['WiFi', 'Peak View', 'Trekking Guide']
    },
    {
      id: 40,
      name: 'Fairy Meadows Resort',
      location: 'Gilgit',
      price: 11700,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['WiFi', 'Nanga Parbat View', 'Hiking']
    }
  ],
  luxury: [
    {
      id: 11,
      name: 'Shangrila Resort Skardu',
      location: 'Skardu',
      price: 15000,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['Lake View', 'Boat Rides']
    },
    {
      id: 14,
      name: 'Serena Inn Hunza',
      location: 'Hunza',
      price: 14000,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['Valley View', 'Garden']
    },
    {
      id: 41,
      name: 'K2 Base Camp Resort',
      location: 'Skardu',
      price: 18000,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['Mountain Expeditions', 'Luxury Spa', 'Helicopter Tours']
    },
    {
      id: 42,
      name: 'Rakaposhi Luxury Lodge',
      location: 'Hunza',
      price: 16500,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['Peak View', 'Private Balcony', 'Butler Service']
    },
    {
      id: 43,
      name: 'Gilgit Palace Hotel',
      location: 'Gilgit',
      price: 15500,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['Royal Suite', 'Fine Dining', 'Concierge']
    },
    {
      id: 44,
      name: 'Baltoro Glacier Resort',
      location: 'Skardu',
      price: 17200,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['Glacier View', 'Adventure Sports', 'Luxury Amenities']
    },
    {
      id: 45,
      name: 'Hunza Royal Retreat',
      location: 'Hunza',
      price: 16000,
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      amenities: ['Valley Panorama', 'Organic Garden', 'Cultural Shows']
    },
    {
      id: 46,
      name: 'Nanga Parbat Lodge',
      location: 'Gilgit',
      price: 17800,
      image: 'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      amenities: ['Mountain View', 'Luxury Spa', 'Private Chef']
    },
    {
      id: 47,
      name: 'Concordia Luxury Camp',
      location: 'Skardu',
      price: 19000,
      image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg',
      amenities: ['K2 View', 'Luxury Tents', 'Gourmet Dining']
    },
    {
      id: 48,
      name: 'Passu Luxury Resort',
      location: 'Hunza',
      price: 15800,
      image: 'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg',
      amenities: ['Passu Cones View', 'Infinity Pool', 'Wellness Center']
    }
  ]
};

export const cities = [
  'Karachi',
  'Lahore', 
  'Islamabad',
  'Gilgit',
  'Skardu',
  'Hunza'
];

export const getHotelsByCity = (city: string): Hotel[] => {
  return hotels.filter(hotel => hotel.city === city);
};

export const getHotelsByType = (type: string): Hotel[] => {
  return hotels.filter(hotel => hotel.type === type);
};

// Create comprehensive hotel list including all hotels from hotelTypesByCategory
const createAllHotels = (): Hotel[] => {
  const allHotelsMap = new Map<number, Hotel>();
  
  // Add existing hotels first (these have complete data)
  hotels.forEach(hotel => {
    allHotelsMap.set(hotel.id, hotel);
  });
  
  // Add hotels from hotelTypesByCategory that aren't already included
  Object.entries(hotelTypesByCategory).forEach(([type, categoryHotels]) => {
    categoryHotels.forEach(hotel => {
      if (!allHotelsMap.has(hotel.id)) {
        // Convert partial hotel data to full Hotel interface
        const fullHotel: Hotel = {
          id: hotel.id,
          name: hotel.name,
          location: hotel.location,
          city: hotel.location, // Use location as city
          price: hotel.price,
          rating: 4.0, // Default rating
          image: hotel.image,
          images: [hotel.image], // Use single image as array
          amenities: hotel.amenities,
          description: `Experience comfort and quality at ${hotel.name} in ${hotel.location}. This ${type} hotel offers excellent amenities and service.`,
          type: type as 'economy' | 'standard' | 'premium' | 'luxury',
          coordinates: [35.9197, 74.3078] as [number, number], // Default Gilgit coordinates
          rooms: [
            { type: 'Standard Room', price: hotel.price, capacity: 2 }
          ]
        };
        allHotelsMap.set(hotel.id, fullHotel);
      }
    });
  });
  
  return Array.from(allHotelsMap.values());
};

export const allHotels = createAllHotels();

export const getHotelById = (id: number): Hotel | undefined => {
  return allHotels.find(hotel => hotel.id === id);
};