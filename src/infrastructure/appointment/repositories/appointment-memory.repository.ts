import { Injectable, NotFoundException } from "@nestjs/common";
import { Appointment } from "../../../domain/appointment/entities/appointment.entity";
import {
  AppointmentRepository,
  AppointmentFilters,
} from "../../../domain/appointment/repositories/appointment.repository";
import { IPaginatedResult } from "../../../domain/shared/types/pagination.types";

@Injectable()
export class AppointmentMemoryRepository extends AppointmentRepository {
  private appointments: Appointment[] = [];

  constructor() {
    super();
  }

  async save(appointment: Appointment): Promise<Appointment> {
    const existingIndex = this.appointments.findIndex(
      (a) => a.id === appointment.id
    );

    if (existingIndex >= 0) {
      this.appointments[existingIndex] = appointment;
    } else {
      this.appointments.push(appointment);
    }

    return appointment;
  }

  async findById(id: string): Promise<Appointment | null> {
    return (
      this.appointments.find((appointment) => appointment.id === id) || null
    );
  }

  async findByDoctorScheduleId(
    doctorScheduleId: string
  ): Promise<Appointment | null> {
    return (
      this.appointments.find(
        (appointment) => appointment.doctorScheduleId === doctorScheduleId
      ) || null
    );
  }

  async findByPatientName(patientName: string): Promise<Appointment[]> {
    return this.appointments.filter((appointment) =>
      appointment.patientName.toLowerCase().includes(patientName.toLowerCase())
    );
  }

  async findPaginated(
    page: number,
    limit: number,
    filters?: AppointmentFilters
  ): Promise<IPaginatedResult<Appointment>> {
    let filteredAppointments = [...this.appointments];

    if (filters?.doctorScheduleId) {
      filteredAppointments = filteredAppointments.filter((appointment) =>
        appointment.doctorScheduleId.includes(filters.doctorScheduleId!)
      );
    }

    if (filters?.patientName) {
      filteredAppointments = filteredAppointments.filter((appointment) =>
        appointment.patientName
          .toLowerCase()
          .includes(filters.patientName!.toLowerCase())
      );
    }

    const total = filteredAppointments.length;
    const skip = (page - 1) * limit;
    const data = filteredAppointments.slice(skip, skip + limit);

    return {
      data,
      total,
    };
  }

  async update(id: string, appointment: Appointment): Promise<Appointment> {
    const existingIndex = this.appointments.findIndex((a) => a.id === id);

    if (existingIndex >= 0) {
      this.appointments[existingIndex] = appointment;
      return appointment;
    }

    throw new NotFoundException("Appointment not found");
  }

  async delete(id: string): Promise<void> {
    const index = this.appointments.findIndex(
      (appointment) => appointment.id === id
    );
    if (index >= 0) {
      this.appointments.splice(index, 1);
    }
  }
}
