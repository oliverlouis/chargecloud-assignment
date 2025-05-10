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
    async fetchTasks() {
      this.loading = true;
      this.error = null;

      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        this.tasks = [
          {id: 101, title: 'Inspect Station #A1', description: 'Check cables and connectors', completed: false},
          {id: 102, title: 'Update Firmware on Station #B3', description: 'Apply latest security patch', completed: true},
          {id: 103, title: 'Clean Charging Ports at Station #C5', description: 'Remove debris and dust', completed: false},
          {id: 104, title: 'Verify Network Connectivity for Station #D2', description: 'Ensure stable internet connection', completed: false},
          {id: 105, title: 'Replace Broken Screen on Station #E4', description: 'Order and install new display', completed: true},
        ];
      } catch (err) {
        this.error = err as Error;
        console.error('Failed to fetch tasks:', err);
      } finally {
        this.loading = false;
      }
    },

    async toggleTaskCompletion(taskId: number) {
      if (this.loadingTaskIds.has(taskId)) return;

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

    clearError() {
      this.error = null;
    }
  },
});
