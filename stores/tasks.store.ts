import {defineStore} from 'pinia';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: Error | null;
  loadingTaskIds: Map<number, boolean>;
}

export const useTaskStore = defineStore('tasks', {
  state: (): TaskState => ({
    tasks: [],
    loading: false,
    error: null,
    loadingTaskIds: new Map(),
  }),

  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    pendingTasks: (state) => state.tasks.filter(task => !task.completed),
    getTaskById: (state) => (id: number) => state.tasks.find(task => task.id === id),
    isTaskLoading: (state) => (id: number) => state.loadingTaskIds.has(id),
  },

  actions: {
    async fetchTasks(): Promise<void> {
      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch('/api/mock-tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        this.tasks = response ?? [];
      } catch (err) {
        this.error = err as Error;
        console.error('Failed to fetch tasks:', err);
      } finally {
        this.loading = false;
      }
    },

    async toggleTaskCompletion(taskId: number): Promise<void> {
      if (this.loadingTaskIds.has(taskId)) {
        return;
      }

      this.loadingTaskIds.set(taskId, true);

      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
        } else {
          throw new Error(`Task with ID ${taskId} not found`);
        }
      } catch (err) {
        this.error = err as Error;
        console.error(`Failed to toggle task ${taskId}:`, err);
      } finally {
        this.loadingTaskIds.delete(taskId);
      }
    },

    clearError(): void {
      this.error = null;
    }
  },
});
