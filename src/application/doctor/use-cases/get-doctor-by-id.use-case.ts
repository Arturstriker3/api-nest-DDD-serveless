import { Injectable } from "@nestjs/common";
import { Doctor } from "../../../domain/doctor/entities/doctor.entity";
import { DoctorRepository } from "../../../domain/doctor/repositories/doctor.repository";

@Injectable()
export class GetDoctorByIdUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(id: string): Promise<Doctor> {
    if (!id?.trim()) {
      throw new Error("Doctor ID is required");
    }

    const doctor = await this.doctorRepository.findById(id);
    if (!doctor) {
      throw new Error("Doctor not found");
    }

    return doctor;
  }
}
