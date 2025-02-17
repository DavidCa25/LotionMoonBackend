import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cliente } from "./cliente.model";
import { Employee } from "./empleado.model";
import { Inventory } from "./inventory.model";

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  saleID!: number;

  @Column("date")
  creationDate!: Date;

  @Column("float")
  total!: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.sales)
  cliente!: Cliente;

  @ManyToOne(() => Employee, (empleado) => empleado.sales)
  empleado!: Employee;

  @ManyToOne(() => Inventory, (inventory) => inventory.sale)
  inventory!: Inventory;
}
