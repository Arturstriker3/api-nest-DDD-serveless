import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDateString, IsOptional, Matches } from "class-validator";

export class UpdateDoctorScheduleDto {
  @ApiProperty({
    description: "Data disponível para consulta",
    example: "2024-06-18",
    format: "date",
    required: false,
  })
  @IsDateString()
  @IsOptional()
  availableDate?: string;

  @ApiProperty({
    description: "Horário disponível (formato HH:MM)",
    example: "14:30",
    pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$",
    required: false,
  })
  @IsString()
  @IsOptional()
  @Matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "availableTime must be in HH:MM format (00:00 to 23:59)",
  })
  availableTime?: string;

  @ApiProperty({
    description: "ID do agendamento (null = horário disponível)",
    example: null,
    required: false,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  appointmentId?: string | null;
}
