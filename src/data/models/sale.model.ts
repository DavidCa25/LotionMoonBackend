import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Sale {
  @PrimaryGeneratedColumn()
  saleID!: number;

  @Column({ length: 50 })
  creationDate!: Date;

  @Column({ length: 50, unique: true })
  total!: Float32Array;

    

}