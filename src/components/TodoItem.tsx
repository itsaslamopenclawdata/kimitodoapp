'use client'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

interface TodoItemProps {
  item: TodoItem
  onToggle: (id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  isLoading?: boolean
}

export default function TodoItemComponent({ item, onToggle, onDelete, isLoading = false }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id)}
        disabled={isLoading}
        className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer disabled:opacity-50"
      />
      <span
        className={`flex-1 ${
          item.completed
            ? 'line-through text-gray-400'
            : 'text-gray-700'
        }`}
      >
        {item.text}
      </span>
      <button
        onClick={() => onDelete(item.id)}
        disabled={isLoading}
        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400 transition-colors"
      >
        Delete
      </button>
    </div>
  )
}
