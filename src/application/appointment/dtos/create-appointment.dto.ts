import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    description: "ID do horário do médico",
    example: "sch-1",
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
