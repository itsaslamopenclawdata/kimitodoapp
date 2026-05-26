# KimiTodo App

A simple, elegant TODO application built with Next.js, TypeScript, Tailwind CSS, and Vercel KV.

## Features

- ✅ Add new todos with Enter key support
- ✅ Mark todos as complete with visual strikethrough
- ✅ Delete todos
- ✅ Real-time todo counter showing items left
- ✅ Persistent storage using Vercel KV (Redis)
- ✅ Optimistic UI updates with SWR
- ✅ Fully responsive design for mobile and desktop
- ✅ Type-safe with TypeScript

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Vercel KV (Redis)
- **State Management**: SWR for data fetching
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your Vercel KV credentials:
```
KV_REST_API_URL=<your-kv-url>
KV_REST_API_TOKEN=<your-kv-token>
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## API Endpoints

### GET /api/todos
Returns all todos sorted by creation date.

**Response:**
```json
[
  {
    "id": "1234567890",
    "text": "Buy groceries",
    "completed": false,
    "createdAt": "2024-05-26T10:00:00Z"
  }
]
```

### POST /api/todos
Create a new todo.

**Request:**
```json
{
  "text": "Buy groceries"
}
```

### PATCH /api/todos/[id]
Update a todo's completion status or text.

**Request:**
```json
{
  "completed": true,
  "text": "Optional new text"
}
```

### DELETE /api/todos/[id]
Delete a todo by ID.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── todos/
│   │       ├── route.ts          # GET & POST /api/todos
│   │       └── [id]/route.ts     # PATCH & DELETE /api/todos/[id]
│   ├── globals.css               # Tailwind styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page with app logic
└── components/
    ├── AddTodoForm.tsx           # Input form for new todos
    ├── TodoItem.tsx              # Individual todo item component
    ├── TodoList.tsx              # List of all todos
    └── TodoCounter.tsx           # Items counter display
```

## Acceptance Criteria Status

- [x] Empty state shows no items
- [x] Typing in input and pressing Enter creates a TODO and shows it in the list
- [x] Clicking checkbox marks item complete (strikethrough visual)
- [x] Clicking delete button removes item from list
- [x] Counter updates correctly
- [x] Works on mobile viewport

## Deployment

Deploy to Vercel:

1. Push to GitHub
2. Connect your GitHub repo to Vercel
3. Add Vercel KV environment variables
4. Deploy!

## License

MIT
