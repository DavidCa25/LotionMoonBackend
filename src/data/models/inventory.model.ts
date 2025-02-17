import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./producto.model";
import { Sale } from "./venta.model"
import { Purchase } from "./compra.model";

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

  @ManyToOne(() => Sale, (sale) => sale.inventory)
  sale!: Sale;

  @ManyToOne(() => Purchase, (purchase) => purchase.inventory)
  purchase!: Purchase;
}