export type JsonMusician = {
  id: string;
  name: string;
  avatar: string;
  schedules: Date[] | string[];
  services: string[];
};

export type JsonBookingMusician = {
  id: string;
  name: string;
  services: JsonService[];
};

export type JsonSchedule = {
  id: string;
  dateTime: Date;
  booked: boolean;
  musician: JsonBookingMusician;
  name?: string;
  service?: string;
};

export type JsonService = {
  id: string;
  name: string;
  musicians: JsonMusician[];
};
