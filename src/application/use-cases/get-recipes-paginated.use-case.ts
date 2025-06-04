import { Injectable } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import {
  RecipeRepository,
  IRecipeFilterOptions,
} from "../../domain/repositories/recipe.repository";
import { IPaginatedResult } from "../../domain/types/pagination.types";
import { RecipeFilterDto } from "../dtos/recipe-filter.dto";

@Injectable()
export class GetRecipesPaginatedUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(filterDto: RecipeFilterDto): Promise<IPaginatedResult<Recipe>> {
    const filters: IRecipeFilterOptions | undefined = this.hasFilters(filterDto)
      ? {
          title: filterDto.title,
          description: filterDto.description,
          ingredient: filterDto.ingredient,
        }
      : undefined;

    return await this.recipeRepository.findAllPaginated(
      filterDto.page,
      filterDto.limit,
      filters
    );
  }

  private hasFilters(filterDto: RecipeFilterDto): boolean {
    return !!(filterDto.title || filterDto.description || filterDto.ingredient);
  }
}
