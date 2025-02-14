import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() 
export class Cliente {
  @PrimaryGeneratedColumn()
  clienteID!: number;

  @Column({ length: 50 })
  clientName!: string;

  @Column({ length: 50, unique: true })
  email!: string;

//   constructor(clientName: string, email: string) {
//     this.clienteID = 0; // Se sobrescribirá al insertarse en la BD
//     this.clientName = clientName;
//     this.email = email;
//   }
//   new Cliente("Juan", "juan@email.com")
}