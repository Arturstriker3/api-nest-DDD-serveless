import { DoctorSchedule } from "../entities/doctor-schedule.entity";
import { IPaginatedResult } from "../../shared/types/pagination.types";

export interface DoctorScheduleFilters {
  doctorId?: string;
  availableDate?: Date;
  availableTime?: string;
  isAvailable?: boolean;
}

export abstract class DoctorScheduleRepository {
  abstract save(schedule: DoctorSchedule): Promise<DoctorSchedule>;
  abstract findById(id: string): Promise<DoctorSchedule | null>;
  abstract findByDoctorAndDateTime(
    doctorId: string,
    availableDate: Date,
    availableTime: string
  ): Promise<DoctorSchedule | null>;
  abstract findByDoctorId(doctorId: string): Promise<DoctorSchedule[]>;
  abstract findAvailableByDoctor(doctorId: string): Promise<DoctorSchedule[]>;
  abstract findPaginated(
    page: number,
    limit: number,
    filters?: DoctorScheduleFilters
  ): Promise<IPaginatedResult<DoctorSchedule>>;
  abstract update(
    id: string,
    schedule: DoctorSchedule
  ): Promise<DoctorSchedule>;
  abstract delete(id: string): Promise<void>;
}
