import { ref, computed } from 'vue';
import { useTaskStore, type Task } from '@/stores/tasks.store';
import type { TaskFilter } from '~/types/task-filter.type';

export function useTasks() {
  const taskStore = useTaskStore();
  const filter = ref<TaskFilter>('all');

  const allTasks = computed<Task[]>(() => taskStore.tasks);
  const completedTasks = computed<Task[]>(() => taskStore.completedTasks);
  const pendingTasks = computed<Task[]>(() => taskStore.pendingTasks);

  const filteredTasks = computed<Task[]>(() => {
    switch (filter.value) {
      case 'completed':
        return completedTasks.value;
      case 'pending':
        return pendingTasks.value;
      case 'all':
      default:
        return allTasks.value;
    }
  });

  const isLoading = computed<boolean>(() => taskStore.loading);
  const error = computed<Error | null>(() => taskStore.error);

  const totalCount = computed<number>(() => allTasks.value.length);
  const completedCount = computed<number>(() => completedTasks.value.length);
  const pendingCount = computed<number>(() => pendingTasks.value.length);

  const fetchTasks = async () => {
    await taskStore.fetchTasks();
  };

  const toggleTaskCompletion = async (taskId: number) => {
    await taskStore.toggleTaskCompletion(taskId);
  };

  const isTaskLoading = (taskId: number) => {
    return taskStore.isTaskLoading(taskId);
  };

  const clearError = () => {
    taskStore.clearError();
  };

  const setFilter = (newFilter: TaskFilter) => {
    filter.value = newFilter;
  };

  return {
    filter,
    setFilter,
    tasks: filteredTasks,
    allTasks,
    completedTasks,
    pendingTasks,
    isLoading,
    error,
    totalCount,
    completedCount,
    pendingCount,
    fetchTasks,
    toggleTaskCompletion,
    isTaskLoading,
    clearError,
  };
}
