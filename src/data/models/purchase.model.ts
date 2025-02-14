import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Sale {
  @PrimaryGeneratedColumn()
  purchaseID!: number;

  @Column({ length: 50 })
  creationPurchase!: Date;

  @Column({ length: 50, unique: true })
  total!: Float32Array;

  @Column({ length: 50, unique: true })
  provider!: String;

  
}