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
import { CreateAppointmentDto } from "../../../application/appointment/dtos/create-appointment.dto";
import { UpdateAppointmentDto } from "../../../application/appointment/dtos/update-appointment.dto";
import { AppointmentDto } from "../../../application/appointment/dtos/appointment.dto";
import { AppointmentFilterDto } from "../../../application/appointment/dtos/appointment-filter.dto";
import {
  PaginatedAppointmentResponseDto,
  PaginationMetaDto,
} from "../../../application/appointment/dtos/paginated-appointment-response.dto";
import { CreateAppointmentUseCase } from "../../../application/appointment/use-cases/create-appointment.use-case";
import { GetAppointmentByIdUseCase } from "../../../application/appointment/use-cases/get-appointment-by-id.use-case";
import { GetAppointmentsPaginatedUseCase } from "../../../application/appointment/use-cases/get-appointments-paginated.use-case";
import { UpdateAppointmentUseCase } from "../../../application/appointment/use-cases/update-appointment.use-case";
import { DeleteAppointmentUseCase } from "../../../application/appointment/use-cases/delete-appointment.use-case";
import { AppointmentPresenter } from "../presenters/appointment.presenter";

@ApiTags("appointments")
@Controller("appointments")
export class AppointmentController {
  constructor(
    private readonly createAppointmentUseCase: CreateAppointmentUseCase,
    private readonly getAppointmentByIdUseCase: GetAppointmentByIdUseCase,
    private readonly getAppointmentsPaginatedUseCase: GetAppointmentsPaginatedUseCase,
    private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
    private readonly appointmentPresenter: AppointmentPresenter
  ) {}

  @Post()
  @ApiOperation({
    summary: "Criar um novo agendamento",
    description:
      "Cria um agendamento e automaticamente ocupa o horário do médico. O horário deve estar disponível.",
  })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({
    status: 201,
    description: "Agendamento criado com sucesso",
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 400,
    description: "Dados inválidos, horário não encontrado ou não disponível",
  })
  async create(
    @Body(new ValidationPipe()) createDto: CreateAppointmentDto
  ): Promise<AppointmentDto> {
    const appointment = await this.createAppointmentUseCase.execute(createDto);
    return this.appointmentPresenter.toDto(appointment);
  }

  @Get("search")
  @ApiOperation({
    summary: "Buscar agendamentos com paginação e filtros",
    description:
      "Permite buscar agendamentos com paginação e aplicar filtros por horário do médico ou nome do paciente",
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
    name: "doctorScheduleId",
    required: false,
    description: "Filtrar por ID do horário do médico",
    example: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiQuery({
    name: "patientName",
    required: false,
    description: "Filtrar por nome do paciente (busca parcial)",
    example: "João",
  })
  @ApiResponse({
    status: 200,
    description: "Busca paginada realizada com sucesso",
    type: PaginatedAppointmentResponseDto,
  })
  async findPaginated(
    @Query(new ValidationPipe({ transform: true }))
    filterDto: AppointmentFilterDto
  ): Promise<PaginatedAppointmentResponseDto> {
    const result = await this.getAppointmentsPaginatedUseCase.execute(
      filterDto
    );

    const appointmentDtos = this.appointmentPresenter.toDtoList(result.data);
    const meta = new PaginationMetaDto(
      filterDto.page,
      filterDto.limit,
      result.total
    );

    return new PaginatedAppointmentResponseDto(appointmentDtos, meta);
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar um agendamento pelo ID" })
  @ApiParam({
    name: "id",
    description: "ID do agendamento",
    example: "a47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiResponse({
    status: 200,
    description: "Agendamento encontrado",
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 404,
    description: "Agendamento não encontrado",
  })
  async findOne(@Param("id") id: string): Promise<AppointmentDto> {
    const appointment = await this.getAppointmentByIdUseCase.execute(id);
    return this.appointmentPresenter.toDto(appointment);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Atualizar um agendamento",
    description:
      "Permite alterar apenas o nome do paciente. Não é possível alterar o horário do médico.",
  })
  @ApiParam({
    name: "id",
    description: "ID do agendamento",
    example: "a47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({
    status: 200,
    description: "Agendamento atualizado com sucesso",
    type: AppointmentDto,
  })
  @ApiResponse({
    status: 404,
    description: "Agendamento não encontrado",
  })
  async update(
    @Param("id") id: string,
    @Body(new ValidationPipe()) updateDto: UpdateAppointmentDto
  ): Promise<AppointmentDto> {
    const appointment = await this.updateAppointmentUseCase.execute(
      id,
      updateDto
    );
    return this.appointmentPresenter.toDto(appointment);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: "Cancelar um agendamento",
    description:
      "Remove o agendamento e automaticamente libera o horário do médico (appointmentId volta para null)",
  })
  @ApiParam({
    name: "id",
    description: "ID do agendamento",
    example: "a47ac10b-58cc-4372-a567-0e02b2c3d479",
  })
  @ApiResponse({
    status: 204,
    description: "Agendamento cancelado com sucesso",
  })
  @ApiResponse({
    status: 404,
    description: "Agendamento não encontrado",
  })
  async remove(@Param("id") id: string): Promise<void> {
    await this.deleteAppointmentUseCase.execute(id);
  }
}
