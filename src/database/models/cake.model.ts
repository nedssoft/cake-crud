import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'cakes',
})
export class Cake extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column(DataType.TEXT)
  comment: string;

  @Column
  imageUrl: string;
  
  @Column
  yumFactor: number;
}
