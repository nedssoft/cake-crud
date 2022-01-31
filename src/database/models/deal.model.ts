import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import { Order } from './order.model';
@Table({
  tableName: 'deals',
})
export class Deal extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @Column
  symbol: string;

  @Column(DataType.DECIMAL)
  base_qty: number;

  @Column(DataType.DECIMAL)
  safety_qty: number;

  @Column
  safety_count: number;

  @Column({ type: DataType.DECIMAL, defaultValue: 0 })
  take_profit: number;

  @Column
  ss: number;

  @Column
  vs: number;

  @Column
  leverage: number;

  @Column({ defaultValue: 'open' })
  status: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @HasMany(() => Order, 'deal_id')
  orders: Order[];
}
