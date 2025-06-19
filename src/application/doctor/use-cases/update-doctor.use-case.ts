import { Injectable } from "@nestjs/common";
import { Doctor } from "../../../domain/doctor/entities/doctor.entity";
import { DoctorRepository } from "../../../domain/doctor/repositories/doctor.repository";
import { UpdateDoctorDto } from "../dtos/update-doctor.dto";

@Injectable()
export class UpdateDoctorUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(id: string, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    if (!id?.trim()) {
      throw new Error("Doctor ID is required");
    }

    const existingDoctor = await this.doctorRepository.findById(id);
    if (!existingDoctor) {
      throw new Error("Doctor not found");
    }

    if (updateDoctorDto.name !== undefined && !updateDoctorDto.name?.trim()) {
      throw new Error("Doctor name cannot be empty");
    }

    if (
      updateDoctorDto.specialty !== undefined &&
      !updateDoctorDto.specialty?.trim()
    ) {
      throw new Error("Doctor specialty cannot be empty");
    }

    const updatedDoctor = existingDoctor.update(
      updateDoctorDto.name?.trim(),
      updateDoctorDto.specialty?.trim(),
      updateDoctorDto.availableSchedules
    );

    return await this.doctorRepository.update(id, updatedDoctor);
  }
}
