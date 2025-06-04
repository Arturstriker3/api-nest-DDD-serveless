import { Injectable } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import {
  RecipeRepository,
  IRecipeFilterOptions,
} from "../../domain/repositories/recipe.repository";
import { IPaginatedResult } from "../../domain/types/pagination.types";

@Injectable()
export class RecipeMemoryRepository extends RecipeRepository {
  private recipes: Map<string, Recipe> = new Map();

  async save(recipe: Recipe): Promise<Recipe> {
    this.recipes.set(recipe.id, recipe);
    return recipe;
  }

  async findById(id: string): Promise<Recipe | null> {
    return this.recipes.get(id) || null;
  }

  async findAll(): Promise<Recipe[]> {
    return Array.from(this.recipes.values());
  }

  async findAllPaginated(
    page: number,
    limit: number,
    filters?: IRecipeFilterOptions
  ): Promise<IPaginatedResult<Recipe>> {
    let allRecipes = Array.from(this.recipes.values());

    if (filters) {
      allRecipes = this.applyFilters(allRecipes, filters);
    }

    const total = allRecipes.length;

    const skip = (page - 1) * limit;
    allRecipes = allRecipes.slice(skip, skip + limit);

    return {
      data: allRecipes,
      total,
    };
  }

  async delete(id: string): Promise<void> {
    this.recipes.delete(id);
  }

  private applyFilters(
    recipes: Recipe[],
    filters: IRecipeFilterOptions
  ): Recipe[] {
    if (!filters) return recipes;

    return recipes.filter((recipe) => {
      if (
        filters.title &&
        !this.containsIgnoreCase(recipe.title, filters.title)
      ) {
        return false;
      }

      if (
        filters.description &&
        !this.containsIgnoreCase(recipe.description, filters.description)
      ) {
        return false;
      }

      if (
        filters.ingredient &&
        !this.hasIngredient(recipe.ingredients, filters.ingredient)
      ) {
        return false;
      }

      return true;
    });
  }

  private containsIgnoreCase(text: string, search: string): boolean {
    return text.toLowerCase().includes(search.toLowerCase());
  }

  private hasIngredient(ingredients: string[], search: string): boolean {
    return ingredients.some((ingredient) =>
      this.containsIgnoreCase(ingredient, search)
    );
  }
}
