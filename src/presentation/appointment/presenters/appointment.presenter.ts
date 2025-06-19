import { Injectable } from "@nestjs/common";
import { Appointment } from "../../../domain/appointment/entities/appointment.entity";
import { AppointmentDto } from "../../../application/appointment/dtos/appointment.dto";

@Injectable()
export class AppointmentPresenter {
  toDto(appointment: Appointment): AppointmentDto {
    return new AppointmentDto(
      appointment.id,
      appointment.doctorScheduleId,
      appointment.patientName,
      appointment.getPatientNameFormatted(),
      appointment.createdAt,
      appointment.updatedAt
    );
  }

  toDtoList(appointments: Appointment[]): AppointmentDto[] {
    return appointments.map((appointment) => this.toDto(appointment));
  }
}
