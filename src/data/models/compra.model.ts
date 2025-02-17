import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Employee } from "./empleado.model";
import { Inventory } from "./inventory.model";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  purchaseID!: number;

  @Column("datetime")
  creationPurchase!: Date;

  @Column("float")
  total!: number;

  @Column({ length: 50 })
  provider!: string;

  @ManyToOne(() => Employee, (empleado) => empleado.purchases)
  empleado!: Employee;

  @ManyToOne(() => Inventory, (inventory) => inventory.purchase)
  inventory!: Inventory;
}
