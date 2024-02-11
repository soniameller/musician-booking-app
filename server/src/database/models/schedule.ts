import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  DataType,
} from 'sequelize-typescript';
import Musician from './musician';

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
}
