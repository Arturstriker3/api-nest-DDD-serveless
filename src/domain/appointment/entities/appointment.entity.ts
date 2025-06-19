export interface IAppointment {
  id: string;
  doctorScheduleId: string;
  patientName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Appointment implements IAppointment {
  constructor(
    public readonly id: string,
    public readonly doctorScheduleId: string,
    public readonly patientName: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    this.validatePatientName(patientName);
  }

  static create(
    id: string,
    doctorScheduleId: string,
    patientName: string
  ): Appointment {
    const now = new Date();
    return new Appointment(id, doctorScheduleId, patientName, now, now);
  }

  private validatePatientName(name: string): void {
    if (!name?.trim()) {
      throw new Error("Patient name is required");
    }

    if (name.trim().length < 2) {
      throw new Error("Patient name must have at least 2 characters");
    }

    if (name.trim().length > 100) {
      throw new Error("Patient name cannot exceed 100 characters");
    }
  }

  update(patientName?: string): Appointment {
    const updatedName = patientName?.trim() || this.patientName;

    return new Appointment(
      this.id,
      this.doctorScheduleId,
      updatedName,
      this.createdAt,
      new Date()
    );
  }

  getPatientNameFormatted(): string {
    return this.patientName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
}
