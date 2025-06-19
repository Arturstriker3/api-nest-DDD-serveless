import { Injectable } from "@nestjs/common";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";
import { DoctorSchedule } from "../../../domain/doctor-schedule/entities/doctor-schedule.entity";
import { DoctorScheduleFilterDto } from "../dtos/doctor-schedule-filter.dto";
import { IPaginatedResult } from "../../../domain/shared/types/pagination.types";

@Injectable()
export class GetDoctorSchedulesPaginatedUseCase {
  constructor(private readonly scheduleRepository: DoctorScheduleRepository) {}

  async execute(
    filterDto: DoctorScheduleFilterDto
  ): Promise<IPaginatedResult<DoctorSchedule>> {
    if (filterDto.page < 1) {
      throw new Error("Page must be greater than 0");
    }

    if (filterDto.limit < 1 || filterDto.limit > 100) {
      throw new Error("Limit must be between 1 and 100");
    }

    const filters = {
      doctorId: filterDto.doctorId?.trim() || undefined,
      availableDate: filterDto.availableDate
        ? new Date(filterDto.availableDate)
        : undefined,
      availableTime: filterDto.availableTime?.trim() || undefined,
      isAvailable: filterDto.isAvailable,
    };

    return await this.scheduleRepository.findPaginated(
      filterDto.page,
      filterDto.limit,
      filters
    );
  }
}
