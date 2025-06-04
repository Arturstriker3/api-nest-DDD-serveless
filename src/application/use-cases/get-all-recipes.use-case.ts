import { Injectable } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";

@Injectable()
export class GetAllRecipesUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(): Promise<Recipe[]> {
    return await this.recipeRepository.findAll();
  }
}
