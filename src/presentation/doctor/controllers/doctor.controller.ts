import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from "@nestjs/swagger";
import { CreateDoctorDto } from "../../../application/doctor/dtos/create-doctor.dto";
import { UpdateDoctorDto } from "../../../application/doctor/dtos/update-doctor.dto";
import { DoctorDto } from "../../../application/doctor/dtos/doctor.dto";
import { DoctorFilterDto } from "../../../application/doctor/dtos/doctor-filter.dto";
import {
  PaginatedDoctorResponseDto,
  PaginationMetaDto,
} from "../../../application/doctor/dtos/paginated-doctor-response.dto";
import { CreateDoctorUseCase } from "../../../application/doctor/use-cases/create-doctor.use-case";
import { GetDoctorByIdUseCase } from "../../../application/doctor/use-cases/get-doctor-by-id.use-case";
import { GetDoctorsPaginatedUseCase } from "../../../application/doctor/use-cases/get-doctors-paginated.use-case";
import { UpdateDoctorUseCase } from "../../../application/doctor/use-cases/update-doctor.use-case";
import { DeleteDoctorUseCase } from "../../../application/doctor/use-cases/delete-doctor.use-case";
import { DoctorPresenter } from "../presenters/doctor.presenter";

@ApiTags("doctors")
@Controller("doctors")
export class DoctorController {
  constructor(
    private readonly createDoctorUseCase: CreateDoctorUseCase,
    private readonly getDoctorByIdUseCase: GetDoctorByIdUseCase,
    private readonly getDoctorsPaginatedUseCase: GetDoctorsPaginatedUseCase,
    private readonly updateDoctorUseCase: UpdateDoctorUseCase,
    private readonly deleteDoctorUseCase: DeleteDoctorUseCase,
    private readonly doctorPresenter: DoctorPresenter
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar um novo médico" })
  @ApiBody({ type: CreateDoctorDto })
  @ApiResponse({
    status: 201,
    description: "Médico criado com sucesso",
    type: DoctorDto,
  })
  @ApiResponse({
    status: 400,
    description: "Dados inválidos",
  })
  async create(
    @Body(new ValidationPipe()) createDoctorDto: CreateDoctorDto
  ): Promise<DoctorDto> {
    const doctor = await this.createDoctorUseCase.execute(createDoctorDto);
    return this.doctorPresenter.toDto(doctor);
  }

  @Get("search")
  @ApiOperation({
    summary: "Buscar médicos com paginação e filtros",
    description:
      "Permite buscar médicos com paginação e aplicar filtros por nome ou especialidade",
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
    name: "name",
    required: false,
    description: "Filtrar por nome do médico (busca parcial)",
    example: "João",
  })
  @ApiQuery({
    name: "specialty",
    required: false,
    description: "Filtrar por especialidade (busca parcial)",
    example: "Cardiologia",
  })
  @ApiResponse({
    status: 200,
    description: "Busca paginada realizada com sucesso",
    type: PaginatedDoctorResponseDto,
  })
  async findPaginated(
    @Query(new ValidationPipe({ transform: true })) filterDto: DoctorFilterDto
  ): Promise<PaginatedDoctorResponseDto> {
    const result = await this.getDoctorsPaginatedUseCase.execute(filterDto);

    const doctorDtos = this.doctorPresenter.toDtoList(result.data);
    const meta = new PaginationMetaDto(
      filterDto.page,
      filterDto.limit,
      result.total
    );

    return new PaginatedDoctorResponseDto(doctorDtos, meta);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar um médico pelo ID" })
  @ApiParam({
    name: "id",
    description: "ID do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 200,
    description: "Médico encontrado",
    type: DoctorDto,
  })
  @ApiResponse({
    status: 404,
    description: "Médico não encontrado",
  })
  async findOne(@Param("id") id: string): Promise<DoctorDto> {
    const doctor = await this.getDoctorByIdUseCase.execute(id);
    return this.doctorPresenter.toDto(doctor);
  }

  @Put(":id")
  @ApiOperation({ summary: "Atualizar um médico" })
  @ApiParam({
    name: "id",
    description: "ID do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiBody({ type: UpdateDoctorDto })
  @ApiResponse({
    status: 200,
    description: "Médico atualizado com sucesso",
    type: DoctorDto,
  })
  @ApiResponse({
    status: 404,
    description: "Médico não encontrado",
  })
  @ApiResponse({
    status: 400,
    description: "Dados inválidos",
  })
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updateDoctorDto: UpdateDoctorDto
  ): Promise<DoctorDto> {
    const doctor = await this.updateDoctorUseCase.execute(id, updateDoctorDto);
    return this.doctorPresenter.toDto(doctor);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Excluir um médico" })
  @ApiParam({
    name: "id",
    description: "ID do médico",
    example: "123e4567-e89b-12d3-a456-426614174000",
  })
  @ApiResponse({
    status: 204,
    description: "Médico excluído com sucesso",
  })
  @ApiResponse({
    status: 404,
    description: "Médico não encontrado",
  })
  async remove(@Param("id") id: string): Promise<void> {
    await this.deleteDoctorUseCase.execute(id);
  }
}
