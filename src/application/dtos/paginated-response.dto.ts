import { ApiProperty } from "@nestjs/swagger";

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export class PaginationMetaDto implements IPaginationMeta {
  @ApiProperty({
    description: "Página atual",
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: "Quantidade de itens por página",
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: "Total de itens encontrados",
    example: 25,
  })
  total: number;

  @ApiProperty({
    description: "Total de páginas",
    example: 3,
  })
  totalPages: number;

  @ApiProperty({
    description: "Indica se há próxima página",
    example: true,
  })
  hasNext: boolean;

  @ApiProperty({
    description: "Indica se há página anterior",
    example: false,
  })
  hasPrev: boolean;

  constructor(page: number, limit: number, total: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
    this.hasNext = page < this.totalPages;
    this.hasPrev = page > 1;
  }
}

export class PaginatedResponseDto<T> {
  @ApiProperty({
    description: "Lista de itens da página atual",
    isArray: true,
  })
  data: T[];

  @ApiProperty({
    description: "Metadados da paginação",
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  constructor(data: T[], meta: PaginationMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
