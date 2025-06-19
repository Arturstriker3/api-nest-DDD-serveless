import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { DoctorSchedule } from "../../../domain/doctor-schedule/entities/doctor-schedule.entity";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";

@Injectable()
export class GetDoctorScheduleByIdUseCase {
  constructor(private readonly scheduleRepository: DoctorScheduleRepository) {}

  async execute(id: string): Promise<DoctorSchedule> {
    if (!id?.trim()) {
      throw new BadRequestException("Schedule ID is required");
    }

    const schedule = await this.scheduleRepository.findById(id);
    if (!schedule) {
      throw new NotFoundException("Schedule not found");
    }

    return schedule;
  }
}
