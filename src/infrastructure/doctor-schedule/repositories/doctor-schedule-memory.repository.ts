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
}
