import { Injectable } from "@nestjs/common";
import { DoctorSchedule } from "../../../domain/doctor-schedule/entities/doctor-schedule.entity";
import {
  DoctorScheduleRepository,
  DoctorScheduleFilters,
} from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";
import { IPaginatedResult } from "../../../domain/shared/types/pagination.types";

@Injectable()
export class DoctorScheduleMemoryRepository extends DoctorScheduleRepository {
  private schedules: DoctorSchedule[] = [];

  constructor() {
    super();
    this.seedData();
  }

  async save(schedule: DoctorSchedule): Promise<DoctorSchedule> {
    const existingIndex = this.schedules.findIndex((s) => s.id === schedule.id);

    if (existingIndex >= 0) {
      this.schedules[existingIndex] = schedule;
    } else {
      this.schedules.push(schedule);
    }

    return schedule;
  }

  async findById(id: string): Promise<DoctorSchedule | null> {
    return this.schedules.find((schedule) => schedule.id === id) || null;
  }

  async findByDoctorAndDateTime(
    doctorId: string,
    availableDate: Date,
    availableTime: string
  ): Promise<DoctorSchedule | null> {
    const dateStr = availableDate.toISOString().split("T")[0];
    return (
      this.schedules.find((schedule) => {
        const scheduleDate = schedule.availableDate.toISOString().split("T")[0];
        return (
          schedule.doctorId === doctorId &&
          scheduleDate === dateStr &&
          schedule.availableTime === availableTime
        );
      }) || null
    );
  }

  async findByDoctorId(doctorId: string): Promise<DoctorSchedule[]> {
    return this.schedules.filter((schedule) => schedule.doctorId === doctorId);
  }

  async findAvailableByDoctor(doctorId: string): Promise<DoctorSchedule[]> {
    return this.schedules.filter(
      (schedule) => schedule.doctorId === doctorId && schedule.isAvailable()
    );
  }

  async findPaginated(
    page: number,
    limit: number,
    filters?: DoctorScheduleFilters
  ): Promise<IPaginatedResult<DoctorSchedule>> {
    let filteredSchedules = [...this.schedules];

    if (filters?.doctorId) {
      filteredSchedules = filteredSchedules.filter((schedule) =>
        schedule.doctorId.includes(filters.doctorId!)
      );
    }

    if (filters?.availableDate) {
      const filterDateStr = filters.availableDate.toISOString().split("T")[0];
      filteredSchedules = filteredSchedules.filter((schedule) => {
        const scheduleDate = schedule.availableDate.toISOString().split("T")[0];
        return scheduleDate === filterDateStr;
      });
    }

    if (filters?.availableTime) {
      filteredSchedules = filteredSchedules.filter((schedule) =>
        schedule.availableTime.includes(filters.availableTime!)
      );
    }

    if (filters?.isAvailable !== undefined) {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.isAvailable() === filters.isAvailable
      );
    }

    const total = filteredSchedules.length;
    const skip = (page - 1) * limit;
    const data = filteredSchedules.slice(skip, skip + limit);

    return {
      data,
      total,
    };
  }

  async update(id: string, schedule: DoctorSchedule): Promise<DoctorSchedule> {
    const existingIndex = this.schedules.findIndex((s) => s.id === id);

    if (existingIndex >= 0) {
      this.schedules[existingIndex] = schedule;
      return schedule;
    }

    throw new Error("Schedule not found");
  }

  async delete(id: string): Promise<void> {
    const index = this.schedules.findIndex((schedule) => schedule.id === id);
    if (index >= 0) {
      this.schedules.splice(index, 1);
    }
  }

  private seedData(): void {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);

    const sampleSchedules = [
      // Dr. João Silva (ID: "1") - Horários disponíveis
      DoctorSchedule.create("sch-1", "1", today, "09:00", null),
      DoctorSchedule.create("sch-2", "1", today, "10:00", null),
      DoctorSchedule.create("sch-3", "1", today, "14:00", "appointment-1"), // Ocupado
      DoctorSchedule.create("sch-4", "1", tomorrow, "09:00", null),
      DoctorSchedule.create("sch-5", "1", tomorrow, "15:00", null),

      // Dra. Maria Santos (ID: "2") - Horários disponíveis
      DoctorSchedule.create("sch-6", "2", today, "08:00", null),
      DoctorSchedule.create("sch-7", "2", today, "11:00", "appointment-2"), // Ocupado
      DoctorSchedule.create("sch-8", "2", tomorrow, "13:00", null),
      DoctorSchedule.create("sch-9", "2", dayAfter, "16:00", null),

      // Dr. Pedro Costa (ID: "3") - Horários disponíveis
      DoctorSchedule.create("sch-10", "3", today, "07:30", null),
      DoctorSchedule.create("sch-11", "3", tomorrow, "18:00", null),
      DoctorSchedule.create("sch-12", "3", dayAfter, "19:30", "appointment-3"), // Ocupado
    ];

    this.schedules = sampleSchedules;
  }
}
