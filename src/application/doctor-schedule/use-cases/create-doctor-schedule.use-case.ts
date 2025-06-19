import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { DoctorSchedule } from "../../../domain/doctor-schedule/entities/doctor-schedule.entity";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";
import { DoctorRepository } from "../../../domain/doctor/repositories/doctor.repository";
import { CreateDoctorScheduleDto } from "../dtos/create-doctor-schedule.dto";

@Injectable()
export class CreateDoctorScheduleUseCase {
  constructor(
    private readonly scheduleRepository: DoctorScheduleRepository,
    private readonly doctorRepository: DoctorRepository
  ) {}

  async execute(createDto: CreateDoctorScheduleDto): Promise<DoctorSchedule> {
    if (!createDto.doctorId?.trim()) {
      throw new BadRequestException("Doctor ID is required");
    }

    const doctor = await this.doctorRepository.findById(createDto.doctorId);
    if (!doctor) {
      throw new NotFoundException("Doctor not found");
    }

    if (!createDto.availableDate?.trim()) {
      throw new BadRequestException("Available date is required");
    }

    if (!createDto.availableTime?.trim()) {
      throw new BadRequestException("Available time is required");
    }

    const availableDate = new Date(createDto.availableDate);
    if (isNaN(availableDate.getTime())) {
      throw new BadRequestException("Invalid date format");
    }

      // Verify if the schedule already exists
    const existing = await this.scheduleRepository.findByDoctorAndDateTime(
      createDto.doctorId,
      availableDate,
      createDto.availableTime
    );

    if (existing) {
      throw new ConflictException(
        "Schedule already exists for this doctor at this date and time"
      );
    }

    const scheduleId = uuidv4();
    const schedule = DoctorSchedule.create(
      scheduleId,
      createDto.doctorId,
      availableDate,
      createDto.availableTime,
      null // Always create as available (no appointment)
    );

    return await this.scheduleRepository.save(schedule);
  }
}
