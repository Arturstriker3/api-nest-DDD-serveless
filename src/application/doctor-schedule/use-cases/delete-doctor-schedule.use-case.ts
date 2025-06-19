import { Injectable } from "@nestjs/common";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";

@Injectable()
export class DeleteDoctorScheduleUseCase {
  constructor(private readonly scheduleRepository: DoctorScheduleRepository) {}

  async execute(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new Error("Schedule ID is required");
    }

    const existingSchedule = await this.scheduleRepository.findById(id);
    if (!existingSchedule) {
      throw new Error("Schedule not found");
    }

    await this.scheduleRepository.delete(id);
  }
}
