import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "../../domain/entities/recipe.entity";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";
import { CreateRecipeDto } from "../dtos/create-recipe.dto";

@Injectable()
export class CreateRecipeUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = Recipe.create(
      uuidv4(),
      createRecipeDto.title,
      createRecipeDto.description,
      createRecipeDto.ingredients
    );

    return await this.recipeRepository.save(recipe);
  }
}
