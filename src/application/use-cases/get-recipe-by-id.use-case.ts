import { Injectable, NotFoundException } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";

@Injectable()
export class GetRecipeByIdUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(id);

    if (!recipe) {
      throw new NotFoundException(`Recipe with ID ${id} not found`);
    }

    return recipe;
  }
}
