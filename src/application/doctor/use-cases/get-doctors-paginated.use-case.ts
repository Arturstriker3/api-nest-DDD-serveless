import { Injectable } from "@nestjs/common";
import { DoctorRepository } from "../../../domain/doctor/repositories/doctor.repository";
import { Doctor } from "../../../domain/doctor/entities/doctor.entity";
import { DoctorFilterDto } from "../dtos/doctor-filter.dto";
import { IPaginatedResult } from "../../../domain/shared/types/pagination.types";

@Injectable()
export class GetDoctorsPaginatedUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(filterDto: DoctorFilterDto): Promise<IPaginatedResult<Doctor>> {
    if (filterDto.page < 1) {
      throw new Error("Page must be greater than 0");
    }

    if (filterDto.limit < 1 || filterDto.limit > 100) {
      throw new Error("Limit must be between 1 and 100");
    }

    const filters = {
      name: filterDto.name?.trim() || undefined,
      specialty: filterDto.specialty?.trim() || undefined,
    };

    return await this.doctorRepository.findPaginated(
      filterDto.page,
      filterDto.limit,
      filters
    );
  }
}
