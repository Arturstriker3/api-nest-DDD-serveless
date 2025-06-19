import { ApiProperty } from "@nestjs/swagger";
import { Type, Transform } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsBoolean,
} from "class-validator";

export class DoctorScheduleFilterDto {
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
    description: "Filtrar por ID do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
    required: false,
  })
  @IsString()
  @IsOptional()
  doctorId?: string;

  @ApiProperty({
    description: "Filtrar por data disponível",
    example: "2024-06-18",
    format: "date",
    required: false,
  })
  @IsDateString()
  @IsOptional()
  availableDate?: string;

  @ApiProperty({
    description: "Filtrar por horário disponível",
    example: "14:30",
    required: false,
  })
  @IsString()
  @IsOptional()
  availableTime?: string;

  @ApiProperty({
    description: "Filtrar apenas horários disponíveis",
    example: true,
    required: false,
  })
  @Transform(({ value }) => {
    if (value === "true") return true;
    if (value === "false") return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
