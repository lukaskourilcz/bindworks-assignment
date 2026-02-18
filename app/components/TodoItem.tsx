"use client";

import { cn } from "@/lib/utils";
import { type Priority, type Todo, type CategoryInfo } from "@/lib/types";
import { AlertCircle, Calendar, Check, Tag, Trash2 } from "lucide-react";

const priorityConfig = {
  low: { label: "Low", color: "text-slate-400", bg: "bg-slate-400/10" },
  medium: { label: "Medium", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  high: { label: "High", color: "text-red-400", bg: "bg-red-400/10" },
};

interface TodoItemProps {
  todo: Todo;
  categories: CategoryInfo[];
  editingId: number | null;
  editText: string;
  setEditText: (t: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStartEdit: (todo: Todo) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void;
  onUpdatePriority: (id: number, priority: Priority) => void;
}

function isOverdue(todo: Todo) {
  if (!todo.dueDate || todo.done) return false;
  return new Date(todo.dueDate) < new Date();
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getCategoryColor(categories: CategoryInfo[], cat: string) {
  return categories.find((c) => c.id === cat)?.color || "#6b7280";
}

export function TodoItem({
  todo,
  categories,
  editingId,
  editText,
  setEditText,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onUpdatePriority,
}: TodoItemProps) {
  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-200",
        isOverdue(todo)
          ? "bg-red-500/10 border-red-500/30"
          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20",
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex-shrink-0 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300",
          todo.done
            ? "bg-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            : "border-muted-foreground hover:border-white",
        )}
      >
        {todo.done && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
      </button>

      <div className="flex-1 min-w-0">
        {editingId === todo.id ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSaveEdit(todo.id)}
              className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              autoFocus
            />
            <button onClick={() => onSaveEdit(todo.id)} className="text-green-400 hover:text-green-300 text-sm">
              Save
            </button>
            <button onClick={onCancelEdit} className="text-muted-foreground hover:text-white text-sm">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div
              onClick={() => onStartEdit(todo)}
              className={cn(
                "text-sm font-medium cursor-pointer transition-colors",
                todo.done
                  ? "text-muted-foreground line-through decoration-white/20"
                  : "text-foreground hover:text-violet-300",
              )}
            >
              {todo.text}
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-1.5">
              <span
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${getCategoryColor(categories, todo.category)}20`,
                  color: getCategoryColor(categories, todo.category),
                }}
              >
                <Tag className="w-3 h-3" />
                {categories.find((c) => c.id === todo.category)?.label || todo.category}
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full",
                  priorityConfig[todo.priority].bg,
                  priorityConfig[todo.priority].color,
                )}
              >
                {priorityConfig[todo.priority].label}
              </span>
              {todo.dueDate && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs",
                    isOverdue(todo) ? "text-red-400" : "text-muted-foreground",
                  )}
                >
                  {isOverdue(todo) ? <AlertCircle className="w-3 h-3" /> : <Calendar className="w-3 h-3" />}
                  {formatDate(todo.dueDate)}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <select
          value={todo.priority}
          onChange={(e) => onUpdatePriority(todo.id, e.target.value as Priority)}
          onClick={(e) => e.stopPropagation()}
          className="bg-white/10 border-0 rounded text-xs py-1 px-1 focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer"
        >
          <option value="low">Low</option>
          <option value="medium">Med</option>
          <option value="high">High</option>
        </select>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1.5 hover:bg-red-500/20 rounded-lg text-muted-foreground hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}