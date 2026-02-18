"use client";

import { cn } from "@/lib/utils";
import { type Priority, type Category, type CategoryInfo } from "@/lib/types";
import { Filter, Plus, Search, X } from "lucide-react";

interface TodoFiltersProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterCategory: Category | "all";
  setFilterCategory: (c: Category | "all") => void;
  filterPriority: Priority | "all";
  setFilterPriority: (p: Priority | "all") => void;
  filterStatus: "all" | "active" | "completed";
  setFilterStatus: (s: "all" | "active" | "completed") => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  showForm: boolean;
  setShowForm: (v: boolean) => void;
  categories: CategoryInfo[];
  activeFiltersCount: number;
}

export function TodoFilters({
  searchQuery,
  setSearchQuery,
  filterCategory,
  setFilterCategory,
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  showFilters,
  setShowFilters,
  showForm,
  setShowForm,
  categories,
  activeFiltersCount,
}: TodoFiltersProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all",
            showFilters || activeFiltersCount > 0
              ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
              : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10",
          )}
        >
          <Filter className="w-4 h-4" />
          {activeFiltersCount > 0 && (
            <span className="bg-violet-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-500/20"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Task</span>
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as Category | "all")}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as Priority | "all")}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "completed")}
            className="bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setFilterCategory("all");
                setFilterPriority("all");
                setFilterStatus("all");
                setSearchQuery("");
              }}
              className="text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}