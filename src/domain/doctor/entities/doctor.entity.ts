export interface IDoctor {
  id: string;
  name: string;
  specialty: string;
  availableSchedules: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Doctor implements IDoctor {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly specialty: string,
    public readonly availableSchedules: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  static create(
    id: string,
    name: string,
    specialty: string,
    availableSchedules: string[] = []
  ): Doctor {
    const now = new Date();
    return new Doctor(id, name, specialty, availableSchedules, now, now);
  }

  update(
    name?: string,
    specialty?: string,
    availableSchedules?: string[]
  ): Doctor {
    return new Doctor(
      this.id,
      name ?? this.name,
      specialty ?? this.specialty,
      availableSchedules ?? this.availableSchedules,
      this.createdAt,
      new Date()
    );
  }

  addSchedule(scheduleId: string): Doctor {
    if (this.availableSchedules.includes(scheduleId)) {
      return this;
    }

    return new Doctor(
      this.id,
      this.name,
      this.specialty,
      [...this.availableSchedules, scheduleId],
      this.createdAt,
      new Date()
    );
  }

  removeSchedule(scheduleId: string): Doctor {
    const filteredSchedules = this.availableSchedules.filter(
      (id) => id !== scheduleId
    );

    return new Doctor(
      this.id,
      this.name,
      this.specialty,
      filteredSchedules,
      this.createdAt,
      new Date()
    );
  }
}
