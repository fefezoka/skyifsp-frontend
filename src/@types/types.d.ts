interface Flight {
  type: 'outward' | 'outbound';
  flights: {
    airplane: {
      seats: number;
      plane: string;
    };
    departureDate: Date;
    arrivalDate: Date;
    price: number;
  }[];
}

interface Flights {
  price: string;
  origin: Airport;
  destination: Airport;
  routes: Flight[];
}

interface Airport {
  country: string;
  countryCode: string;
  city: string;
  code: string;
  airport: string;
  latitude: string;
  longitude: string;
}
