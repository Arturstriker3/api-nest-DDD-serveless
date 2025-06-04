import { GetRecipesPaginatedUseCase } from "../get-recipes-paginated.use-case";
import { RecipeRepository } from "../../../domain/repositories/recipe.repository";
import { IPaginatedResult } from "../../../domain/types/pagination.types";
import { Recipe } from "../../../domain/entities/recipe.entity";
import { RecipeFilterDto } from "../../dtos/recipe-filter.dto";

describe("GetRecipesPaginatedUseCase", () => {
  let useCase: GetRecipesPaginatedUseCase;
  let mockRepository: jest.Mocked<RecipeRepository>;

  beforeEach(() => {
    mockRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      findAllPaginated: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new GetRecipesPaginatedUseCase(mockRepository);
  });

  const createFilterDto = (
    props: Partial<RecipeFilterDto> = {}
  ): RecipeFilterDto => {
    const dto = new RecipeFilterDto();
    Object.assign(dto, {
      page: 1,
      limit: 10,
      ...props,
    });
    return dto;
  };

  describe("execute", () => {
    it("should return paginated recipes with default pagination", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
      });

      const expectedRecipes = [
        Recipe.create("1", "Recipe 1", "Description 1", ["ingredient1"]),
        Recipe.create("2", "Recipe 2", "Description 2", ["ingredient2"]),
      ];

      const expectedResult: IPaginatedResult<Recipe> = {
        data: expectedRecipes,
        total: 25,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      const result = await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledTimes(1);
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        1,
        10,
        undefined
      );
      expect(result).toEqual(expectedResult);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(25);
    });

    it("should apply filters when provided", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 5,
        title: "chocolate",
        description: "delicioso",
        ingredient: "farinha",
      });

      const expectedRecipes = [
        Recipe.create("1", "Bolo de Chocolate", "Delicioso bolo", [
          "farinha",
          "chocolate",
        ]),
      ];

      const expectedResult: IPaginatedResult<Recipe> = {
        data: expectedRecipes,
        total: 1,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      const result = await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledTimes(1);
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(1, 5, {
        title: "chocolate",
        description: "delicioso",
        ingredient: "farinha",
      });
      expect(result).toEqual(expectedResult);
    });

    it("should not include filters when none are provided", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 2,
        limit: 20,
      });

      const expectedResult: IPaginatedResult<Recipe> = {
        data: [],
        total: 0,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      const result = await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        2,
        20,
        undefined
      );
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
    });

    it("should include filters only for provided values", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
        title: "bolo",
      });

      const expectedResult: IPaginatedResult<Recipe> = {
        data: [],
        total: 0,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(1, 10, {
        title: "bolo",
        description: undefined,
        ingredient: undefined,
      });
    });

    it("should handle empty filter values correctly", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
        title: "",
        description: "",
        ingredient: "",
      });

      const expectedResult: IPaginatedResult<Recipe> = {
        data: [],
        total: 0,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        1,
        10,
        undefined
      );
    });

    it("should handle large page numbers", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 999,
        limit: 50,
      });

      const expectedResult: IPaginatedResult<Recipe> = {
        data: [],
        total: 100,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      const result = await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        999,
        50,
        undefined
      );
      expect(result.data).toEqual([]);
      expect(result.total).toBe(100);
    });

    it("should throw error when repository fails", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
      });

      const repositoryError = new Error("Repository failed");
      mockRepository.findAllPaginated.mockRejectedValue(repositoryError);

      // Act & Assert
      await expect(useCase.execute(filterDto)).rejects.toThrow(
        "Repository failed"
      );
      expect(mockRepository.findAllPaginated).toHaveBeenCalledTimes(1);
    });

    it("should not call any other repository methods", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
      });

      const expectedResult: IPaginatedResult<Recipe> = {
        data: [],
        total: 0,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(mockRepository.findById).not.toHaveBeenCalled();
      expect(mockRepository.findAll).not.toHaveBeenCalled();
      expect(mockRepository.delete).not.toHaveBeenCalled();
    });

    it("should handle edge case with limit 1", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 5,
        limit: 1,
      });

      const expectedResult: IPaginatedResult<Recipe> = {
        data: [],
        total: 0,
      };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        5,
        1,
        undefined
      );
    });

    it("should handle edge case with large limit", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 1000,
      });

      const expectedResult: IPaginatedResult<Recipe> = { data: [], total: 0 };

      mockRepository.findAllPaginated.mockResolvedValue(expectedResult);

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        1,
        1000,
        undefined
      );
    });
  });

  describe("hasFilters", () => {
    it("should detect when filters are provided", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
        title: "test",
      });

      mockRepository.findAllPaginated.mockResolvedValue({ data: [], total: 0 });

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        1,
        10,
        expect.objectContaining({
          title: "test",
        })
      );
    });

    it("should detect when no filters are provided", async () => {
      // Arrange
      const filterDto = createFilterDto({
        page: 1,
        limit: 10,
      });

      mockRepository.findAllPaginated.mockResolvedValue({ data: [], total: 0 });

      // Act
      await useCase.execute(filterDto);

      // Assert
      expect(mockRepository.findAllPaginated).toHaveBeenCalledWith(
        1,
        10,
        undefined
      );
    });
  });
});
