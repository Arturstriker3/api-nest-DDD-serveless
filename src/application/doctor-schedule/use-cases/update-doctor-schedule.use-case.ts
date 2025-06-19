import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { DoctorSchedule } from "../../../domain/doctor-schedule/entities/doctor-schedule.entity";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";
import { UpdateDoctorScheduleDto } from "../dtos/update-doctor-schedule.dto";

@Injectable()
export class UpdateDoctorScheduleUseCase {
  constructor(private readonly scheduleRepository: DoctorScheduleRepository) {}

  async execute(
    id: string,
    updateDto: UpdateDoctorScheduleDto
  ): Promise<DoctorSchedule> {
    if (!id?.trim()) {
      throw new BadRequestException("Schedule ID is required");
    }

    const existingSchedule = await this.scheduleRepository.findById(id);
    if (!existingSchedule) {
      throw new NotFoundException("Schedule not found");
    }

    let availableDate = existingSchedule.availableDate;
    let availableTime = existingSchedule.availableTime;

    // Valida e converte nova data se fornecida
    if (updateDto.availableDate) {
      availableDate = new Date(updateDto.availableDate);
      if (isNaN(availableDate.getTime())) {
        throw new BadRequestException("Invalid date format");
      }
    }

    // Valida novo horário se fornecido
    if (updateDto.availableTime) {
      availableTime = updateDto.availableTime.trim();
      if (!availableTime) {
        throw new BadRequestException("Available time cannot be empty");
      }
    }

    // Verifica se nova combinação doctor/date/time já existe (se mudou)
    if (updateDto.availableDate || updateDto.availableTime) {
      const existing = await this.scheduleRepository.findByDoctorAndDateTime(
        existingSchedule.doctorId,
        availableDate,
        availableTime
      );

      if (existing && existing.id !== id) {
        throw new ConflictException(
          "Schedule already exists for this doctor at this date and time"
        );
      }
    }

    const updatedSchedule = existingSchedule.update(
      availableDate,
      availableTime,
      updateDto.appointmentId !== undefined
        ? updateDto.appointmentId
        : existingSchedule.appointmentId
    );

    return await this.scheduleRepository.update(id, updatedSchedule);
  }
}
