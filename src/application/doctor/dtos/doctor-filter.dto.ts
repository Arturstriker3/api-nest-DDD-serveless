import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsInt, Min, Max } from "class-validator";

export class DoctorFilterDto {
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
    description: "Filtrar por nome do médico (busca parcial)",
    example: "João",
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "Filtrar por especialidade (busca parcial)",
    example: "Cardiologia",
    required: false,
  })
  @IsString()
  @IsOptional()
  specialty?: string;
}
