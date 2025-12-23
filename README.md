# HD Automóveis – Modern Car Dealership Platform

## Overview

Production-ready SaaS platform for inventory management, lead capture, and admin analytics.

## Requirements

- Node.js 20+
- pnpm 9+

## Setup

```bash
pnpm install --frozen-lockfile
```

Copy env templates and fill values:

```bash
cp .env.example .env.development
```

## Development

```bash
pnpm dev
```

## Tests

```bash
pnpm test
pnpm run test:ci
```

## Structure

- `src/modules/inventory` – inventory sync and provider integration
- `src/modules/leads` – lead quiz and scoring
- `src/modules/admin` – admin dashboard and audit log
- `supabase/migrations` – database schema

## Deployment

See `docs/DEPLOYMENT.md`.
