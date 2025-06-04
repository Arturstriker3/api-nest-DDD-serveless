import { Injectable } from "@nestjs/common";
import { Recipe } from "../../domain/entities/recipe.entity";
import {
  RecipeRepository,
  IFindAllOptions,
  IPaginatedResult,
} from "../../domain/repositories/recipe.repository";
import { RecipeFilterDto } from "../dtos/recipe-filter.dto";

@Injectable()
export class GetRecipesPaginatedUseCase {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async execute(filterDto: RecipeFilterDto): Promise<IPaginatedResult<Recipe>> {
    const options: IFindAllOptions = {
      page: filterDto.page,
      limit: filterDto.limit,
    };

    if (this.hasFilters(filterDto)) {
      options.filters = {
        title: filterDto.title,
        description: filterDto.description,
        ingredient: filterDto.ingredient,
      };
    }

    return await this.recipeRepository.findAllPaginated(options);
  }

  private hasFilters(filterDto: RecipeFilterDto): boolean {
    return !!(filterDto.title || filterDto.description || filterDto.ingredient);
  }
}
