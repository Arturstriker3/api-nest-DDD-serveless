import { Recipe } from "../entities/recipe.entity";
import { IPaginatedResult } from "../types/pagination.types";

export interface IRecipeFilterOptions {
  title?: string;
  description?: string;
  ingredient?: string;
}

export interface IRecipeRepository {
  create(recipe: Recipe): Promise<Recipe>;
  findById(id: string): Promise<Recipe | null>;
  findAll(): Promise<Recipe[]>;
  findAllPaginated(
    page: number,
    limit: number,
    filters?: IRecipeFilterOptions
  ): Promise<IPaginatedResult<Recipe>>;
}

export abstract class RecipeRepository {
  abstract save(recipe: Recipe): Promise<Recipe>;
  abstract findById(id: string): Promise<Recipe | null>;
  abstract findAll(): Promise<Recipe[]>;
  abstract findAllPaginated(
    page: number,
    limit: number,
    filters?: IRecipeFilterOptions
  ): Promise<IPaginatedResult<Recipe>>;
  abstract delete(id: string): Promise<void>;
}
