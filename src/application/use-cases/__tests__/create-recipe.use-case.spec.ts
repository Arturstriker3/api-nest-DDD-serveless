import { CreateRecipeUseCase } from "../create-recipe.use-case";
import { RecipeRepository } from "../../../domain/repositories/recipe.repository";
import { Recipe } from "../../../domain/entities/recipe.entity";
import { CreateRecipeDto } from "../../dtos/create-recipe.dto";

describe("CreateRecipeUseCase", () => {
  let useCase: CreateRecipeUseCase;
  let mockRepository: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findAllPaginated: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new CreateRecipeUseCase(mockRepository);
  });

  describe("execute", () => {
    it("should create and save a recipe successfully", async () => {
      // Arrange
      const createRecipeDto: CreateRecipeDto = {
        title: "Bolo de Chocolate",
        description: "Um delicioso bolo de chocolate",
        ingredients: ["chocolate", "farinha", "ovos", "açúcar"],
      };

      const expectedRecipe = Recipe.create(
        "any-id",
        createRecipeDto.title,
        createRecipeDto.description,
        createRecipeDto.ingredients
      );

      mockRepository.save.mockResolvedValue(expectedRecipe);

      // Act
      const result = await useCase.execute(createRecipeDto);

      // Assert
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
      expect(mockRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: createRecipeDto.title,
          description: createRecipeDto.description,
          ingredients: createRecipeDto.ingredients,
        })
      );
      expect(result).toEqual(expectedRecipe);
      expect(result.title).toBe(createRecipeDto.title);
      expect(result.description).toBe(createRecipeDto.description);
      expect(result.ingredients).toEqual(createRecipeDto.ingredients);
    });

    it("should generate unique id for each recipe", async () => {
      // Arrange
      const createRecipeDto: CreateRecipeDto = {
        title: "Test Recipe",
        description: "Test Description",
        ingredients: ["ingredient1", "ingredient2"],
      };

      let capturedRecipe: Recipe;
      mockRepository.save.mockImplementation((recipe: Recipe) => {
        capturedRecipe = recipe;
        return Promise.resolve(recipe);
      });

      // Act
      await useCase.execute(createRecipeDto);

      // Assert
      expect(capturedRecipe!.id).toBeDefined();
      expect(typeof capturedRecipe!.id).toBe("string");
      expect(capturedRecipe!.id.length).toBeGreaterThan(0);
    });

    it("should set createdAt and updatedAt dates", async () => {
      // Arrange
      const createRecipeDto: CreateRecipeDto = {
        title: "Test Recipe",
        description: "Test Description",
        ingredients: ["ingredient1"],
      };

      const beforeExecution = new Date();

      let capturedRecipe: Recipe;
      mockRepository.save.mockImplementation((recipe: Recipe) => {
        capturedRecipe = recipe;
        return Promise.resolve(recipe);
      });

      // Act
      await useCase.execute(createRecipeDto);

      const afterExecution = new Date();

      // Assert
      expect(capturedRecipe!.createdAt).toBeDefined();
      expect(capturedRecipe!.updatedAt).toBeDefined();
      expect(capturedRecipe!.createdAt.getTime()).toBeGreaterThanOrEqual(
        beforeExecution.getTime()
      );
      expect(capturedRecipe!.createdAt.getTime()).toBeLessThanOrEqual(
        afterExecution.getTime()
      );
      expect(capturedRecipe!.createdAt).toEqual(capturedRecipe!.updatedAt);
    });

    it("should throw error when repository save fails", async () => {
      // Arrange
      const createRecipeDto: CreateRecipeDto = {
        title: "Test Recipe",
        description: "Test Description",
        ingredients: ["ingredient1"],
      };

      const repositoryError = new Error("Repository save failed");
      mockRepository.save.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(useCase.execute(createRecipeDto)).rejects.toThrow(
        "Repository save failed"
      );
      expect(mockRepository.save).toHaveBeenCalledTimes(1);
    });
  });
});
