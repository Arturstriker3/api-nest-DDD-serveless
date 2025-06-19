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
import { CreateDoctorScheduleDto } from "../../../application/doctor-schedule/dtos/create-doctor-schedule.dto";
import { UpdateDoctorScheduleDto } from "../../../application/doctor-schedule/dtos/update-doctor-schedule.dto";
import { DoctorScheduleDto } from "../../../application/doctor-schedule/dtos/doctor-schedule.dto";
import { DoctorScheduleFilterDto } from "../../../application/doctor-schedule/dtos/doctor-schedule-filter.dto";
import {
  PaginatedDoctorScheduleResponseDto,
  PaginationMetaDto,
} from "../../../application/doctor-schedule/dtos/paginated-doctor-schedule-response.dto";
import { CreateDoctorScheduleUseCase } from "../../../application/doctor-schedule/use-cases/create-doctor-schedule.use-case";
import { GetDoctorScheduleByIdUseCase } from "../../../application/doctor-schedule/use-cases/get-doctor-schedule-by-id.use-case";
import { GetDoctorSchedulesPaginatedUseCase } from "../../../application/doctor-schedule/use-cases/get-doctor-schedules-paginated.use-case";
import { UpdateDoctorScheduleUseCase } from "../../../application/doctor-schedule/use-cases/update-doctor-schedule.use-case";
import { DeleteDoctorScheduleUseCase } from "../../../application/doctor-schedule/use-cases/delete-doctor-schedule.use-case";
import { DoctorSchedulePresenter } from "../presenters/doctor-schedule.presenter";

@ApiTags("doctor-schedules")
@Controller("doctor-schedules")
export class DoctorScheduleController {
  constructor(
    private readonly createScheduleUseCase: CreateDoctorScheduleUseCase,
    private readonly getScheduleByIdUseCase: GetDoctorScheduleByIdUseCase,
    private readonly getSchedulesPaginatedUseCase: GetDoctorSchedulesPaginatedUseCase,
    private readonly updateScheduleUseCase: UpdateDoctorScheduleUseCase,
    private readonly deleteScheduleUseCase: DeleteDoctorScheduleUseCase,
    private readonly schedulePresenter: DoctorSchedulePresenter
  ) {}

  @Post()
  @ApiOperation({ summary: "Criar um novo horário disponível" })
  @ApiBody({ type: CreateDoctorScheduleDto })
  @ApiResponse({
    status: 201,
    description:
      "Horário criado com sucesso (appointmentId sempre null no create)",
    type: DoctorScheduleDto,
  })
  @ApiResponse({
    status: 400,
    description: "Dados inválidos ou horário já existe",
  })
  async create(
    @Body(new ValidationPipe()) createDto: CreateDoctorScheduleDto
  ): Promise<DoctorScheduleDto> {
    // Force appointmentId to null on create (sempre disponível)
    const createData = { ...createDto, appointmentId: null };
    const schedule = await this.createScheduleUseCase.execute(createData);
    return this.schedulePresenter.toDto(schedule);
  }

  @Get("search")
  @ApiOperation({
    summary: "Buscar horários com paginação e filtros",
    description:
      "Permite buscar horários com paginação e aplicar filtros por médico, data, horário e disponibilidade",
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
    name: "doctorId",
    required: false,
    description: "Filtrar por ID do médico",
    example: "d47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiQuery({
    name: "availableDate",
    required: false,
    description: "Filtrar por data (formato: YYYY-MM-DD)",
    example: "2024-06-18",
  })
  @ApiQuery({
    name: "availableTime",
    required: false,
    description: "Filtrar por horário",
    example: "14:30",
  })
  @ApiQuery({
    name: "isAvailable",
    required: false,
    description:
      "Filtrar apenas horários disponíveis (true) ou ocupados (false)",
    example: true,
  })
  @ApiResponse({
    status: 200,
    description: "Busca paginada realizada com sucesso",
    type: PaginatedDoctorScheduleResponseDto,
  })
  async findPaginated(
    @Query(new ValidationPipe({ transform: true }))
    filterDto: DoctorScheduleFilterDto
  ): Promise<PaginatedDoctorScheduleResponseDto> {
    const result = await this.getSchedulesPaginatedUseCase.execute(filterDto);

    const scheduleDtos = this.schedulePresenter.toDtoList(result.data);
    const meta = new PaginationMetaDto(
      filterDto.page,
      filterDto.limit,
      result.total
    );

    return new PaginatedDoctorScheduleResponseDto(scheduleDtos, meta);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar um horário pelo ID" })
  @ApiParam({
    name: "id",
    description: "ID do horário",
    example: "s47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiResponse({
    status: 200,
    description: "Horário encontrado",
    type: DoctorScheduleDto,
  })
  @ApiResponse({
    status: 404,
    description: "Horário não encontrado",
  })
  async findOne(@Param("id") id: string): Promise<DoctorScheduleDto> {
    const schedule = await this.getScheduleByIdUseCase.execute(id);
    return this.schedulePresenter.toDto(schedule);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Atualizar um horário",
    description:
      "Permite alterar data, horário ou appointmentId. Para liberar horário, envie appointmentId: null",
  })
  @ApiParam({
    name: "id",
    description: "ID do horário",
    example: "s47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiBody({ type: UpdateDoctorScheduleDto })
  @ApiResponse({
    status: 200,
    description: "Horário atualizado com sucesso",
    type: DoctorScheduleDto,
  })
  @ApiResponse({
    status: 404,
    description: "Horário não encontrado",
  })
  @ApiResponse({
    status: 400,
    description: "Dados inválidos ou conflito de horário",
  })
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updateDto: UpdateDoctorScheduleDto
  ): Promise<DoctorScheduleDto> {
    const schedule = await this.updateScheduleUseCase.execute(id, updateDto);
    return this.schedulePresenter.toDto(schedule);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: "Excluir um horário" })
  @ApiParam({
    name: "id",
    description: "ID do horário",
    example: "s47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiResponse({
    status: 204,
    description: "Horário excluído com sucesso",
  })
  @ApiResponse({
    status: 404,
    description: "Horário não encontrado",
  })
  async remove(@Param("id") id: string): Promise<void> {
    await this.deleteScheduleUseCase.execute(id);
  }
}
