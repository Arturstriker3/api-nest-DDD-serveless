import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    description: "ID do horário do médico",
    example: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @IsString()
  @IsNotEmpty()
  doctorScheduleId: string;

  @ApiProperty({
    description: "Nome completo do paciente",
    example: "João Silva Santos",
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  patientName: string;
}
