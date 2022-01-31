import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Deal } from './deal.model';

@Table({
  tableName: 'orders',
})
export class Order extends Model {
  @PrimaryKey
  @Column({ autoIncrement: true })
  id: number;

  @ForeignKey(() => Deal)
  @Column
  deal_id: number;

  @Column(DataType.DECIMAL)
  price: number;

  @Column(DataType.DECIMAL)
  qty: number;

  @Column
  side: string;

  @Column({ defaultValue: 0 })
  pd: number;

  @Column
  order_type: string;

  @Column
  exchange_uid: string;

  @Column
  order_link_id: string;

  @Column({ defaultValue: 'new' })
  status: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;

  @BelongsTo(() => Deal, 'deal_id')
  deal: Deal;
}
