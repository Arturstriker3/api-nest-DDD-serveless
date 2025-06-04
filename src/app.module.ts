import { Module } from "@nestjs/common";
import { RecipeController } from "./presentation/controllers/recipe.controller";
import { RecipePresenter } from "./presentation/presenters/recipe.presenter";
import { CreateRecipeUseCase } from "./application/use-cases/create-recipe.use-case";
import { GetAllRecipesUseCase } from "./application/use-cases/get-all-recipes.use-case";
import { GetRecipeByIdUseCase } from "./application/use-cases/get-recipe-by-id.use-case";
import { GetRecipesPaginatedUseCase } from "./application/use-cases/get-recipes-paginated.use-case";
import { RecipeRepository } from "./domain/repositories/recipe.repository";
import { RecipeMemoryRepository } from "./infrastructure/repositories/recipe-memory.repository";

@Module({
  imports: [],
  controllers: [RecipeController],
  providers: [
    RecipePresenter,
    CreateRecipeUseCase,
    GetAllRecipesUseCase,
    GetRecipeByIdUseCase,
    GetRecipesPaginatedUseCase,
    {
      provide: RecipeRepository,
      useClass: RecipeMemoryRepository,
    },
  ],
})
export class AppModule {}
