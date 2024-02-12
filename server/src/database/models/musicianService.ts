import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import Musician from './musician';
import Service from './service';

@Table({
  timestamps: true,
  tableName: 'musician_services',
  modelName: 'MusicianService',
})
export default class MusicianService extends Model {
  @ForeignKey(() => Musician)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare musicianId: number;

  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare serviceId: number;
}
