import { ApiProperty } from "@nestjs/swagger";

export class RecipeDto {
  @ApiProperty({
    description: "ID único da receita",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  id: string;

  @ApiProperty({
    description: "Título da receita",
    example: "Bolo de Chocolate",
  })
  title: string;

  @ApiProperty({
    description: "Descrição da receita",
    example: "Um delicioso bolo de chocolate caseiro",
  })
  description: string;

  @ApiProperty({
    description: "Lista de ingredientes da receita",
    example: ["chocolate", "farinha", "ovos", "açúcar"],
    type: [String],
  })
  ingredients: string[];

  @ApiProperty({
    description: "Data de criação da receita",
    example: "2024-01-01T10:00:00.000Z",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Data da última atualização da receita",
    example: "2024-01-01T10:00:00.000Z",
  })
  updatedAt: Date;

  constructor(
    id: string,
    title: string,
    description: string,
    ingredients: string[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
