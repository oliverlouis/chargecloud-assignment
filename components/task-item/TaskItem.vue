<script setup lang="ts">
import {defineEmits, defineProps} from 'vue';
import type {Task} from '~/stores/tasks.store';
import TaskButton from '../task-button/TaskButton.vue';

const props = defineProps<{
  task: Task;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'toggle', id: number): void;
}>();

const handleToggle = (): void => {
  if (!props.isLoading) {
    emit('toggle', props.task.id);
  }
};
</script>

<template>
  <li
      class="p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      :class="task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'"
  >
    <div class="flex items-center gap-3">
      <button
          @click="handleToggle"
          :disabled="isLoading"
          class="mt-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          :aria-label="task.completed ? 'Mark as pending' : 'Mark as complete'"
      >
        <div v-if="isLoading"
             class="w-5 h-5 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
        <div v-else-if="task.completed" class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"/>
          </svg>
        </div>
        <div v-else class="w-5 h-5 rounded-full border-2 border-gray-300"></div>
      </button>
      <div>
        <h2 class="text-lg font-semibold leading-tight" :class="[task.completed ? 'line-through text-gray-500' : 'text-gray-800']">
          {{ task.title }}
        </h2>
        <p class="text-gray-600 text-sm mt-1">{{ task.description }}</p>
      </div>
    </div>

    <TaskButton
      :isCompleted="task.completed"
      :isLoading="isLoading"
      :onClick="handleToggle"
    />
  </li>
</template>
