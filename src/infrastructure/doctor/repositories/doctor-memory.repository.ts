import { Injectable } from "@nestjs/common";
import { Doctor } from "../../../domain/doctor/entities/doctor.entity";
import {
  DoctorRepository,
  DoctorFilters,
} from "../../../domain/doctor/repositories/doctor.repository";
import { IPaginatedResult } from "../../../domain/shared/types/pagination.types";

@Injectable()
export class DoctorMemoryRepository extends DoctorRepository {
  private doctors: Doctor[] = [];

  constructor() {
    super();
    this.seedData();
  }

  async save(doctor: Doctor): Promise<Doctor> {
    const existingIndex = this.doctors.findIndex((d) => d.id === doctor.id);

    if (existingIndex >= 0) {
      this.doctors[existingIndex] = doctor;
    } else {
      this.doctors.push(doctor);
    }

    return doctor;
  }

  async findById(id: string): Promise<Doctor | null> {
    return this.doctors.find((doctor) => doctor.id === id) || null;
  }

  async findPaginated(
    page: number,
    limit: number,
    filters?: DoctorFilters
  ): Promise<IPaginatedResult<Doctor>> {
    let filteredDoctors = [...this.doctors];

    if (filters?.name) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }

    if (filters?.specialty) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.specialty
          .toLowerCase()
          .includes(filters.specialty!.toLowerCase())
      );
    }

    const total = filteredDoctors.length;
    const skip = (page - 1) * limit;
    const data = filteredDoctors.slice(skip, skip + limit);

    return {
      data,
      total,
    };
  }

  async update(id: string, doctor: Doctor): Promise<Doctor> {
    const existingIndex = this.doctors.findIndex((d) => d.id === id);

    if (existingIndex >= 0) {
      this.doctors[existingIndex] = doctor;
      return doctor;
    }

    throw new Error("Doctor not found");
  }

  async delete(id: string): Promise<void> {
    const index = this.doctors.findIndex((doctor) => doctor.id === id);
    if (index >= 0) {
      this.doctors.splice(index, 1);
    }
  }

  private seedData(): void {
    const sampleDoctors = [
      Doctor.create("1", "Dr. João Silva", "Cardiologia", [
        "schedule-1",
        "schedule-2",
      ]),
      Doctor.create("2", "Dra. Maria Santos", "Dermatologia", ["schedule-3"]),
      Doctor.create("3", "Dr. Pedro Costa", "Ortopedia", [
        "schedule-4",
        "schedule-5",
      ]),
      Doctor.create("4", "Dra. Ana Oliveira", "Pediatria", ["schedule-6"]),
      Doctor.create("5", "Dr. Carlos Souza", "Neurologia", [
        "schedule-7",
        "schedule-8",
      ]),
    ];

    this.doctors = sampleDoctors;
  }
}
