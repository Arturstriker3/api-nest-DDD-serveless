import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, MinLength, MaxLength } from "class-validator";

export class UpdateAppointmentDto {
  @ApiProperty({
    description: "Nome completo do paciente",
    example: "João Silva Santos",
    minLength: 2,
    maxLength: 100,
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(100)
  patientName?: string;
}
