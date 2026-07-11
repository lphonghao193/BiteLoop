# BiteLoop

BiteLoop is a private, social food check-in app and decision assistant for iOS
and Android. See [IDEA.md](./IDEA.md) for the product definition and use cases,
and [docs/STACK.md](./docs/STACK.md) for architecture diagrams and selectable
technology options. The checked-in Expo app is a provisional MVP scaffold, not
an irreversible stack decision.

The first development target is a physical iPhone running iOS 17 or newer. The
iOS deployment target is set to 17.0 in the Expo application configuration.

## Repository layout

```text
apps/mobile/       Expo React Native application for iOS and Android
docs/              Architecture and engineering decisions
supabase/          Database migrations and backend configuration (next phase)
IDEA.md            Product requirements and use cases
```

The application architecture is a modular monolith using Supabase, not a set of
independently deployed microservices. See [docs/DOCKER.md](./docs/DOCKER.md) for
the architecture classification and containerized development workflow.
Development progress is tracked in
[docs/IMPLEMENTATION_CHECKLIST.md](./docs/IMPLEMENTATION_CHECKLIST.md).

## Prerequisites

- Docker Desktop with Docker Compose
- Native Supabase CLI in the ignored `.tools` directory
- Expo Go for quick device testing, or an Android/iOS development environment
- An Expo account for EAS cloud builds
- A Supabase project when backend integration begins

Node.js, npm dependencies, Expo CLI, and Metro run inside the mobile container.
No host Node.js installation is required. Dependencies are installed into the
container's `node_modules` from the committed `package-lock.json`.

## Start local Supabase

```powershell
.\.tools\supabase.exe start --exclude vector
```

Supabase Studio is normally available at `http://127.0.0.1:54323`.
Vector log collection is excluded locally because Docker Desktop does not expose
its insecure TCP API; all product-required Supabase services remain enabled.

## Run with Docker

Create the Docker environment file and start containerized Node and Metro:

```powershell
Copy-Item .env.docker.example .env.docker
docker compose --env-file .env.docker up --build mobile
```

Before starting, set `EXPO_PACKAGER_HOSTNAME` in `.env.docker` to the
development computer's LAN IP so Expo Go can reach Metro.

Scan the displayed QR code with Expo Go. The native app runs on a phone or
emulator; Node and Metro remain inside Docker. Networking instructions are in
[docs/DOCKER.md](./docs/DOCKER.md).

## Validate

```powershell
docker compose run --rm mobile npm run typecheck
```

## Build both platforms

Run EAS CLI inside the Node container:

```bash
docker compose run --rm mobile npx --yes eas-cli build --platform all --profile preview
```

Replace the placeholder bundle identifiers in `apps/mobile/app.json` before a
store build.
