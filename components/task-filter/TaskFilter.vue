<script setup lang="ts">
import {computed, defineEmits, defineProps} from 'vue';
import type { TaskFilter } from '~/types/task-filter.type';

const props = defineProps<{
  totalCount: number;
  completedCount: number;
  pendingCount: number;
  currentFilter: TaskFilter;
}>();

const emit = defineEmits<{
  (e: 'update:filter', value: TaskFilter): void;
}>();

const filters = computed<{label: string; value: TaskFilter; count: number}[]>(() => [
  {label: 'All Tasks', value: 'all' as const, count: props.totalCount},
  {label: 'Completed', value: 'completed' as const, count: props.completedCount},
  {label: 'Pending', value: 'pending' as const, count: props.pendingCount}
]);

const updateFilter = (filter: TaskFilter): void => {
  emit('update:filter', filter);
};
</script>

<template>
  <div class="flex flex-wrap gap-2 mb-4">
    <button
        v-for="filter in filters"
        :key="filter.value"
        @click="() => updateFilter(filter.value)"
        class="px-3 py-1 text-sm rounded-full transition-colors flex items-center"
        :class="[
        currentFilter === filter.value
          ? 'bg-blue-700 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      ]"
        :aria-pressed="currentFilter === filter.value"
    >
      <span>{{ filter.label }}</span>
      <span class="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white text-gray-600">
        {{ filter.count }}
      </span>
    </button>
  </div>
</template>
