import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { Appointment } from "../../../domain/appointment/entities/appointment.entity";
import { AppointmentRepository } from "../../../domain/appointment/repositories/appointment.repository";

@Injectable()
export class GetAppointmentByIdUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string): Promise<Appointment> {
    if (!id?.trim()) {
      throw new BadRequestException("Appointment ID is required");
    }

    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundException("Appointment not found");
    }

    return appointment;
  }
}
