// Symlinked to backend therapist.ts

export interface Therapist {
  uuid: string;
  fullName: string;
  address: string; // 123 Huntington St
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  profilePictureUrl: string;

  geocode: {
    lat: number;
    long: number;
  };

  minimumAgeServed: number; // Nat
  description: string;
  therapyType: string;
  title: string;
  website?: string;

  badges: Badge[];
  languages: string[];

  dateJoined: string;
  familiesHelped: number;
}

export interface Badge {
  name: string;
  // value: string
  imageUrl?: string;
  color?: string;
}

export interface TherapistDisplayModel extends Therapist {
  searchScore?: number;
}
