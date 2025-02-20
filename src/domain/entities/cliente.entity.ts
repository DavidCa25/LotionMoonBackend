export interface ICliente{
    clienteName: string;
    email: string;
}

export interface IClienteDocument extends Document, ICliente {}