import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import Schedule from './schedule';
import Service from './service';
import MusicianService from './musicianService';
import { JsonMusician } from '@shared-utils';

@Table({
  timestamps: true,
  tableName: 'musicians',
  modelName: 'Musician',
})
export default class Musician extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare enabled: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare avatar: string;

  @HasMany(() => Schedule)
  declare schedules: Schedule[];

  @BelongsToMany(() => Service, () => MusicianService)
  declare services: Service[];

  get customJson(): JsonMusician {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      schedules: this.schedules?.map(
        (schedule) => schedule.customJson.dateTime
      ),
      services: this.services?.map((service) => service.customJson.name),
    };
  }
}
