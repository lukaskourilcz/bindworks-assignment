export type Priority = "low" | "medium" | "high";
export type Category = "personal" | "work" | "shopping" | "health" | "other";

export interface Todo {
  id: number;
  text: string;
  done: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  color: string;
}

export const categories: { id: Category; label: string; color: string }[] = [
  { id: "personal", label: "Personal", color: "#8b5cf6" },
  { id: "work", label: "Work", color: "#3b82f6" },
  { id: "shopping", label: "Shopping", color: "#10b981" },
  { id: "health", label: "Health", color: "#ef4444" },
  { id: "other", label: "Other", color: "#6b7280" },
];
