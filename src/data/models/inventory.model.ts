import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./producto.model";

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  inventoryID!: number;

  @Column()
  stock!: number;

  @Column()
  minimunStock!: number;

  @Column()
  maximunStock!: number;

  @ManyToOne(() => Product, (product) => product.inventory, { onDelete: "CASCADE" })
  product!: Product;
}