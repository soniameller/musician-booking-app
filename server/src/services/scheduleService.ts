import { FindOptions } from 'sequelize/types';
import Musician from '../database/models/musician';
import MusicianService from '../database/models/musicianService';
import Schedule from '../database/models/schedule';
import Service from '../database/models/service';
import { sequelize } from '../database/sequelize';
import { JsonSchedule } from '@shared-utils';

export interface BookingRequest {
  name: string;
  serviceId: string;
}

const scheduleQueryConfig: FindOptions<any> = {
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
      model: Service,
      attributes: ['name'],
    },
  ],
};

export const fetchMusicianSchedules = async (
  musicianId: string
): Promise<JsonSchedule[]> => {
  try {
    const dbSchedules = await Schedule.findAll({
      ...scheduleQueryConfig,
      where: { '$Musician.id$': musicianId },
    });

    return dbSchedules.map((schedule) => schedule.customJson);
  } catch (error) {
    console.error('Error fetching schedules from the database:', error);
    throw new Error('Failed to fetch schedules');
  }
};

export const fetchBookedSchedules = async (): Promise<JsonSchedule[]> => {
  try {
    const dbSchedules = await Schedule.findAll({
      ...scheduleQueryConfig,
      where: { booked: true },
      order: [['dateTime', 'ASC']],
    });

    return dbSchedules.map((schedule) => schedule.customJson);
  } catch (error) {
    console.error('Error fetching schedules from the database:', error);
    throw new Error('Failed to fetch schedules');
  }
};

export const bookSchedule = async (
  scheduleId: string,
  params: BookingRequest
): Promise<JsonSchedule> => {
  const { name, serviceId } = params;

  const transaction = await sequelize.transaction();
  try {
    const schedule = await Schedule.findByPk(scheduleId, { transaction });

    if (!schedule) {
      throw new Error('Schedule not found');
    }
    if (schedule.booked) {
      throw new Error('Schedule is already booked and cannot be updated.');
    }

    const isServiceOfferedByMusician = await MusicianService.findOne({
      where: {
        musicianId: schedule.musicianId,
        serviceId,
      },
      transaction,
    });

    if (!isServiceOfferedByMusician) {
      throw new Error('The selected service is not offered by the musician.');
    }

    await schedule.update(
      {
        name,
        booked: true,
        serviceId,
      },
      { transaction }
    );

    await transaction.commit();

    const updatedSchedule = await Schedule.findByPk(
      schedule.id,
      scheduleQueryConfig
    );

    return updatedSchedule.customJson;
  } catch (error) {
    await transaction.rollback();

    console.error('Error updating schedule:', error);
    throw error;
  }
};
