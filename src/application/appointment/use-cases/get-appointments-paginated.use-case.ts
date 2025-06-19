import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../../../domain/appointment/repositories/appointment.repository";
import { Appointment } from "../../../domain/appointment/entities/appointment.entity";
import { AppointmentFilterDto } from "../dtos/appointment-filter.dto";
import { IPaginatedResult } from "../../../domain/shared/types/pagination.types";

@Injectable()
export class GetAppointmentsPaginatedUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    filterDto: AppointmentFilterDto
  ): Promise<IPaginatedResult<Appointment>> {
    if (filterDto.page < 1) {
      throw new Error("Page must be greater than 0");
    }

    if (filterDto.limit < 1 || filterDto.limit > 100) {
      throw new Error("Limit must be between 1 and 100");
    }

    const filters = {
      doctorScheduleId: filterDto.doctorScheduleId?.trim() || undefined,
      patientName: filterDto.patientName?.trim() || undefined,
    };

    return await this.appointmentRepository.findPaginated(
      filterDto.page,
      filterDto.limit,
      filters
    );
  }
}
