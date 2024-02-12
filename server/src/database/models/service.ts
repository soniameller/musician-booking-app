import {
  Table,
  Column,
  Model,
  BelongsToMany,
  DataType,
} from 'sequelize-typescript';
import Musician from './musician';
import MusicianService from './musicianService';
import { JsonService } from '@shared-utils';

@Table({
  timestamps: true,
  tableName: 'services',
  modelName: 'Service',
})
export default class Service extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @BelongsToMany(() => Musician, () => MusicianService)
  declare musicians: Musician[];

  get customJson(): JsonService {
    return {
      id:this.id,
      name: this.name,
      musicians: this.musicians?.map((musician) => musician.customJson),
    };
  }
}
