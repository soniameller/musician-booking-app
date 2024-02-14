import { Op } from 'sequelize';
import Musician from '../database/models/musician';
import Schedule from '../database/models/schedule';
import Service from '../database/models/service';
import { JsonSchedule } from '@shared-utils';
import Booking from '../database/models/booking';
import { startOfDay } from 'date-fns';

export const fetchMusicianSchedules = async (
  musicianId: string
): Promise<JsonSchedule[]> => {
  const today = new Date();

  try {
    const dbSchedules = await Schedule.findAll({
      include: [
        {
          model: Musician,
          where: { enabled: true },
          include: [
            {
              model: Service,
              attributes: ['name', 'id'],
            },
          ],
        },
        {
          model: Booking,
          where: {
            createdAt: {
              [Op.gte]: startOfDay(today),
            },
          },
          required: false,
        },
      ],
      where: { '$Musician.id$': musicianId },
    });

    return dbSchedules.map((schedule) => schedule.customJson);
  } catch (error) {
    console.error('Error fetching schedules from the database:', error);
    throw new Error('Failed to fetch schedules');
  }
};
