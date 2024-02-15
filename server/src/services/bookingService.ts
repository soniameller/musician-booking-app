import Musician from '../database/models/musician';
import Schedule from '../database/models/schedule';
import Service from '../database/models/service';
import { BookingResponse, JsonBooking } from '@shared-utils';
import Booking from '../database/models/booking';
import { Op } from 'sequelize';
import { startOfDay, isPast } from 'date-fns';
import { adjustDateTimeToCurrentDate } from '../utils/date-utils';
import { sequelize } from '../database/sequelize';

export interface BookingRequest {
  name: string;
  serviceId: string;
}

export const fetchTodaysBookings = async (): Promise<JsonBooking[]> => {
  try {
    const dbBooking = await Booking.findAll({
      where: {
        createdAt: {
          [Op.gte]: startOfDay(new Date()),
        },
      },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: Schedule,
          attributes: ['dateTime'],
          include: [
            {
              model: Musician,
              attributes: ['id', 'name'],
            },
          ],
        },
        {
          model: Service,
          attributes: ['name'],
        },
      ],
    });

    return dbBooking.map((booking) => booking.customJson);
  } catch (error) {
    console.error('Error fetching bookings from the database:', error);
    throw new Error('Failed to fetch bookings');
  }
};

export const createBooking = async (
  scheduleId: string,
  params: BookingRequest
): Promise<BookingResponse> => {
  const { name, serviceId } = params;

  const transaction = await sequelize.transaction();

  try {
    const schedule = await Schedule.findByPk(scheduleId, {
      include: [
        {
          model: Musician,
          include: [
            {
              model: Service,
              where: {
                id: serviceId,
              },
              required: false,
            },
          ],
        },
        {
          model: Booking,
          where: {
            createdAt: {
              [Op.gte]: startOfDay(new Date()),
            },
          },
          required: false,
        },
      ],
    });

    if (!schedule) {
      throw new Error('Schedule not found');
    }

    if (schedule?.bookings.length) {
      throw new Error('This schedule is already booked');
    }

    if (!schedule.musician.enabled) {
      throw new Error('This musician is not available.');
    }

    if (!schedule.musician.services.length) {
      throw new Error('The selected service is not offered by the musician.');
    }

    if (isPast(adjustDateTimeToCurrentDate(schedule.dateTime))) {
      throw new Error('The selected date is in the past');
    }

    const booking = await Booking.create(
      {
        name,
        serviceId,
        scheduleId,
      },
      { transaction }
    );

    await transaction.commit();

    const response: BookingResponse = {
      status: 'success',
      message: 'Booking successfully created',
      bookingId: booking.id,
    };

    return response;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};
