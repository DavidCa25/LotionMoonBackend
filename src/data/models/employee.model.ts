import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Employee {
  @PrimaryGeneratedColumn()
  employeeID!: number;

  @Column({ length: 50 })
  employeeName!: string;

  @Column({ length: 50, unique: true })
  email!: string;

  @Column({ length: 50, unique: true })
  contrasena!: string;
}