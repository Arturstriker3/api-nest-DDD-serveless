import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Appointment } from "../../../domain/appointment/entities/appointment.entity";
import { AppointmentRepository } from "../../../domain/appointment/repositories/appointment.repository";
import { DoctorScheduleRepository } from "../../../domain/doctor-schedule/repositories/doctor-schedule.repository";
import { CreateAppointmentDto } from "../dtos/create-appointment.dto";

@Injectable()
export class CreateAppointmentUseCase {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly scheduleRepository: DoctorScheduleRepository
  ) {}

  async execute(createDto: CreateAppointmentDto): Promise<Appointment> {
    if (!createDto.doctorScheduleId?.trim()) {
      throw new Error("Doctor schedule ID is required");
    }

    if (!createDto.patientName?.trim()) {
      throw new Error("Patient name is required");
    }

    // Verifica se o horário existe
    const schedule = await this.scheduleRepository.findById(
      createDto.doctorScheduleId
    );
    if (!schedule) {
      throw new Error("Doctor schedule not found");
    }

    // Verifica se o horário está disponível
    if (!schedule.isAvailable()) {
      throw new Error("Doctor schedule is not available");
    }

    // Verifica se já existe agendamento para este horário
    const existingAppointment =
      await this.appointmentRepository.findByDoctorScheduleId(
        createDto.doctorScheduleId
      );
    if (existingAppointment) {
      throw new Error("Schedule already has an appointment");
    }

    // Cria o agendamento
    const appointmentId = uuidv4();
    const appointment = Appointment.create(
      appointmentId,
      createDto.doctorScheduleId,
      createDto.patientName.trim()
    );

    // Salva o agendamento
    const savedAppointment = await this.appointmentRepository.save(appointment);

    // Atualiza o horário para indicar que está ocupado
    const updatedSchedule = schedule.assignAppointment(appointmentId);
    await this.scheduleRepository.update(schedule.id, updatedSchedule);

    return savedAppointment;
  }
}
