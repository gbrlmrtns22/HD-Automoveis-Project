# AGENTS.md

## Setup commands
- Install deps: `pnpm install --frozen-lockfile`

## Test commands
- Unit tests (CI): `pnpm test`
- Coverage: `pnpm run test:ci`

## Notes
- Never run interactive test watchers in CI. Use `vitest run`.
