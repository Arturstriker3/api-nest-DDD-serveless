import { Appointment } from "../entities/appointment.entity";
import { IPaginatedResult } from "../../shared/types/pagination.types";

export interface AppointmentFilters {
  doctorScheduleId?: string;
  patientName?: string;
}

export abstract class AppointmentRepository {
  abstract save(appointment: Appointment): Promise<Appointment>;
  abstract findById(id: string): Promise<Appointment | null>;
  abstract findByDoctorScheduleId(
    doctorScheduleId: string
  ): Promise<Appointment | null>;
  abstract findByPatientName(patientName: string): Promise<Appointment[]>;
  abstract findPaginated(
    page: number,
    limit: number,
    filters?: AppointmentFilters
  ): Promise<IPaginatedResult<Appointment>>;
  abstract update(id: string, appointment: Appointment): Promise<Appointment>;
  abstract delete(id: string): Promise<void>;
}
