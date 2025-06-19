import { Injectable } from "@nestjs/common";
import { DoctorRepository } from "../../../domain/doctor/repositories/doctor.repository";

@Injectable()
export class DeleteDoctorUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new Error("Doctor ID is required");
    }

    const existingDoctor = await this.doctorRepository.findById(id);
    if (!existingDoctor) {
      throw new Error("Doctor not found");
    }

    await this.doctorRepository.delete(id);
  }
}
