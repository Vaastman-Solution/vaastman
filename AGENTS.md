<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This project uses Next.js 16.x, which has breaking changes compared with older versions.
Read the relevant guide in `node_modules/next/dist/docs/` before writing or changing Next.js code.
Heed deprecation notices and prefer current project conventions over remembered defaults.
<!-- END:nextjs-agent-rules -->

# Project Stack

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

# Commit Rules

- Commit only related files together as one logical change set.
- Do not commit everything at once (avoid `git add .`).
- Write clear and concise commit messages.
- Do not push commits unless explicitly requested.
