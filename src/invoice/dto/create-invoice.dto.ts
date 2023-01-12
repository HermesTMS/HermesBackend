export class CreateInvoiceDto {
    invoiceNumber: string;
    amount: number;
    tax: number;
    price: number;
    qty: number;
    total: number;
    clientId: string;
}
