export enum BookingDetailsType {
  NAME = 'name',
  SCHEDULE_ID = 'scheduleId',
  SERVICE_ID = 'serviceId',
}

export interface BookingDetails {
  [BookingDetailsType.SCHEDULE_ID]: string;
  [BookingDetailsType.NAME]: string;
  [BookingDetailsType.SERVICE_ID]: string;
}
