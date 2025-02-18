import { ClienteModel } from "../../data/models/cliente.model";
import { IClienteDocument } from "../entities/cliente.entity";

export class ClienteDataSource {
    public async updateProduct(id: string, cliente: Partial<IClienteDocument>){
        await ClienteModel.findByIdAndUpdate(id, {
            clientName: cliente.clienteName,
            email: cliente.email
        })
    }
}