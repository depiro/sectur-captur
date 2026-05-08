
# Captur Platform — Architecture v1

## Overview

This document defines the initial technical architecture for the **Captur** platform.
The goal is to establish a **simple, robust, and scalable foundation** without unnecessary complexity.

This architecture is designed to:

- Improve UX and reliability
- Automate repetitive processes
- Support notifications and certificate generation
- Allow future scaling without redesigning the system

---

# Core Stack

## Backend

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma

### Authentication & Authorization

- JWT-based authentication
- Refresh tokens
- RBAC (Role-Based Access Control) implemented internally

(No Keycloak in v1)

---

## Frontend

- **Framework:** Next.js
- **Language:** TypeScript
- **UI:** Tailwind CSS
- **Component Library:** shadcn/ui

### Forms & Validation

- React Hook Form
- Zod

### Data Fetching

- TanStack Query

---

## Background Jobs

Used for non-blocking operations.

- **Queue Engine:** BullMQ
- **Queue Storage:** Redis
- **Workers:** Separate NestJS worker process

### Use Cases

- Email sending
- Certificate generation (PDF)
- Course reminders
- Notifications

---

## File Storage

Initial strategy:

- Local filesystem storage

Used for:

- Certificate PDFs
- Trainer CVs
- Banner images
- Course resources

Future upgrade path:

- MinIO (S3-compatible object storage)

---

## Infrastructure

- Ubuntu Server
- Nginx (reverse proxy)
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

---

# System Architecture

```
Frontend (Next.js)

        |

Backend API (NestJS)

        |

PostgreSQL Database

        |

Redis (Job Queue)

        |

Worker (Async Processing)

        |

Filesystem Storage
```

---

# Background Job Queues

Initial queues:

## emails

Jobs:

- send-enrollment-confirmation
- send-password-reset
- send-certificate-email

## certificates

Jobs:

- generate-certificate-pdf

## notifications

Jobs:

- send-course-reminder
- notify-user-events

---

# Architectural Decisions

## Monolithic Modular Architecture

Single deployable backend with modular structure.

Reason:

- Simpler deployment
- Easier maintenance
- Lower operational complexity
- Suitable for current scale

---

## No Microservices

Not required at current scale.

Avoid:

- Operational overhead
- Distributed system complexity
- Premature optimization

---

## No Keycloak (v1)

Authentication handled internally.

Future adoption possible if:

- SSO becomes required
- Multiple systems integration is needed

---

## No MinIO (v1)

Filesystem storage is sufficient initially.

Migration path available if:

- File volume increases
- Distributed storage is needed

---

## Redis Used Only for Queues

Not used for:

- Caching
- Sessions
- Data persistence

Used only for:

- Reliable background job execution

---

# Deployment Model

Initial deployment structure:

```
docker-compose

services:

  frontend
  backend
  worker
  postgres
  redis
  nginx
```

Single server deployment is sufficient for v1.

---

# Future Scaling Strategy

When needed:

## Horizontal Scaling

- Multiple backend instances
- Multiple workers
- Shared Redis queue

## Storage Migration

Move from:

Filesystem

To:

MinIO

Without application redesign.

## Authentication Upgrade

Possible future integration:

- Keycloak
- Government SSO

---

# Final Stack Summary

```
Next.js
NestJS
PostgreSQL
Prisma
Redis
BullMQ
Tailwind
shadcn/ui
Docker
Nginx
GitHub Actions
```

---

# Notes

This architecture intentionally prioritizes:

- Simplicity
- Reliability
- Maintainability
- Controlled scalability

Avoiding premature complexity is a core design principle.
