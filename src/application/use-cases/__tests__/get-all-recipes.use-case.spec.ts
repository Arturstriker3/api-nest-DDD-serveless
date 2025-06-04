import { GetAllRecipesUseCase } from "../get-all-recipes.use-case";
import { RecipeRepository } from "../../../domain/repositories/recipe.repository";
import { Recipe } from "../../../domain/entities/recipe.entity";

describe("GetAllRecipesUseCase", () => {
  let useCase: GetAllRecipesUseCase;
  let mockRepository: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findAllPaginated: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetAllRecipesUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return all recipes successfully", async () => {
      // Arrange
      const expectedRecipes = [
        Recipe.create("1", "Recipe 1", "Description 1", ["ingredient1"]),
        Recipe.create("2", "Recipe 2", "Description 2", ["ingredient2"]),
        Recipe.create("3", "Recipe 3", "Description 3", ["ingredient3"]),
      ];

      mockRepository.findAll.mockResolvedValue(expectedRecipes);

      // Act
      const result = await useCase.execute();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(mockRepository.findAll).toHaveBeenCalledWith();
      expect(result).toEqual(expectedRecipes);
      expect(result).toHaveLength(3);
    });

    it("should return empty array when no recipes exist", async () => {
      // Arrange
      mockRepository.findAll.mockResolvedValue([]);

      // Act
      const result = await useCase.execute();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it("should return single recipe when only one exists", async () => {
      // Arrange
      const singleRecipe = [
        Recipe.create("1", "Single Recipe", "Single Description", [
          "ingredient1",
        ]),
      ];

      mockRepository.findAll.mockResolvedValue(singleRecipe);

      // Act
      const result = await useCase.execute();

      // Assert
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(singleRecipe);
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe("Single Recipe");
    });

    it("should throw error when repository findAll fails", async () => {
      // Arrange
      const repositoryError = new Error("Repository findAll failed");
      mockRepository.findAll.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(useCase.execute()).rejects.toThrow(
        "Repository findAll failed"
      );
      expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it("should not call any other repository methods", async () => {
      // Arrange
      const expectedRecipes = [
        Recipe.create("1", "Recipe 1", "Description 1", ["ingredient1"]),
      ];
      mockRepository.findAll.mockResolvedValue(expectedRecipes);

      // Act
      await useCase.execute();

      // Assert
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.findById).not.toHaveBeenCalled();
      expect(mockRepository.findAllPaginated).not.toHaveBeenCalled();
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });
  });
});
