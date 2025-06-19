import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  Matches,
} from "class-validator";

export class CreateDoctorScheduleDto {
  @ApiProperty({
    description: "ID do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    description: "Data disponível para consulta",
    example: "2024-06-18",
    format: "date",
  })
  @IsDateString()
  @IsNotEmpty()
  availableDate: string;

  @ApiProperty({
    description: "Horário disponível (formato HH:MM)",
    example: "14:30",
    pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "availableTime must be in HH:MM format (00:00 to 23:59)",
  })
  availableTime: string;
}
