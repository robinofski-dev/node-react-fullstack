export type Speaker = {
  id: string;
  name: string;
  socialHandle?: string;
  avatarUrl?: string;
  company?: Company;
};

export type Company = {
  name: string;
  url: string;
};

export type Room = {
  id: string;
  name: string;
};

export type Talk = {
  id: string;
  title: string;
  description: string;
  startDate: string; // ISO 8601 string (e.g., "2024-09-01T10:00:00Z")
  endDate: string; // ISO 8601 string (e.g., "2024-09-01T11:00:00Z")
  speakerIds: string[];
  room: Room;
};
