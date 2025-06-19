import { ApiProperty } from "@nestjs/swagger";

export class DoctorScheduleDto {
  @ApiProperty({
    description: "ID único do horário",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "ID do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  doctorId: string;

  @ApiProperty({
    description: "Data disponível para consulta",
    example: "2024-06-18T00:00:00.000Z",
  })
  availableDate: Date;

  @ApiProperty({
    description: "Horário disponível",
    example: "14:30",
  })
  availableTime: string;

  @ApiProperty({
    description: "ID do agendamento (null = horário disponível)",
    example: null,
    nullable: true,
  })
  appointmentId: string | null;

  @ApiProperty({
    description: "Indica se o horário está disponível",
    example: true,
  })
  isAvailable: boolean;

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
    doctorId: string,
    availableDate: Date,
    availableTime: string,
    appointmentId: string | null,
    isAvailable: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.doctorId = doctorId;
    this.availableDate = availableDate;
    this.availableTime = availableTime;
    this.appointmentId = appointmentId;
    this.isAvailable = isAvailable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
