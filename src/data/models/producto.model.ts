import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Inventory } from "./inventory.model";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productID!: number;

  @Column({ length: 100 })
  productName!: string;

  @Column()
  price!: number;

  @Column({ length: 30 })
  brand!: string;

  @Column({ length: 100 })
  descripcion!: string;

  // Relación inversa con Inventory
  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventory!: Inventory[];
}
