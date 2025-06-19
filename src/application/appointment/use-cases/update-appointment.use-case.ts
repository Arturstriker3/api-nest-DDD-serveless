import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Appointment } from "../../../domain/appointment/entities/appointment.entity";
import { AppointmentRepository } from "../../../domain/appointment/repositories/appointment.repository";
import { UpdateAppointmentDto } from "../dtos/update-appointment.dto";

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(
    id: string,
    updateDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    if (!id?.trim()) {
      throw new BadRequestException("Appointment ID is required");
    }

    const existingAppointment = await this.appointmentRepository.findById(id);
    if (!existingAppointment) {
      throw new NotFoundException("Appointment not found");
    }

    if (updateDto.patientName !== undefined && !updateDto.patientName?.trim()) {
      throw new BadRequestException("Patient name cannot be empty");
    }

    const updatedAppointment = existingAppointment.update(
      updateDto.patientName?.trim()
    );

    return await this.appointmentRepository.update(id, updatedAppointment);
  }
}
