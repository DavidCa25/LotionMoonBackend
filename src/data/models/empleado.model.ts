import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Sale } from "./venta.model";
import { Purchase } from "./compra.model";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employeeID!: number;

  @Column({ length: 50 })
  employeeName!: string;

  @Column({ length: 50 })
  email!: string;

  @Column({ length: 50 })
  contrasena!: string;

  @OneToMany(() => Sale, (sale) => sale.empleado)
  sales!: Sale[];

  @OneToMany(() => Purchase, (purchase) => purchase.empleado)
  purchases!: Purchase[];
}
