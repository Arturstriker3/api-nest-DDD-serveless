import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";
import { AppointmentRepository } from "../../../domain/appointment/repositories/appointment.repository";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly scheduleRepository: DoctorScheduleRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new BadRequestException("Appointment ID is required");
    }

    const existingAppointment = await this.appointmentRepository.findById(id);
    if (!existingAppointment) {
      throw new NotFoundException("Appointment not found");
    }

    // Busca o horário relacionado
    const schedule = await this.scheduleRepository.findById(
      existingAppointment.doctorScheduleId
    );
    if (schedule) {
      // Libera o horário (seta appointmentId para null)
      const clearedSchedule = schedule.clearAppointment();
      await this.scheduleRepository.update(schedule.id, clearedSchedule);
    }

    // Remove o agendamento
    await this.appointmentRepository.delete(id);
  }
}
