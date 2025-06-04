import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
import { CreateRecipeDto } from "../../application/dtos/create-recipe.dto";
import { RecipeDto } from "../../application/dtos/recipe.dto";
import { RecipeFilterDto } from "../../application/dtos/recipe-filter.dto";
import {
  PaginatedResponseDto,
  PaginationMetaDto,
} from "../../application/dtos/paginated-response.dto";
import { PaginatedRecipeResponseDto } from "../../application/dtos/paginated-recipe-response.dto";
import { CreateRecipeUseCase } from "../../application/use-cases/create-recipe.use-case";
import { GetAllRecipesUseCase } from "../../application/use-cases/get-all-recipes.use-case";
import { GetRecipeByIdUseCase } from "../../application/use-cases/get-recipe-by-id.use-case";
import { GetRecipesPaginatedUseCase } from "../../application/use-cases/get-recipes-paginated.use-case";
import { RecipePresenter } from "../presenters/recipe.presenter";

@ApiTags("recipes")
@Controller("recipes")
export class RecipeController {
  constructor(
    private readonly createRecipeUseCase: CreateRecipeUseCase,
    private readonly getAllRecipesUseCase: GetAllRecipesUseCase,
    private readonly getRecipeByIdUseCase: GetRecipeByIdUseCase,
    private readonly getRecipesPaginatedUseCase: GetRecipesPaginatedUseCase,
    private readonly recipePresenter: RecipePresenter
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova receita" })
  @ApiBody({ type: CreateRecipeDto })
  @ApiResponse({
    status: 201,
    description: "Receita criada com sucesso",
    type: RecipeDto,
  })
  @ApiResponse({
    status: 400,
    description: "Dados inválidos",
  })
  async create(
    @Body(new ValidationPipe()) createRecipeDto: CreateRecipeDto
  ): Promise<RecipeDto> {
    const recipe = await this.createRecipeUseCase.execute(createRecipeDto);
    return this.recipePresenter.toDto(recipe);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as receitas (sem paginação)" })
  @ApiResponse({
    status: 200,
    description: "Lista de receitas retornada com sucesso",
    type: [RecipeDto],
  })
  async findAll(): Promise<RecipeDto[]> {
    const recipes = await this.getAllRecipesUseCase.execute();
    return this.recipePresenter.toDtoList(recipes);
  }

  @Get("search")
  @ApiOperation({
    summary: "Buscar receitas com paginação e filtros",
    description:
      "Permite buscar receitas com paginação e aplicar filtros por título, descrição ou ingrediente",
  })
  @ApiQuery({
    name: "page",
    required: false,
    description: "Número da página (padrão: 1)",
    example: 1,
  })
  @ApiQuery({
    name: "limit",
    required: false,
    description: "Itens por página (padrão: 10, máximo: 100)",
    example: 10,
  })
  @ApiQuery({
    name: "title",
    required: false,
    description: "Filtrar por título (busca parcial)",
    example: "chocolate",
  })
  @ApiQuery({
    name: "description",
    required: false,
    description: "Filtrar por descrição (busca parcial)",
    example: "delicioso",
  })
  @ApiQuery({
    name: "ingredient",
    required: false,
    description: "Filtrar por ingrediente (busca parcial)",
    example: "farinha",
  })
  @ApiResponse({
    status: 200,
    description: "Busca paginada realizada com sucesso",
    type: PaginatedRecipeResponseDto,
  })
  async findPaginated(
    @Query(new ValidationPipe({ transform: true })) filterDto: RecipeFilterDto
  ): Promise<PaginatedRecipeResponseDto> {
    const result = await this.getRecipesPaginatedUseCase.execute(filterDto);

    const recipeDtos = this.recipePresenter.toDtoList(result.data);
    const meta = new PaginationMetaDto(
      filterDto.page,
      filterDto.limit,
      result.total
    );

    return new PaginatedResponseDto(recipeDtos, meta);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar uma receita pelo ID" })
  @ApiParam({
    name: "id",
    description: "ID da receita",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "Receita encontrada",
    type: RecipeDto,
  })
  @ApiResponse({
    status: 404,
    description: "Receita não encontrada",
  })
  async findOne(@Param("id") id: string): Promise<RecipeDto> {
    const recipe = await this.getRecipeByIdUseCase.execute(id);
    return this.recipePresenter.toDto(recipe);
  }
}
