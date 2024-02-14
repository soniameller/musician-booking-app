import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import Musician from './musician';
import { adjustDateTimeToCurrentDate } from './../../utils/utils';
import { JsonSchedule } from '@shared-utils';
import Booking from './booking';

@Table({
  timestamps: true,
  tableName: 'schedules',
  modelName: 'Schedule',
})
export default class Schedule extends Model {
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare dateTime: Date;

  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare musicianId: number;

  @BelongsTo(() => Musician)
  declare musician: Musician;

  @HasMany(() => Booking)
  declare bookings: Booking[];

  get customJson(): JsonSchedule {
    return {
      id: this.id,
      dateTime: adjustDateTimeToCurrentDate(this.dateTime),
      musician: this.musician?.musicianBookingJson,
      booked: !!this.bookings?.length,
    };
  }
}
