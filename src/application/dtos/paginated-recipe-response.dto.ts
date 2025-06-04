import { ApiProperty } from "@nestjs/swagger";
import { RecipeDto } from "./recipe.dto";

export class PaginationMetaResponseDto {
  @ApiProperty({
    description: "Página atual",
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: "Quantidade de itens por página",
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: "Total de itens encontrados",
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: "Total de páginas",
    example: 3,
  })
  totalPages: number;

  @ApiProperty({
    description: "Indica se há próxima página",
    example: true,
  })
  hasNext: boolean;

  @ApiProperty({
    description: "Indica se há página anterior",
    example: false,
  })
  hasPrev: boolean;
}

export class PaginatedRecipeResponseDto {
  @ApiProperty({
    description: "Lista de receitas da página atual",
    type: [RecipeDto],
  })
  data: RecipeDto[];

  @ApiProperty({
    description: "Metadados da paginação",
    type: PaginationMetaResponseDto,
  })
  meta: PaginationMetaResponseDto;
}
