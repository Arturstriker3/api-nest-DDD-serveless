import { Module } from "@nestjs/common";
import { DoctorController } from "./presentation/doctor/controllers/doctor.controller";
import { DoctorPresenter } from "./presentation/doctor/presenters/doctor.presenter";
import { CreateDoctorUseCase } from "./application/doctor/use-cases/create-doctor.use-case";
import { GetDoctorByIdUseCase } from "./application/doctor/use-cases/get-doctor-by-id.use-case";
import { GetDoctorsPaginatedUseCase } from "./application/doctor/use-cases/get-doctors-paginated.use-case";
import { UpdateDoctorUseCase } from "./application/doctor/use-cases/update-doctor.use-case";
import { DeleteDoctorUseCase } from "./application/doctor/use-cases/delete-doctor.use-case";
import { DoctorRepository } from "./domain/doctor/repositories/doctor.repository";
import { DoctorMemoryRepository } from "./infrastructure/doctor/repositories/doctor-memory.repository";

// DoctorSchedule imports
import { DoctorScheduleController } from "./presentation/doctor-schedule/controllers/doctor-schedule.controller";
import { DoctorSchedulePresenter } from "./presentation/doctor-schedule/presenters/doctor-schedule.presenter";
import { CreateDoctorScheduleUseCase } from "./application/doctor-schedule/use-cases/create-doctor-schedule.use-case";
import { GetDoctorScheduleByIdUseCase } from "./application/doctor-schedule/use-cases/get-doctor-schedule-by-id.use-case";
import { GetDoctorSchedulesPaginatedUseCase } from "./application/doctor-schedule/use-cases/get-doctor-schedules-paginated.use-case";
import { UpdateDoctorScheduleUseCase } from "./application/doctor-schedule/use-cases/update-doctor-schedule.use-case";
import { DeleteDoctorScheduleUseCase } from "./application/doctor-schedule/use-cases/delete-doctor-schedule.use-case";
import { DoctorScheduleRepository } from "./domain/doctor-schedule/repositories/doctor-schedule.repository";
import { DoctorScheduleMemoryRepository } from "./infrastructure/doctor-schedule/repositories/doctor-schedule-memory.repository";

// Appointment imports
import { AppointmentController } from "./presentation/appointment/controllers/appointment.controller";
import { AppointmentPresenter } from "./presentation/appointment/presenters/appointment.presenter";
import { CreateAppointmentUseCase } from "./application/appointment/use-cases/create-appointment.use-case";
import { GetAppointmentByIdUseCase } from "./application/appointment/use-cases/get-appointment-by-id.use-case";
import { GetAppointmentsPaginatedUseCase } from "./application/appointment/use-cases/get-appointments-paginated.use-case";
import { UpdateAppointmentUseCase } from "./application/appointment/use-cases/update-appointment.use-case";
import { DeleteAppointmentUseCase } from "./application/appointment/use-cases/delete-appointment.use-case";
import { AppointmentRepository } from "./domain/appointment/repositories/appointment.repository";
import { AppointmentMemoryRepository } from "./infrastructure/appointment/repositories/appointment-memory.repository";

@Module({
  imports: [],
  controllers: [
    DoctorController,
    DoctorScheduleController,
    AppointmentController,
  ],
  providers: [
    // Doctor providers
    DoctorPresenter,
    CreateDoctorUseCase,
    GetDoctorByIdUseCase,
    GetDoctorsPaginatedUseCase,
    UpdateDoctorUseCase,
    DeleteDoctorUseCase,
    {
      provide: DoctorRepository,
      useClass: DoctorMemoryRepository,
    },

    // DoctorSchedule providers
    DoctorSchedulePresenter,
    CreateDoctorScheduleUseCase,
    GetDoctorScheduleByIdUseCase,
    GetDoctorSchedulesPaginatedUseCase,
    UpdateDoctorScheduleUseCase,
    DeleteDoctorScheduleUseCase,
    {
      provide: DoctorScheduleRepository,
      useClass: DoctorScheduleMemoryRepository,
    },

    // Appointment providers
    AppointmentPresenter,
    CreateAppointmentUseCase,
    GetAppointmentByIdUseCase,
    GetAppointmentsPaginatedUseCase,
    UpdateAppointmentUseCase,
    DeleteAppointmentUseCase,
    {
      provide: AppointmentRepository,
      useClass: AppointmentMemoryRepository,
    },
  ],
})
export class AppModule {}
