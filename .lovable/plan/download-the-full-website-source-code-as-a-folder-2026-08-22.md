# Download the full website source code as a folder

## Goal
Give the user a direct, clickable download of the entire website source code bundled into a single folder (`.zip`), so they can open it in VS Code and continue building locally or push it to their own repo.

## What the user chose
- **Full source code** (not a static build, not both).

## Plan

### 1. Create the archive
- Zip the complete project source from `/dev-server` (the project root) into
  `/mnt/documents/multi-agent-ai-platform-source.zip`.
- **Include** all project files needed to run and build: `package.json`,
  `bunfig.toml`, `vite.config.ts`, `tsconfig.json`, `src/`, `public/`,
  `components.json`, `.prettierrc`, `.prettierignore`, `.lovable/`, etc.
- **Exclude** non-source artifacts: `node_modules/`, `.git/`, `dist/`,
  `.output/`, `/tmp` logs, and any build caches — these regenerate with
  `npm install` / `bun install`.

### 2. Verify the archive
- Confirm the zip was created, record its size, and check that key source
  folders (`src/routes`, `src/components`, `src/services`, `src/data`) are
  present inside it.

### 3. Provide the direct download link
- Surface the file with a presentation artifact so the user gets a clickable
  download link in the chat.

## How the user will use it afterward
- `unzip multi-agent-ai-platform-source.zip`
- `cd multi-agent-ai-platform-source`
- `npm install` (or `bun install`)
- `npm run dev` to run the same app locally.

## Notes
- A live preview/direct-link for the running site already exists (the Preview
  URL); this task is specifically the source-code export.
- If the user later wants a deployable static build as well, that is a
  separate follow-up task.
