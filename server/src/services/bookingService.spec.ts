import { sequelize } from '../database/sequelize';
import { BookingRequest, createBooking } from './bookingService';
import Booking from '../database/models/booking';
import Schedule from '../database/models/schedule';
import * as dateUtils from '../utils/date-utils';
import Musician from '../database/models/musician';

const futureDate = new Date(new Date().setHours(new Date().getHours() + 5));
const pastDate = new Date(new Date().setHours(new Date().getHours() - 5));

jest.mock('../database/sequelize', () => ({
  sequelize: {
    transaction: jest.fn(() =>
      Promise.resolve({
        commit: jest.fn(),
        rollback: jest.fn(),
      })
    ),
  },
}));

jest.spyOn(Booking, 'create').mockResolvedValue({ id: 'bookingId' });
const ScheduleFindByPkSpy = jest.spyOn(Schedule, 'findByPk');
const adjustDatePkSpy = jest
  .spyOn(dateUtils, 'adjustDateTimeToCurrentDate')
  .mockReturnValue(new Date(futureDate));

describe('Booking Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const scheduleId = 'scheduleId';
  const schedule = {
    dateTime: new Date(),
    musician: { enabled: true, services: [{}] } as Musician,
    bookings: [],
  } as Schedule;

  const bookingRequest: BookingRequest = {
    name: 'Test Name',
    serviceId: 'serviceId',
  };

  // TODO - add types -
  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      ScheduleFindByPkSpy.mockResolvedValue(schedule);

      // Call the function under test
      const result = await createBooking(scheduleId, bookingRequest);

      expect(result).toEqual({
        status: 'success',
        message: 'Booking successfully created',
        bookingId: 'bookingId',
      });

      expect(sequelize.transaction).toHaveBeenCalled();
      expect(Schedule.findByPk).toHaveBeenCalled();
      expect(Booking.create).toHaveBeenCalledWith(
        {
          ...bookingRequest,
          scheduleId,
        },
        {
          transaction: expect.anything(),
        }
      );
    });

    it('should fail when the schedule is not found', async () => {
      ScheduleFindByPkSpy.mockResolvedValue(null);

      await expect(createBooking(scheduleId, bookingRequest)).rejects.toThrow(
        'Schedule not found'
      );
    });

    it('should fail when the schedule is already booked', async () => {
      jest
        .spyOn(Schedule, 'findByPk')
        .mockResolvedValue({ ...schedule, bookings: [{}] } as Schedule);

      await expect(createBooking(scheduleId, bookingRequest)).rejects.toThrow(
        'This schedule is already booked'
      );
    });

    it('should fail when the musician is not available', async () => {
      ScheduleFindByPkSpy.mockResolvedValue({
        ...schedule,
        musician: { enabled: false, services: [{}] },
      } as Schedule);

      await expect(createBooking(scheduleId, bookingRequest)).rejects.toThrow(
        'This musician is not available.'
      );
    });

    it('should fail when the service is not offered by the musician', async () => {
      ScheduleFindByPkSpy.mockResolvedValue({
        ...schedule,
        musician: { enabled: true, services: [] },
      } as Schedule);

      await expect(createBooking(scheduleId, bookingRequest)).rejects.toThrow(
        'The selected service is not offered by the musician.'
      );
    });

    it('should fail when the selected date is in the past', async () => {
      ScheduleFindByPkSpy.mockResolvedValue(schedule);

      // Mock the utility function for date adjustment
      adjustDatePkSpy.mockReturnValue(new Date(pastDate));

      await expect(createBooking(scheduleId, bookingRequest)).rejects.toThrow(
        'The selected date is in the past'
      );
    });
  });
  describe('Fetch Todays Bookings', () => {
    it("fetches today's bookings successfully", async () => {
      // TODO: Implement the test for the fetchTodaysBookings function
    });
  });
});
