import { PartialType } from "@nestjs/mapped-types";
import { BankingDetailsDto } from "./banking-details.dto";

export class UpdateBankingDetailsDto extends PartialType(BankingDetailsDto) {
    id: string
}