import { ApiProperty } from "@nestjs/swagger";
import { DoctorScheduleDto } from "./doctor-schedule.dto";
import { IPaginationMeta } from "../../../domain/shared/types/pagination.types";

export class PaginationMetaDto implements IPaginationMeta {
  @ApiProperty({
    description: "Página atual",
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: "Itens por página",
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: "Total de itens",
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: "Total de páginas",
    example: 3,
  })
  totalPages: number;

  @ApiProperty({
    description: "Tem próxima página",
    example: true,
  })
  hasNext: boolean;

  @ApiProperty({
    description: "Tem página anterior",
    example: false,
  })
  hasPrevious: boolean;

  constructor(page: number, limit: number, total: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrevious = page > 1;
  }
}

export class PaginatedDoctorScheduleResponseDto {
  @ApiProperty({
    description: "Lista de horários",
    type: [DoctorScheduleDto],
  })
  data: DoctorScheduleDto[];

  @ApiProperty({
    description: "Metadados da paginação",
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  constructor(data: DoctorScheduleDto[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
