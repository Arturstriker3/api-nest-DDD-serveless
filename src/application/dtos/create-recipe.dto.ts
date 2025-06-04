import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRecipeDto {
  @ApiProperty({
    description: "Título da receita",
    example: "Bolo de Chocolate",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: "Descrição da receita",
    example: "Um delicioso bolo de chocolate caseiro",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: "Lista de ingredientes da receita",
    example: ["chocolate", "farinha", "ovos", "açúcar"],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  ingredients: string[];
}
