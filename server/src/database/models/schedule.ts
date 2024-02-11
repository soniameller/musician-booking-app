import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import Musician, { JsonMusician } from './musician';
import Service from './service';
import { adjustDateTimeToCurrentDate } from './../../utils/utils';

export type JsonSchedule = {
  dateTime: Date;
  booked: boolean;
  name?: string;
  musician?: JsonMusician;
  service?: string;
};

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

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare booked: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare name: string | null;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare serviceId: number;

  @BelongsTo(() => Service)
  declare service: Service;

  get customJson(): JsonSchedule {
    return {
      dateTime: adjustDateTimeToCurrentDate(this.dateTime),
      name: this.name,
      musician: this.musician?.customJson,
      service: this.service?.name,
      booked: this.booked,
    };
  }
}
