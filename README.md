# Wealthcare API

Healthcare management API built with NestJS following Clean Architecture and Domain-Driven Design (DDD) principles.

## 🏗️ Architecture Overview

This application implements **Clean Architecture** with **Domain-Driven Design (DDD)** principles, providing a scalable and maintainable healthcare management system.

### Clean Architecture Layers

- **Domain**: Business entities, value objects, and repository interfaces
- **Application**: Use cases, DTOs, and business logic orchestration
- **Infrastructure**: Concrete implementations (in-memory repositories)
- **Presentation**: Controllers, presenters, and HTTP layer

### Domain-Driven Design

The API is organized around three main **bounded contexts**:

1. **Doctor Management** - Healthcare professionals and their information
2. **Schedule Management** - Doctor availability and time slots
3. **Appointment Management** - Patient appointments and booking system

## 🌟 Features

### ✅ Complete CRUD Operations

- **Doctors**: Create, read, update, delete healthcare professionals
- **Doctor Schedules**: Manage doctor availability slots
- **Appointments**: Handle patient appointments and bookings

### ✅ Advanced Business Logic

- **Referential Integrity**: Schedules must reference existing doctors
- **Appointment Booking**: Automatic schedule occupation when appointments are created
- **Schedule Availability**: Proper management of available vs occupied time slots
- **Data Validation**: Comprehensive input validation and business rules

### ✅ Production-Ready Features

- **Pagination**: Generic pagination system across all domains
- **Filtering**: Advanced search capabilities with multiple criteria
- **Error Handling**: Proper HTTP status codes and NestJS exceptions
- **Swagger Documentation**: Interactive API documentation
- **Clean Code**: Guard clauses, SOLID principles, and English naming conventions

### ✅ Architecture Benefits

- **Independent Domains**: Loosely coupled bounded contexts
- **Testable Design**: Dependency injection and interface-based architecture
- **Scalable Structure**: Easy to extend with new domains
- **Technology Agnostic**: Business logic independent of frameworks

## 📁 Project Structure

```
src/
├── domain/
│   ├── shared/
│   │   └── types/
│   │       └── pagination.types.ts
│   ├── doctor/
│   │   ├── entities/
│   │   │   └── doctor.entity.ts
│   │   └── repositories/
│   │       └── doctor.repository.ts
│   ├── doctor-schedule/
│   │   ├── entities/
│   │   │   └── doctor-schedule.entity.ts
│   │   └── repositories/
│   │       └── doctor-schedule.repository.ts
│   └── appointment/
│       ├── entities/
│       │   └── appointment.entity.ts
│       └── repositories/
│           └── appointment.repository.ts
├── application/
│   ├── doctor/
│   │   ├── dtos/
│   │   │   ├── create-doctor.dto.ts
│   │   │   ├── doctor.dto.ts
│   │   │   ├── update-doctor.dto.ts
│   │   │   ├── doctor-filter.dto.ts
│   │   │   └── paginated-doctor-response.dto.ts
│   │   └── use-cases/
│   │       ├── create-doctor.use-case.ts
│   │       ├── get-doctor-by-id.use-case.ts
│   │       ├── get-doctors-paginated.use-case.ts
│   │       ├── update-doctor.use-case.ts
│   │       └── delete-doctor.use-case.ts
│   ├── doctor-schedule/
│   │   ├── dtos/
│   │   │   ├── create-doctor-schedule.dto.ts
│   │   │   ├── doctor-schedule.dto.ts
│   │   │   ├── update-doctor-schedule.dto.ts
│   │   │   ├── doctor-schedule-filter.dto.ts
│   │   │   └── paginated-doctor-schedule-response.dto.ts
│   │   └── use-cases/
│   │       ├── create-doctor-schedule.use-case.ts
│   │       ├── get-doctor-schedule-by-id.use-case.ts
│   │       ├── get-doctor-schedules-paginated.use-case.ts
│   │       ├── update-doctor-schedule.use-case.ts
│   │       └── delete-doctor-schedule.use-case.ts
│   └── appointment/
│       ├── dtos/
│       │   ├── create-appointment.dto.ts
│       │   ├── appointment.dto.ts
│       │   ├── update-appointment.dto.ts
│       │   ├── appointment-filter.dto.ts
│       │   └── paginated-appointment-response.dto.ts
│       └── use-cases/
│           ├── create-appointment.use-case.ts
│           ├── get-appointment-by-id.use-case.ts
│           ├── get-appointments-paginated.use-case.ts
│           ├── update-appointment.use-case.ts
│           └── delete-appointment.use-case.ts
├── infrastructure/
│   └── repositories/
│       ├── doctor-memory.repository.ts
│       ├── doctor-schedule-memory.repository.ts
│       └── appointment-memory.repository.ts
├── presentation/
│   ├── controllers/
│   │   ├── doctor.controller.ts
│   │   ├── doctor-schedule.controller.ts
│   │   └── appointment.controller.ts
│   └── presenters/
│       ├── doctor.presenter.ts
│       ├── doctor-schedule.presenter.ts
│       └── appointment.presenter.ts
├── app.module.ts
└── main.ts
```

