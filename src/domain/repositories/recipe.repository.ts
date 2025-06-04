import { Recipe } from "../entities/recipe.entity";

export interface IFindAllOptions {
  page?: number;
  limit?: number;
  filters?: {
    title?: string;
    description?: string;
    ingredient?: string;
  };
}

export interface IPaginatedResult<T> {
  data: T[];
  total: number;
}

export abstract class RecipeRepository {
  abstract save(recipe: Recipe): Promise<Recipe>;
  abstract findById(id: string): Promise<Recipe | null>;
  abstract findAll(): Promise<Recipe[]>;
  abstract findAllPaginated(
    options: IFindAllOptions
  ): Promise<IPaginatedResult<Recipe>>;
  abstract delete(id: string): Promise<void>;
}
