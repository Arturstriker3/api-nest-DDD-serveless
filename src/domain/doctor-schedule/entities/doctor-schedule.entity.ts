export interface IDoctorSchedule {
  id: string;
  doctorId: string;
  availableDate: Date;
  availableTime: string;
  appointmentId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class DoctorSchedule implements IDoctorSchedule {
  constructor(
    public readonly id: string,
    public readonly doctorId: string,
    public readonly availableDate: Date,
    public readonly availableTime: string,
    public readonly appointmentId: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {
    this.validateTime(availableTime);
  }

  static create(
    id: string,
    doctorId: string,
    availableDate: Date,
    availableTime: string,
    appointmentId: string | null = null
  ): DoctorSchedule {
    const now = new Date();
    return new DoctorSchedule(
      id,
      doctorId,
      availableDate,
      availableTime,
      appointmentId,
      now,
      now
    );
  }

  private validateTime(time: string): void {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      throw new Error("Invalid time format. Use HH:MM format (00:00 to 23:59)");
    }
  }

  isAvailable(): boolean {
    return this.appointmentId === null;
  }

  assignAppointment(appointmentId: string): DoctorSchedule {
    if (!this.isAvailable()) {
      throw new Error("Schedule is already booked");
    }

    if (!appointmentId?.trim()) {
      throw new Error("Appointment ID is required");
    }

    return new DoctorSchedule(
      this.id,
      this.doctorId,
      this.availableDate,
      this.availableTime,
      appointmentId,
      this.createdAt,
      new Date()
    );
  }

  clearAppointment(): DoctorSchedule {
    if (this.isAvailable()) {
      throw new Error("Schedule is already available");
    }

    return new DoctorSchedule(
      this.id,
      this.doctorId,
      this.availableDate,
      this.availableTime,
      null,
      this.createdAt,
      new Date()
    );
  }

  update(
    availableDate?: Date,
    availableTime?: string,
    appointmentId?: string | null
  ): DoctorSchedule {
    if (availableTime && availableTime !== this.availableTime) {
      this.validateTime(availableTime);
    }

    return new DoctorSchedule(
      this.id,
      this.doctorId,
      availableDate ?? this.availableDate,
      availableTime ?? this.availableTime,
      appointmentId !== undefined ? appointmentId : this.appointmentId,
      this.createdAt,
      new Date()
    );
  }

  getDateTimeKey(): string {
    const dateStr = this.availableDate.toISOString().split("T")[0];
    return `${this.doctorId}_${dateStr}_${this.availableTime}`;
  }
}
