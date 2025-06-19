import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({
    description: "Nome completo do médico",
    example: "Dr. João Silva",
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: "Especialidade médica do doutor",
    example: "Cardiologia",
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  specialty: string;

  @ApiProperty({
    description: "IDs dos horários disponíveis do médico",
    example: [
      "s47ac10b-58cc-4372-a567-0e02b2c3d479",
      "s47ac10b-58cc-4372-a567-0e02b2c3d480",
    ],
    required: false,
    type: [String],
  })
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  availableSchedules?: string[];
}
