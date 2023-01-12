import { ExpenseStatus } from "../entities/expenseStatus";

export class CreateExpenseDto {
    name: string;
    description: string;
    status: ExpenseStatus;
    amount: number;
}
