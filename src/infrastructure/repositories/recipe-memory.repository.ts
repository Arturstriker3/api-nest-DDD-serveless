import { Injectable } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import {
  RecipeRepository,
  IFindAllOptions,
  IPaginatedResult,
} from "../../domain/repositories/recipe.repository";

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
    options: IFindAllOptions
  ): Promise<IPaginatedResult<Recipe>> {
    let allRecipes = Array.from(this.recipes.values());

    if (options.filters) {
      allRecipes = this.applyFilters(allRecipes, options.filters);
    }

    const total = allRecipes.length;

    if (options.page && options.limit) {
      const skip = (options.page - 1) * options.limit;
      allRecipes = allRecipes.slice(skip, skip + options.limit);
    }

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
    filters: IFindAllOptions["filters"]
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
