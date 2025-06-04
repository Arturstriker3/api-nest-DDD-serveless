import { IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "./pagination.dto";

export class RecipeFilterDto extends PaginationDto {
  @ApiPropertyOptional({
    description: "Filtrar receitas por título (busca parcial)",
    example: "chocolate",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: "Filtrar receitas por descrição (busca parcial)",
    example: "delicioso",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: "Filtrar receitas por ingrediente (busca parcial)",
    example: "farinha",
  })
  @IsOptional()
  @IsString()
  ingredient?: string;
}
