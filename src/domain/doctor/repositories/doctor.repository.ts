import { Doctor } from "../entities/doctor.entity";
import { IPaginatedResult } from "../../shared/types/pagination.types";

export interface DoctorFilters {
  name?: string;
  specialty?: string;
}

export abstract class DoctorRepository {
  abstract save(doctor: Doctor): Promise<Doctor>;
  abstract findById(id: string): Promise<Doctor | null>;
  abstract findPaginated(
    page: number,
    limit: number,
    filters?: DoctorFilters
  ): Promise<IPaginatedResult<Doctor>>;
  abstract update(id: string, doctor: Doctor): Promise<Doctor>;
  abstract delete(id: string): Promise<void>;
}