## 🚀 Installation & Setup

### Method 1: Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start:dev

# Build for production
pnpm build
pnpm start:prod
```

### Method 2: Docker (Recommended)

```bash
# Using Docker Compose (easiest)
docker-compose up --build

# Or build manually
docker build -t wealthcare-api .
docker run -p 3000:3000 wealthcare-api
```

### Available Docker Scripts

```bash
# Development with hot-reload
pnpm docker:dev

# Production (background)
pnpm docker:prod

# Stop containers
docker-compose down

# View logs
docker-compose logs -f wealthcare-api
```

## 🐳 Docker Configuration

### Optimized Docker Features

- ✅ **Multi-stage build** for size optimization (~50MB final image)
- ✅ **Alpine Linux** base for security and performance
- ✅ **Non-root user** for enhanced security
- ✅ **Health check** for container monitoring
- ✅ **Optimized caching** for faster rebuilds
- ✅ **Production-ready** configuration

### Docker Commands

```bash
# Build image
docker build -t wealthcare-api .

# Run container
docker run -p 3000:3000 wealthcare-api

# Run in background
docker run -d -p 3000:3000 --name wealthcare-api wealthcare-api

# View container logs
docker logs -f wealthcare-api

# Stop and remove
docker stop wealthcare-api && docker rm wealthcare-api
```

The application will be available at:

- **API Base**: http://localhost:3000/api
- **Swagger Documentation**: http://localhost:3000/api/docs

## 📋 API Endpoints

### 👨‍⚕️ Doctors

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| POST   | `/api/doctors`        | Create a new doctor                |
| GET    | `/api/doctors/search` | Get paginated doctors with filters |
| GET    | `/api/doctors/:id`    | Get doctor by ID                   |
| PUT    | `/api/doctors/:id`    | Update doctor                      |
| DELETE | `/api/doctors/:id`    | Delete doctor                      |

**Create Doctor Example:**

```json
POST /api/doctors
{
  "name": "Dr. John Smith",
  "specialty": "Cardiology"
}
```

**Search Doctors Example:**

```http
GET /api/doctors/search?page=1&limit=10&name=John&specialty=Cardiology
```

### 📅 Doctor Schedules

| Method | Endpoint                       | Description                          |
| ------ | ------------------------------ | ------------------------------------ |
| POST   | `/api/doctor-schedules`        | Create schedule slot                 |
| GET    | `/api/doctor-schedules/search` | Get paginated schedules with filters |
| GET    | `/api/doctor-schedules/:id`    | Get schedule by ID                   |
| PUT    | `/api/doctor-schedules/:id`    | Update schedule                      |
| DELETE | `/api/doctor-schedules/:id`    | Delete schedule                      |

**Create Schedule Example:**

```json
POST /api/doctor-schedules
{
  "doctorId": "d47ac10b-58cc-4372-a567-0e02b2c3d479",
  "availableDate": "2024-02-15",
  "availableTime": "14:30"
}
```

**Search Schedules Example:**

```http
GET /api/doctor-schedules/search?doctorId=d47ac10b-58cc-4372-a567-0e02b2c3d479&availableDate=2024-02-15
```

### 🗓️ Appointments

| Method | Endpoint                   | Description                             |
| ------ | -------------------------- | --------------------------------------- |
| POST   | `/api/appointments`        | Create appointment                      |
| GET    | `/api/appointments/search` | Get paginated appointments with filters |
| GET    | `/api/appointments/:id`    | Get appointment by ID                   |
| PUT    | `/api/appointments/:id`    | Update appointment                      |
| DELETE | `/api/appointments/:id`    | Delete appointment                      |

**Create Appointment Example:**

```json
POST /api/appointments
{
  "doctorScheduleId": "s47ac10b-58cc-4372-a567-0e02b2c3d479",
  "patientName": "Jane Doe"
}
```

**Search Appointments Example:**

```http
GET /api/appointments/search?patientName=Jane&page=1&limit=10
```

## 💼 Business Logic & Workflows

### 📝 Complete Workflow Example

1. **Create Doctor**

   ```bash
   POST /api/doctors
   # Creates doctor with empty schedule initially
   ```

2. **Add Doctor's Available Schedule**

   ```bash
   POST /api/doctor-schedules
   # Creates available time slots for the doctor
   ```

3. **Book Appointment**
   ```bash
   POST /api/appointments
   # Books appointment and marks schedule as occupied
   ```

### 🔒 Business Rules

- **Referential Integrity**: Schedules must reference existing doctors
- **Schedule Management**: New schedules are always created as available
- **Appointment Booking**: Automatically marks schedule as occupied
- **Appointment Cancellation**: Frees up the schedule slot when deleted
- **Data Validation**: Comprehensive validation with proper error responses

### 🎯 Domain Independence

Each domain operates independently:

- **Doctors** can exist without schedules
- **Schedules** require existing doctors
- **Appointments** require existing schedules
- Frontend combines data as needed via separate API calls

## 📖 Swagger Documentation

Interactive API documentation is available at:
**http://localhost:3000/api/docs**

Features:

- 📋 Complete endpoint documentation
- 🧪 Interactive testing interface
- 📝 Request/response examples
- 🔍 DTO specifications
- 🎯 Error response documentation

## 🛠️ Technologies

### Core Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Class-validator** - Validation decorators
- **UUID** - Unique identifier generation
- **Swagger/OpenAPI** - API documentation

### Architecture & Patterns

- **Clean Architecture** - Layered dependency management
- **Domain-Driven Design** - Business-focused modeling
- **SOLID Principles** - Object-oriented design principles
- **Guard Clauses** - Reduced nesting and complexity
- **Dependency Injection** - Loose coupling and testability

### Development & DevOps

- **Docker** - Containerization
- **PNPM** - Package management
- **ESLint + Prettier** - Code quality and formatting

## 🎨 Code Quality & Best Practices

### ✅ Implemented Patterns

- **Guard Clauses**: Reduced nested if-statements for better readability
- **English Naming**: Consistent English names throughout codebase
- **Clean Code**: SOLID principles and separation of concerns
- **Error Handling**: Proper HTTP exceptions (400, 404, 409)
- **DTO Interfaces**: Complete interface definitions for frontend integration
- **Validation**: Comprehensive input validation with class-validator
- **Type Safety**: Full TypeScript implementation with strict typing

### ✅ Architecture Benefits

- **Scalability**: Easy to add new domains and features
- **Maintainability**: Clear separation of concerns and dependencies
- **Testability**: Isolated business logic with dependency injection
- **Technology Independence**: Business rules independent of frameworks
- **Production Ready**: Proper error handling and validation

## 🚀 Production Considerations

### Database Migration

- Replace in-memory repositories with database implementations
- Maintain the same repository interfaces
- Add database connection and migration scripts

### Environment Configuration

- Environment-specific configurations
- Secret management for sensitive data
- Logging and monitoring setup

### Security

- Authentication and authorization
- Rate limiting and request validation
- CORS configuration for frontend integration

### Performance

- Caching strategies for frequently accessed data
- Database indexing for search operations
- API response optimization

## 📄 License

This project serves as an example implementation of **NestJS with Clean Architecture and DDD principles** for healthcare management systems.

---

**Perfect for learning:**

- 🏗️ Clean Architecture implementation
- 🎯 Domain-Driven Design patterns
- 🚀 NestJS best practices
- 🐳 Docker optimization techniques
- 📋 API documentation with Swagger
