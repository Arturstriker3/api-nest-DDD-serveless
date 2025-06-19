import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";

export class AppointmentFilterDto {
  @ApiProperty({
    description: "Número da página",
    example: 1,
    minimum: 1,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    description: "Número de itens por página",
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit: number = 10;

  @ApiProperty({
    description: "Filtrar por ID do horário do médico",
    example: "sch-1",
    required: false,
  })
  @IsString()
  @IsOptional()
  doctorScheduleId?: string;

  @ApiProperty({
    description: "Filtrar por nome do paciente (busca parcial)",
    example: "João",
    required: false,
  })
  @IsString()
  @IsOptional()
  patientName?: string;
}
