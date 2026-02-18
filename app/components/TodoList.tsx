"use client";

import { type Priority, type Todo, type CategoryInfo } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  categories: CategoryInfo[];
  loading: boolean;
  activeFiltersCount: number;
  editingId: number | null;
  editText: string;
  setEditText: (t: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void;
  onUpdatePriority: (id: number, priority: Priority) => void;
  showForm?: boolean;
  showFilters?: boolean;
}

export function TodoList({
  todos,
  categories,
  loading,
  activeFiltersCount,
  editingId,
  editText,
  setEditText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onUpdatePriority,
  showForm,
  showFilters,
}: TodoListProps) {
  const maxHeight = () => {
    if (showForm && showFilters) return "max-h-[65px]";
    if (showForm) return "max-h-[129px]";
    if (showFilters) return "max-h-[216px]";
    return "max-h-[280px]";
  };

  return (
    <div className={`space-y-2 mb-6 overflow-y-auto ${maxHeight()}`}>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-full space-y-4 py-12 text-muted-foreground/50">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-xs font-medium uppercase tracking-widest">
            Loading Tasks...
          </p>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-14 border-2 border-dashed border-white/5 rounded-xl bg-white/5">
          <p className="text-muted-foreground">
            {activeFiltersCount > 0
              ? "No tasks match your filters."
              : "No tasks yet. Add one above!"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              categories={categories}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              onToggle={onToggle}
              onDelete={onDelete}
              onStartEdit={onStartEdit}
              onSaveEdit={onSaveEdit}
              onCancelEdit={onCancelEdit}
              onUpdatePriority={onUpdatePriority}
            />
          ))}
        </div>
      )}
    </div>
  );
}
