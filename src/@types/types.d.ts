interface Flights {
  origin: Airport;
  destination: Airport;
  routes: Route[];
}

interface Route {
  type: 'outward' | 'outbound';
  flights: Flight[];
}

interface FlightLeg {
  airplane: {
    seats: number;
    plane: string;
  };
  departureDate: Date;
  arrivalDate: Date;
  origin: Airport;
  destination: Airport;
}

interface Flight {
  id: string;
  departureDate: Date;
  arrivalDate: Date;
  flightLegs: FlightLeg[];
  priceDetails: {
    pricePerAdult: number;
    pricePerKid: number;
    total: number;
    items: { message: string; amount: number }[];
  };
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
