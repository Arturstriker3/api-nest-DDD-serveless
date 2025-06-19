import { Injectable } from "@nestjs/common";
import { Doctor } from "../../../domain/doctor/entities/doctor.entity";
import { DoctorDto } from "../../../application/doctor/dtos/doctor.dto";

@Injectable()
export class DoctorPresenter {
  toDto(doctor: Doctor): DoctorDto {
    return new DoctorDto(
      doctor.id,
      doctor.name,
      doctor.specialty,
      doctor.availableSchedules,
      doctor.createdAt,
      doctor.updatedAt
    );
  }

  toDtoList(doctors: Doctor[]): DoctorDto[] {
    return doctors.map((doctor) => this.toDto(doctor));
  }
}
