import { GetRecipeByIdUseCase } from "../get-recipe-by-id.use-case";
import { RecipeRepository } from "../../../domain/repositories/recipe.repository";
import { Recipe } from "../../../domain/entities/recipe.entity";
import { NotFoundException } from "@nestjs/common";

describe("GetRecipeByIdUseCase", () => {
  let useCase: GetRecipeByIdUseCase;
  let mockRepository: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findAllPaginated: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetRecipeByIdUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should return recipe when found", async () => {
      // Arrange
      const recipeId = "123e4567-e89b-12d3-a456-426614174000";
      const expectedRecipe = Recipe.create(
        recipeId,
        "Bolo de Chocolate",
        "Um delicioso bolo de chocolate",
        ["chocolate", "farinha", "ovos", "açúcar"]
      );

      mockRepository.findById.mockResolvedValue(expectedRecipe);

      // Act
      const result = await useCase.execute(recipeId);

      // Assert
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findById).toHaveBeenCalledWith(recipeId);
      expect(result).toEqual(expectedRecipe);
      expect(result.id).toBe(recipeId);
      expect(result.title).toBe("Bolo de Chocolate");
    });

    it("should throw NotFoundException when recipe not found", async () => {
      // Arrange
      const recipeId = "non-existent-id";
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(recipeId)).rejects.toThrow(
        NotFoundException
      );
      await expect(useCase.execute(recipeId)).rejects.toThrow(
        `Recipe with ID ${recipeId} not found`
      );
      expect(mockRepository.findById).toHaveBeenCalledTimes(2);
      expect(mockRepository.findById).toHaveBeenCalledWith(recipeId);
    });

    it("should handle empty string id", async () => {
      // Arrange
      const emptyId = "";
      mockRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(useCase.execute(emptyId)).rejects.toThrow(NotFoundException);
      await expect(useCase.execute(emptyId)).rejects.toThrow(
        `Recipe with ID ${emptyId} not found`
      );
      expect(mockRepository.findById).toHaveBeenCalledWith(emptyId);
    });

    it("should throw error when repository findById fails", async () => {
      // Arrange
      const recipeId = "test-id";
      const repositoryError = new Error("Database connection failed");
      mockRepository.findById.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(useCase.execute(recipeId)).rejects.toThrow(
        "Database connection failed"
      );
      expect(mockRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockRepository.findById).toHaveBeenCalledWith(recipeId);
    });

    it("should not call any other repository methods", async () => {
      // Arrange
      const recipeId = "test-id";
      const expectedRecipe = Recipe.create(
        recipeId,
        "Test Recipe",
        "Test Description",
        ["ingredient1"]
      );
      mockRepository.findById.mockResolvedValue(expectedRecipe);

      // Act
      await useCase.execute(recipeId);

      // Assert
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.findAll).not.toHaveBeenCalled();
      expect(mockRepository.findAllPaginated).not.toHaveBeenCalled();
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it("should handle special characters in ID", async () => {
      // Arrange
      const specialId = "recipe-with-special@chars#123";
      const expectedRecipe = Recipe.create(
        specialId,
        "Special Recipe",
        "Recipe with special ID",
        ["ingredient1"]
      );
      mockRepository.findById.mockResolvedValue(expectedRecipe);

      // Act
      const result = await useCase.execute(specialId);

      // Assert
      expect(mockRepository.findById).toHaveBeenCalledWith(specialId);
      expect(result).toEqual(expectedRecipe);
      expect(result.id).toBe(specialId);
    });
  });
});
