import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import Schedule from './schedule';
import Service from './service';
import { JsonBooking } from '@shared-utils';
import { adjustDateTimeToCurrentDate } from '../../utils/date-utils';

@Table({
  timestamps: true,
  tableName: 'bookings',
  modelName: 'Booking',
})
export default class Booking extends Model {
  @ForeignKey(() => Schedule)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare scheduleId: string;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare serviceId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare name: string;

  @BelongsTo(() => Schedule)
  declare schedule: Schedule;

  @BelongsTo(() => Service)
  declare service: Service;

  get customJson(): JsonBooking {
    return {
      id: this.id,
      dateTime: adjustDateTimeToCurrentDate(this.schedule.dateTime),
      musician: this.schedule.musician?.musicianBookingJson,
      service: this.service.name,
      name: this.name,
    };
  }
}
