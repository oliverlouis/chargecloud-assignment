<script setup lang="ts">
import { onMounted, computed } from 'vue';
import TaskItem from '~/components/task-item/TaskItem.vue';
import TaskFilter from '~/components/task-filter/TaskFilter.vue';
import { useTasks } from '~/composables/useTasks';
import { useKeyboardNavigation } from '~/composables/useKeyboardNavigation';

const {
  tasks,
  isLoading,
  error,
  totalCount,
  completedCount,
  pendingCount,
  filter,
  setFilter,
  fetchTasks,
  toggleTaskCompletion,
  isTaskLoading,
  clearError
} = useTasks();

useKeyboardNavigation(tasks, toggleTaskCompletion);

const noTasksMessage = computed<string>(() => {
  const currentFilter = filter.value;
  if (currentFilter === 'completed') {
    return 'No completed tasks found.';
  }
  return 'No pending tasks found.';
});

const shouldShowAllTasksButton = computed<boolean>(() => {
  return filter.value !== 'all' && totalCount.value > 0;
});

onMounted(async () => {
  await fetchTasks();
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">EV Charging Station Tasks</h1>

    <div v-if="isLoading" class="text-center p-4">
      <div class="animate-pulse text-gray-600">Loading EV charging tasks...</div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">Error loading tasks: {{ error.message }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <button @click="clearError" class="text-red-500" aria-label="Dismiss">
          <span class="sr-only">Close</span>
          <span>&times;</span>
        </button>
      </span>
    </div>

    <div v-else>
      <div class="mb-5">
        <div>
          <span class="text-sm text-gray-500">
            {{ completedCount }} of {{ totalCount }} tasks completed
          </span>
        </div>
      </div>

      <TaskFilter
        :total-count="totalCount"
        :completed-count="completedCount"
        :pending-count="pendingCount"
        :current-filter="filter"
        @update:filter="setFilter"
      />

      <ul v-if="tasks.length" class="space-y-3" aria-label="Task list">
        <TaskItem
          v-for="(task, index) in tasks"
          :key="task.id"
          :task="task"
          :is-loading="isTaskLoading(task.id)"
          :data-task-index="index"
          @toggle="toggleTaskCompletion"
          tabindex="0"
        />
      </ul>

      <div v-else class="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No tasks found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ noTasksMessage }}
        </p>
        <button
          v-if="shouldShowAllTasksButton"
          @click="setFilter('all')"
          class="mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-100 rounded-md"
        >
          Show all tasks
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
