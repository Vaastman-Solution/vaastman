<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses Next.js 16.x, which has breaking changes compared with older versions.
Read the relevant guide in `node_modules/next/dist/docs/` before writing or changing Next.js code.
Heed deprecation notices and prefer current project conventions over remembered defaults.
<!-- END:nextjs-agent-rules -->

# Project Stacks

- Use Bun for everything: installing dependencies, running scripts, and invoking project tooling.
- This repo uses the App Router under `app/`.
- TypeScript is strict and uses the `@/*` path alias.
- Use Biome for formatting and linting via the existing package scripts.

# UI Rules

- When installing or generating UI components, follow the existing `components.json` configuration.
- Preserve the current shadcn setup and alias structure.

## Icons Rules
- Use **Tabler Icons** for all icons.
- Prefer **filled variants** by default.
- keep size-5 in classname for icons

# Command Rules

- Prefer Bun commands such as `bun install`, `bun run dev`, `bun run lint`, and `bun run format`.
- Do not introduce npm, pnpm, or yarn commands unless the user explicitly asks for them.


# Tooling Rules (Package Manager)

- Use Bun for everything: installing dependencies, running scripts, and invoking project tooling.

# Maintainability Rule

- If a file becomes complex, extract helper functions into a `lib/` module instead of keeping all logic inline in the same file.

# Environment Variable Rules

- If you update `.env` or any environment variables, always make sure to update `.env.example` as a reference.

# Feature Route Pattern

- For data-driven routes under `app/`, keep feature code colocated inside the route folder.
- Use `app/<route>/_components/` for route-local UI pieces such as dialogs, forms, tables, and columns.
- Use `app/<route>/lib/actions.ts` for route-local server actions.
- Use `app/<route>/lib/zod-type/` for route-local Zod schemas and form/input types.
- Use `app/<route>/query/` for TanStack Query hooks.
- Prefer route-local imports for feature-specific code instead of moving it into shared folders too early.

## Server Action Conventions

- Route actions should start with `"use server"`.
- Each action should handle auth/session checks inside the action itself.
- For writes, validate incoming payloads with the route-local Zod schema before database access.
- Keep action return shapes consistent:
  - success: `{ success: true, data }`
  - failure: `{ success: false, message }`
- Catch database or action errors and return a readable `message` string for the client layer.

## TanStack Query Conventions

- Use TanStack Query for route data fetching and mutations.
- Put read hooks in `app/<route>/query/use-*.ts`.
- Put mutation hooks in `app/<route>/query/mut-*.ts`.
- Always use array query keys.
- Query hooks should call the server action, check `res.success`, throw `new Error(res.message)` on failure, and return `res.data` on success.
- Unless the route has a clear reason to retry, prefer `retry: false` in route query hooks.
- Route pages or route-local client components should consume the query hook directly and handle `isPending`, `isError`, and `error`.

## Mutation Conventions

- Use `useMutation` together with `useQueryClient` for every create, update, and delete flow.
- Mutation hooks should call the related server action, throw on `!res.success`, and return the successful response.  
- After every successful mutation, invalidate the related query key with `queryClient.invalidateQueries(...)`.
- Invalidation is mandatory for create, update, and delete mutations. Do not skip it.
- Invalidate the exact query key that the list/detail view uses, instead of using broad invalidation when the target key is known.
- Keep success and error feedback close to the mutation hook when that route follows the existing toast-based pattern.

## CRUD Naming Conventions

- Read hooks: `use-get-<entity>.ts`
- Create mutations: `mut-add-<entity>.ts`
- Update mutations: `mut-update-<entity>.ts`
- Delete mutations: `mut-delete-<entity>.ts`
- Keep server action names aligned with the hook names so reads and writes are easy to trace.

# Commit Rules

- Commit only related files together as one logical change set.
- Do not commit everything at once (avoid `git add .`).
- Write clear and concise commit messages.
- Do not push commits unless explicitly requested.

# Adding a New University

To add a new university to the system, follow these steps:

1. **Update the Enum**:
   Open [college.prisma](file:///home/kys/projects/vaastman/prisma/models/college.prisma) and add the new university to the `UniversityName` enum (use uppercase with underscores, e.g. `NEW_UNIVERSITY_NAME`).

2. **Sync the Database Schema and Regenerate Client**:
   Run the following commands in your terminal:
   ```bash
   bun run db:push
   ```
   This command will push the updated schema to the database and regenerate the Prisma client.

> [!NOTE]
> You do **not** need to manually insert the new university record into the database. When you add the first college under this university via the admin UI, the application will automatically create the corresponding `University` record in the database if it doesn't already exist.
