export type JsonMusician = {
  id: string;
  name: string;
  enabled: boolean;
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
  musician: JsonBookingMusician;
  booked: boolean;
};

export type JsonBooking = {
  id: string;
  dateTime: Date;
  musician: JsonBookingMusician;
  service: string;
  name: string;
};

export type JsonService = {
  id: string;
  name: string;
  musicians: JsonMusician[];
};

export type BookingResponse = {
  status: string;
  message: string;
  bookingId: string;
};
