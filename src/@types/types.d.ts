interface Route {
  type: 'outward' | 'outbound';
  flights: Flight[];
}

interface Flight {
  id: string;
  airplane: {
    seats: number;
    plane: string;
  };
  departureDate: Date;
  arrivalDate: Date;
  priceDetails: {
    pricePerAdult: number;
    pricePerKid: number;
    total: number;
    items: { message: string; amount: number }[];
  };
}

interface Flights {
  price: string;
  origin: Airport;
  destination: Airport;
  routes: Route[];
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
