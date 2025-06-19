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

@Module({
  imports: [],
  controllers: [DoctorController],
  providers: [
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
  ],
})
export class AppModule {}
