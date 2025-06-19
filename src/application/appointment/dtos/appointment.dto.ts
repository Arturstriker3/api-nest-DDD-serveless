import { ApiProperty } from "@nestjs/swagger";

export class AppointmentDto {
  @ApiProperty({
    description: "ID único do agendamento",
    example: "a47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  id: string;

  @ApiProperty({
    description: "ID do horário do médico",
    example: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  doctorScheduleId: string;

  @ApiProperty({
    description: "Nome completo do paciente",
    example: "João Silva Santos",
  })
  patientName: string;

  @ApiProperty({
    description: "Nome do paciente formatado",
    example: "João Silva Santos",
  })
  patientNameFormatted: string;

  @ApiProperty({
    description: "Data de criação do agendamento",
    example: "2024-01-15T10:30:00Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Data da última atualização",
    example: "2024-01-15T10:30:00Z",
  })
  updatedAt: Date;

  constructor(
    id: string,
    doctorScheduleId: string,
    patientName: string,
    patientNameFormatted: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.doctorScheduleId = doctorScheduleId;
    this.patientName = patientName;
    this.patientNameFormatted = patientNameFormatted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
