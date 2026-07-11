export type MapProvider = 'goong' | 'vietmap' | 'openstreetmap' | 'google';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type PlaceCandidate = Coordinates & {
  provider: MapProvider;
  providerPlaceId: string;
  name: string;
  formattedAddress: string;
  distanceMeters?: number;
};

export type PlaceSearchOptions = {
  query: string;
  near?: Coordinates;
  languageCode?: 'vi' | 'en';
  sessionToken?: string;
};

/**
 * Application-owned boundary for Goong, VietMap, OSM, or Google adapters.
 * Screens depend on this interface rather than a vendor SDK response shape.
 */
export interface LocationProvider {
  searchPlaces(options: PlaceSearchOptions): Promise<PlaceCandidate[]>;
  getPlace(providerPlaceId: string, sessionToken?: string): Promise<PlaceCandidate>;
}

