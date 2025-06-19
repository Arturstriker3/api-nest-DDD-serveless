import { Injectable } from "@nestjs/common";
import { DoctorSchedule } from "../../../domain/doctor-schedule/entities/doctor-schedule.entity";
import { DoctorScheduleDto } from "../../../application/doctor-schedule/dtos/doctor-schedule.dto";

@Injectable()
export class DoctorSchedulePresenter {
  toDto(schedule: DoctorSchedule): DoctorScheduleDto {
    return new DoctorScheduleDto(
      schedule.id,
      schedule.doctorId,
      schedule.availableDate,
      schedule.availableTime,
      schedule.appointmentId,
      schedule.isAvailable(),
      schedule.createdAt,
      schedule.updatedAt
    );
  }

  toDtoList(schedules: DoctorSchedule[]): DoctorScheduleDto[] {
    return schedules.map((schedule) => this.toDto(schedule));
  }
}
