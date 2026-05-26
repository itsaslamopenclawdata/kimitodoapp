'use client'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

interface TodoListProps {
  items: TodoItem[]
  onToggle: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

import TodoItemComponent from './TodoItem'

export default function TodoList({ items, onToggle, onDelete, isLoading = false }: TodoListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">No todos yet. Add one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <TodoItemComponent
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </div>
  )
}
