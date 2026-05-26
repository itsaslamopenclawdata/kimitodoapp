# Product Requirements Document — KimiTodoApp

## Problem Statement

Users need a simple, fast, and reliable way to manage personal TODO items from any device without signing up, installing apps, or dealing with complex project management tools. The current alternatives are either too heavyweight (Trello, Asana) or lack cross-device sync (localStorage-only apps).

## Solution

A minimal, beautiful TODO web application that runs entirely in the browser, persists data to the cloud via a backend API, and deploys to Vercel with zero configuration. Users can add, complete, and delete TODO items instantly.

---

## User Stories

1. As a casual user, I want to add a TODO item by typing text and pressing Enter, so that I can quickly capture tasks without friction.
2. As a casual user, I want to mark a TODO item as complete by clicking a checkbox, so that I can track what I've done.
3. As a casual user, I want to delete a TODO item, so that I can remove tasks I no longer need.
4. As a casual user, I want to see my TODO list load automatically on page load, so that I can jump right into my tasks.
5. As a mobile user, I want the app to work well on my phone browser, so that I can manage tasks on the go.
6. As a user, I want my TODO items to persist across browser sessions and devices, so that I can access my list anywhere.
7. As a user, I want a clean, distraction-free interface, so that I can focus on my tasks, not the tool.
8. As a returning user, I want my list to be waiting for me when I return, so that I don't have to re-enter tasks.
9. As a user, I want to see how many items remain incomplete, so that I know how much work is left.
10. As a user with many items, I want to see my TODO items in a scrollable list, so that I can handle large lists comfortably.

---

## Implementation Decisions

### Stack
- **Frontend**: Next.js (App Router) with TypeScript — single-page app, zero backend pages needed initially
- **Styling**: Tailwind CSS — fast development, consistent design
- **Deployment**: Vercel — zero-config deployment, edge-optimized
- **Backend**: API Routes (Next.js) + Vercel KV (Redis) for persistence — simplest possible durable storage
- **State**: React `useState` + SWR for client-side data fetching/caching

### Modules

1. **TodoItem schema**
   - `id`: string (nanoid or UUID)
   - `text`: string
   - `completed`: boolean
   - `createdAt`: ISO timestamp

2. **API Routes**
   - `GET /api/todos` — return all todos, sorted by createdAt ascending
   - `POST /api/todos` — create a new todo, body: `{ text: string }`
   - `PATCH /api/todos/[id]` — update a todo, body: `{ completed?: boolean, text?: string }`
   - `DELETE /api/todos/[id]` — delete a todo by id

3. **Frontend Components**
   - `TodoList` — renders the list of todos with checkbox and delete button per item
   - `TodoItem` — single row: checkbox, text (strikethrough when complete), delete button
   - `AddTodoForm` — input + submit, Enter key support
   - `TodoCounter` — shows "X items left" count

4. **Data Flow**
   - SWR fetches from `GET /api/todos` on mount
   - Mutations call respective POST/PATCH/DELETE endpoints
   - Optimistic updates on mutations for snappy UX

### Vercel KV (Redis) Schema
- Key `todos` — JSON array of TodoItem objects

---

## Testing Decisions

Good tests verify external behavior only:
- API routes: integration tests against a test Redis instance using `msw` or by mocking `@vercel/kv`
- Frontend: Playwright/Cypress e2e tests for the happy path (add, complete, delete)
- Unit tests are not needed for this scope — the logic is thin and API-driven

---

## Out of Scope

- User authentication / accounts
- Due dates, labels, priorities, or categories
- Drag-and-drop reordering
- Sharing or collaboration
- Email/notification reminders
- Offline-first / PWA support
- Data export or import
- Multiple lists or projects
- Browser extensions or mobile native apps

---

## Further Notes

- The design should be minimal: white/off-white background, clean typography, subtle shadows, generous whitespace.
- The primary interaction is keyboard-first: typing and pressing Enter to add.
- No onboarding or tutorial needed — the app is self-explanatory.
- Performance target: < 100ms perceived latency on all interactions via optimistic updates.
