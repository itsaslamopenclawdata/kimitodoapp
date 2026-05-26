import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export async function GET() {
  try {
    const todos = await kv.get<TodoItem[]>('todos') || []
    return NextResponse.json(todos)
  } catch (error) {
    console.error('GET /api/todos error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text } = body

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    const todos = await kv.get<TodoItem[]>('todos') || []
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    }

    todos.push(newTodo)
    await kv.set('todos', todos)

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    console.error('POST /api/todos error:', error)
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}
