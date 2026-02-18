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