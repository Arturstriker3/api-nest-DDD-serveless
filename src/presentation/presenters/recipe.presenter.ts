import { Injectable } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import { RecipeDto } from "../../application/dtos/recipe.dto";

@Injectable()
export class RecipePresenter {
  toDto(recipe: Recipe): RecipeDto {
    return new RecipeDto(
      recipe.id,
      recipe.title,
      recipe.description,
      recipe.ingredients,
      recipe.createdAt,
      recipe.updatedAt
    );
  }

  toDtoList(recipes: Recipe[]): RecipeDto[] {
    return recipes.map((recipe) => this.toDto(recipe));
  }
}
