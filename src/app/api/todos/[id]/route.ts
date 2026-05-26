import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'
import type { TodoItem } from '../route'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { completed, text } = body

    const todos = await kv.get<TodoItem[]>('todos') || []
    const todoIndex = todos.findIndex(t => t.id === id)

    if (todoIndex === -1) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    if (completed !== undefined) {
      todos[todoIndex].completed = completed
    }
    if (text !== undefined && text.trim()) {
      todos[todoIndex].text = text.trim()
    }

    await kv.set('todos', todos)
    return NextResponse.json(todos[todoIndex])
  } catch (error) {
    console.error('PATCH /api/todos/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const todos = await kv.get<TodoItem[]>('todos') || []
    const filteredTodos = todos.filter(t => t.id !== id)

    if (todos.length === filteredTodos.length) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    await kv.set('todos', filteredTodos)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/todos/[id] error:', error)
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}
