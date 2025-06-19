import { ApiProperty } from "@nestjs/swagger";

export class DoctorDto {
  @ApiProperty({
    description: "ID único do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "Nome completo do médico",
    example: "Dr. João Silva",
  })
  name: string;

  @ApiProperty({
    description: "Especialidade médica",
    example: "Cardiologia",
  })
  specialty: string;

  @ApiProperty({
    description:
      "IDs dos horários disponíveis (gerenciado manualmente via update, use /doctor-schedules para buscar horários)",
    example: [],
    type: [String],
  })
  availableSchedules: string[];

  @ApiProperty({
    description: "Data de criação do registro",
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
    name: string,
    specialty: string,
    availableSchedules: string[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
    this.availableSchedules = availableSchedules;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
