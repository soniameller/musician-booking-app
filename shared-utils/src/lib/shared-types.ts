export type JsonMusician = {
  id: string;
  name: string;
  avatar: string;
  schedules: Date[] | string[];
  services: string[];
};

export type JsonSchedule = {
  dateTime: Date;
  booked: boolean;
  name?: string;
  musician?: JsonMusician;
  service?: string;
};

export type JsonService = {
  name: string;
  musicians: JsonMusician[];
};
