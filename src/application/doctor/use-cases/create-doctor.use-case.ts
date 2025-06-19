import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Doctor } from "../../../domain/doctor/entities/doctor.entity";
import { DoctorRepository } from "../../../domain/doctor/repositories/doctor.repository";
import { CreateDoctorDto } from "../dtos/create-doctor.dto";

@Injectable()
export class CreateDoctorUseCase {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async execute(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    if (!createDoctorDto.name?.trim()) {
      throw new Error("Doctor name is required");
    }

    if (!createDoctorDto.specialty?.trim()) {
      throw new Error("Doctor specialty is required");
    }

    const doctorId = uuidv4();
    const doctor = Doctor.create(
      doctorId,
      createDoctorDto.name.trim(),
      createDoctorDto.specialty.trim(),
      createDoctorDto.availableSchedules || []
    );

    return await this.doctorRepository.save(doctor);
  }
}
